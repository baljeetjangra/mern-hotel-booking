import { auth } from "@/auth";
import { Sign } from "crypto";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { signOutUser } from "@/actions/auth.action";

const Header = async () => {
  const session = await auth();
  return (
    <nav className="py-4 shadow-lg">
      <div className="container mx-auto sm:px-4 md:px-0 flex justify-between">
        <span className="text-2xl  font-bold tracking-tight">
          <Link href="/">
            <span className="text-primary">MERN</span>Bookings
          </Link>
        </span>
        {session ? (
          <div className="flex space-x-6 items-center">
            <Link href={"/my-hotels"} className="font-bold hover:text-primary">
              My Hotels{" "}
            </Link>
            <Link className="" href="/api/auth/signout">
              <Button className="rounded-full">Sign out</Button>
            </Link>
          </div>
        ) : (
          <span className="flex space-x-6">
            <Link className="" href="/auth/signin">
              <Button variant={"default"} className="rounded-full">
                Sign In
              </Button>
            </Link>
            <Link className="" href="/auth/signup">
              <Button variant={"default"} className="rounded-full">
                Sign Up
              </Button>
            </Link>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
