"use server";

import { signIn, signOut } from "@/auth";
import { loginFormSchema } from "@/components/shared/forms/SignIn";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function authenticate(formData: z.infer<typeof loginFormSchema>) {
  try {
    await signIn("credentials", {
      ...formData,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function signOutUser() {
  try {
    await signOut({ redirectTo: "/auth/signin" });
  } catch (error) {
    throw new Error();
  }
}
