import Hero from "@/components/shared/Hero";
import SearchHotels from "@/components/shared/forms/SearchHotels";
import React from "react";

export default async function Home() {
  return (
    <main className="container mx-auto py-10">
      <Hero />
      <div className="absolute -my-56 mx-2 shadow-lg  z-99">
        <SearchHotels />
      </div>
    </main>
  );
}
