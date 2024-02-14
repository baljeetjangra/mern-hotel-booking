import { Request, Response, Router } from "express";
import Hotel from "../models/hotel.model";
import { HotelSearchResponse } from "../shared/types";

const router = Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = pageSize * (pageNumber - 1);

    const hotels = await Hotel.find({}).skip(skip).limit(pageSize);

    const total = await Hotel.countDocuments({});

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

export default router;
