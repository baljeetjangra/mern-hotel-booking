import { Schema, model } from "mongoose";

export type HotelType = {
  imageFiles: any;
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls?: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  hotelId: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  totalCost: number;
  firstName: string;
  lastName: string;
  email: string;
};

const bookingSchema = new Schema<BookingType>({
  userId: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
});

const hotelSchema = new Schema<HotelType>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  adultCount: {
    type: Number,
    required: true,
  },

  childCount: {
    type: Number,
    required: true,
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  type: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  bookings: [bookingSchema],
});

const Hotel = model<HotelType>("HOTEL", hotelSchema);

export default Hotel;
