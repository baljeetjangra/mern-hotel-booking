import { HotelType } from "@/types";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

const SearchResultCard = ({ hotel }: { hotel: HotelType }) => {
  return (
    <div className="shadow-lg p-4 rounded-xl flex justify-start gap-4 items-center">
      <div className="">
        <Image
          src={hotel.imageUrls[0]}
          width={300}
          height={300}
          alt={hotel.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <p>
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <span key={index}>⭐</span>
            ))}{" "}
          </p>
          <p>{hotel.type}</p>
        </div>
        <h2 className="text-lg font-bold">{hotel.name}</h2>
        <p>{hotel.description}</p>
        <div className="flex gap-4 ">
          {hotel.facilities.map((facility, index) => (
            <Badge key={index} className="rounded-xl">
              {facility}
            </Badge>
          ))}
        </div>
        <div className="flex justify-end items-center gap-4">
          <p className="font-bold">${hotel.pricePerNight} / night</p>
          <Link href={`/hotels/${hotel._id}`}>
            <Button>View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
