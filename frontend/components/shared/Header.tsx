import { auth } from "@/auth";
import { Sign } from "crypto";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { signOutUser } from "@/actions/auth.action";

const Header = async () => {
  const session = await auth();
  return (
    <nav className="bg-primary py-4">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link href="/">MERN Bookings</Link>
        </span>
        {session ? (
          <div className="text-white">
            <Link href={"/my-hotels"}>My Hotels </Link>
            <Link className="" href="/api/auth/signout">
              Sign out
            </Link>
          </div>
        ) : (
          <span className="flex space-x-2">
            <Link className="text-white" href="/auth/signin">
              Sign In
            </Link>
            <Link className="text-white" href="/auth/signup">
              Sign Up
            </Link>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
