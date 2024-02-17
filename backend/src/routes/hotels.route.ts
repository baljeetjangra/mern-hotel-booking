import { Request, Response, Router } from "express";
import Hotel, { BookingType } from "../models/hotel.model";
import { HotelSearchResponse } from "../shared/types";
import { param } from "express-validator";
import Stripe from "stripe";
import { verifyToken } from "../middleware/auth.middleware";
const router = Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = pageSize * (pageNumber - 1);

    const hotels = await Hotel.find(query).skip(skip).limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("Error searching hotels", error);

    res.status(500).json({ message: "Somethings went wrong" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel Id id required")],
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const hotel = await Hotel.findById(id);

      res.status(200).json(hotel);
    } catch (error) {
      console.log("Error getting hotels", error);

      res.status(500).json({ message: "Somethings went wrong" });
    }
  }
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "usd",
      description: `Booking hotel ${hotel.name}`,
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });
    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.status(200).send(response);
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (!paymentIntent) {
        return res.status(404).json({ message: "Payment intent not found" });
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res
          .status(400)
          .json({ message: "Payment intent does not match" });
      }
      if (paymentIntent.status !== "succeeded") {
        return res
          .status(400)
          .json({ message: `Payment not complete : ${paymentIntent.status}` });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId },
        {
          $push: { bookings: newBooking },
        }
      );
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      await hotel.save();

      res.status(201).json(newBooking);
    } catch (error) {
      console.log("Error creating booking", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;
