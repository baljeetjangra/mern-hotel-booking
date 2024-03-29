import { BookingFormSchema } from "@/components/shared/forms/BookingForm";
import { searchFormSchema } from "@/components/shared/forms/SearchHotels";
import { loginFormSchema } from "@/components/shared/forms/SignIn";
import { registerFormSchema } from "@/components/shared/forms/Signup";
import {
  BookingType,
  HotelType,
  PaymentIntentResponse,
  SearchFormParams,
  UserType,
} from "@/types";
import { z } from "zod";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const register = async (
  formData: z.infer<typeof registerFormSchema>
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData: z.infer<typeof loginFormSchema>) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return { response: responseBody, cookies: response.headers.getSetCookie() };
};

export const addHotel = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/my-hotels`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return response.json();
};

export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/my-hotels`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const getHotelsById = async (id: string): Promise<HotelType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/my-hotels/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const updateHotelById = async (
  formData: FormData
): Promise<HotelType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/my-hotels/${formData.get(
      "id"
    )}`,
    {
      method: "PUT",
      credentials: "include",
      body: formData,
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const searchHotels = async (searchParams: SearchFormParams) => {
  const queryParams = new URLSearchParams();
  queryParams.set("destination", searchParams.destination || "");
  queryParams.set("checkIn", searchParams.checkIn?.toISOString() || "");
  queryParams.set("checkOut", searchParams.checkOut?.toISOString() || "");
  queryParams.set("adultCount", searchParams.adultCount?.toString() || "");
  queryParams.set("childCount", searchParams.childCount?.toString() || "");
  queryParams.set("page", searchParams.page?.toString() || "1");

  queryParams.set("maxPrice", searchParams.maxPrice?.toString() || "");
  queryParams.set("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });

  searchParams.types?.forEach((type) => {
    queryParams.append("types", type);
  });

  searchParams.stars?.forEach((star) => {
    queryParams.append("stars", star);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hotels/search?${queryParams}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const getHotelById = async (id: string): Promise<HotelType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hotels/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: number
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numberOfNights }),
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const createRoomBooking = async (
  formData: z.infer<typeof BookingFormSchema>
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
