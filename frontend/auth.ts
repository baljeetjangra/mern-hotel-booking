import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import { login } from "./lib/apiClient";
import { cookies } from "next/headers";
import { parse } from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credential({
      async authorize(credentials) {
        const { email, password } = credentials;
        const { response, cookies: apiCookies } = await login({
          email: email as string,
          password: password as string,
        });

        if (apiCookies && apiCookies.length > 0) {
          apiCookies.forEach((cookie) => {
            const parsedCookie = parse(cookie);

            const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
            const httpOnly = cookie.includes("httponly;");

            cookies().set({
              name: cookieName,
              value: cookieValue,
              httpOnly: httpOnly,
              maxAge: parseInt(parsedCookie["Max-Age"]),
              path: parsedCookie.path,
              sameSite: parsedCookie.samesite as any,
              expires: new Date(parsedCookie.expires),
              secure: true,
            });
          });
        }

        const data = response.user;
        if (data) {
          return data;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ token, session }: any) {
      if (session.user) {
        session.user = token.user;
      }

      return session;
    },
  },
});
