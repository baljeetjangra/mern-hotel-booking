"use client";
import { getMyHotels } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MyHotel from "./MyHotel";

const HotelList = () => {
  const { data, error } = useQuery({
    queryKey: ["my-hotels"],
    queryFn: getMyHotels,
  });

  if (!data) {
    return <div>No Hotels Found!</div>;
  }

  return (
    <section className="p-4 space-y-8">
      {data.map((hotel) => {
        return <MyHotel key={hotel._id} hotel={hotel} />;
      })}
    </section>
  );
};

export default HotelList;
