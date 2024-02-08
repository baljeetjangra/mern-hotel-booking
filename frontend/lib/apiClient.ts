import { registerFormSchema } from "@/components/shared/forms/Signup";
import { z } from "zod";

export const register = async (
  formData: z.infer<typeof registerFormSchema>
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register`,
    {
      method: "POST",
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
