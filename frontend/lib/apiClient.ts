import { loginFormSchema } from "@/components/shared/forms/SignIn";
import { registerFormSchema } from "@/components/shared/forms/Signup";
import { HotelType } from "@/types";
import { z } from "zod";

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
