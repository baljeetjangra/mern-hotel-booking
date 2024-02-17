"use client";
import GuestInfoForm from "@/components/shared/forms/GuestInfoForm";
import { Badge } from "@/components/ui/badge";
import { getHotelsById } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const HotelDetails = () => {
  const params = useParams();
  const { data: hotel, error } = useQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => getHotelsById(params.id as string),
    enabled: !!params.id,
  });

  if (!hotel) {
    return <div className="">No Hotel Found!</div>;
  }

  return (
    <section className="container m-6 space-y-4">
      {Array.from({ length: hotel.starRating }).map((_, index) => (
        <span key={index}>⭐</span>
      ))}
      <h1 className="text-2xl">{hotel.name}</h1>
      <Badge className="rounded-xl">{hotel.type}</Badge>
      {hotel.imageUrls.map((url, index) => (
        <Image
          key={index}
          width={300}
          height={300}
          src={url}
          alt={hotel.name}
          className="w-full h-auto object-cover"
        />
      ))}

      <div className="flex gap-4 ">
        {hotel.facilities.map((facility, index) => (
          <Badge key={index} className="rounded-xl">
            {facility}
          </Badge>
        ))}
      </div>

      <p>{hotel.description}</p>

      <GuestInfoForm hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />
    </section>
  );
};

export default HotelDetails;
