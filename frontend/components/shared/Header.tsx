import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="bg-primary py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link href="/">MERN Bookings</Link>
        </span>
        <span className="flex space-x-2">
          <Link className="text-white" href="/auth/signin">
            Sign In
          </Link>
          <Link className="text-white" href="/auth/signup">
            Sign Up
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Header;
