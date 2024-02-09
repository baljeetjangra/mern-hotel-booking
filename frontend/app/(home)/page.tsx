import { auth } from "@/auth";
import Image from "next/image";
import React from "react";

export default async function Home() {
  const session = await auth();
  return (
    <main className="container mx-auto py-10">
      <h1>Home</h1>
    </main>
  );
}
