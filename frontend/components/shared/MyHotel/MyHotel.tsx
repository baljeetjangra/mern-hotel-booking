import React from "react";
import { Button } from "@/components/ui/button";
import {
  FaBuilding,
  FaMapLocation,
  FaMoneyCheck,
  FaPeopleGroup,
  FaStar,
} from "react-icons/fa6";
import Link from "next/link";
import { HotelType } from "@/types";

const MyHotel = ({ hotel }: { hotel: HotelType }) => {
  return (
    <div className="border-[1px] p-4 rounded-xl  shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-primary">{hotel.name}</h2>
      <p>{hotel.description}</p>
      <div className="flex justify-between items-center rounded-xl ">
        <div className="flex justify-between items-center gap-2 border-[1px] p-4 rounded-xl">
          <FaMapLocation />
          <p>{hotel.city}</p>
          <p>{hotel.country}</p>
        </div>
        <div className="flex justify-between items-center gap-2 border-[1px] p-4 rounded-xl">
          <FaMoneyCheck />
          <p>{hotel.pricePerNight}$ / night</p>
        </div>
        <div className="flex justify-between items-center gap-2 border-[1px] p-4 rounded-xl">
          <FaBuilding />
          {hotel.facilities.map((facility) => {
            return <span key={facility}>{facility}</span>;
          })}
        </div>
        <div className="flex justify-between items-center gap-2 border-[1px] p-4 rounded-xl">
          <FaPeopleGroup />
          <p>{hotel.adultCount} Adults</p>
          <p>{hotel.childCount} Children</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div className="flex justify-between items-center gap-2 px-4 rounded-xl">
          <FaStar className="text-yellow-400" />
          <p>{hotel.starRating}</p>
        </div>
        <Link href={`/my-hotel/${hotel._id}`} className="">
          <Button className="rounded-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default MyHotel;
