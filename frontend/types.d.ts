export type HotelType = {
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
  imageUrls: string[];
  imageFiles: FileList;
  lastUpdated: Date;
  bookings: BookingType[];
};

export type HotelSearchPagination = {
  total: number;
  page: number;
  pages: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: HotelSearchPagination;
};

export type SearchFormParams = {
  destination?: string;
  adultCount?: number;
  childCount?: number;
  checkIn?: Date;
  checkOut?: Date;
  page?: number;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: number;
  sortOption?: string;
};

export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
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
