import React from "react";
import { HotelType } from "../../../../backend/src/models/hotel.model";
import { Button } from "@/components/ui/button";
import {
  FaBuilding,
  FaMapLocation,
  FaMoneyCheck,
  FaPeopleGroup,
  FaStar,
} from "react-icons/fa6";
import Link from "next/link";

const MyHotel = ({ hotel }: { hotel: HotelType }) => {
  return (
    <div className="border-[1px] p-4 rounded-xl bg-gray-100 shadow-lg space-y-2">
      <h2 className="text-xl font-bold">{hotel.name}</h2>
      <p>{hotel.description}</p>
      <div className="flex justify-between items-center ">
        <div className="flex justify-between items-center gap-2 border-[1px] p-2 ">
          <FaMapLocation />
          <p>{hotel.city}</p>
          <p>{hotel.country}</p>
        </div>
        <div className="flex justify-between items-center gap-2 border-[1px] p-2 ">
          <FaMoneyCheck />
          <p>{hotel.pricePerNight}$ / night</p>
        </div>
        <div className="flex justify-between items-center gap-2 border-[1px] p-2 ">
          <FaBuilding />
          {hotel.facilities.map((facility) => {
            return <span key={facility}>{facility}</span>;
          })}
        </div>
        <div className="flex justify-between items-center gap-2 border-[1px] p-2 ">
          <FaPeopleGroup />
          <p>{hotel.adultCount} Adults</p>
          <p>{hotel.childCount} Children</p>
        </div>
        <div className="flex justify-between items-center gap-2 border-[1px] p-2 ">
          <FaStar />
          <p>{hotel.starRating}</p>
        </div>
      </div>
      <Link href={`/my-hotel/${hotel._id}`} className="mt-6 flex justify-end">
        <Button>View Details</Button>
      </Link>
    </div>
  );
};

export default MyHotel;
