"use client";
import BookingForm from "@/components/shared/forms/BookingForm";
import {
  createPaymentIntent,
  fetchCurrentUser,
  getHotelById,
} from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/lib/get-stripejs";

const Page = () => {
  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
  });
  const params = useParams();
  const id: any = params.id;

  const [numberOfNights, setNumberOfNights] = useState(0);

  const checkIn = sessionStorage.getItem("checkIn");
  const checkOut = sessionStorage.getItem("checkOut");
  const adultCount = sessionStorage.getItem("adultCount");
  const childCount = sessionStorage.getItem("childCount");

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights =
        Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkIn, checkOut]);

  const { data: paymentIntentData } = useQuery({
    queryKey: ["paymentIntent", id],
    queryFn: () => createPaymentIntent(id, numberOfNights),
    enabled: !!id && numberOfNights > 0,
  });

  const { data: hotel } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => getHotelById(id),
    enabled: !!id,
  });

  if (!currentUser) return null;

  return (
    <section className=" container m-6 mx-auto grid md:grid-cols-[1fr_2fr] gap-4">
      <div className="bg-green-200 p-4 space-y-2">
        <h1 className="text-2xl font-bold">BOOKING DETAILS SUMMARY</h1>
        <h2 className="text-xl font-bold">{hotel?.name}</h2>
        <p>
          {hotel?.city}, {hotel?.country}
        </p>
        <p>{format(checkIn!, "yyyy-MM-dd")}</p>
        <p>
          <span className="font-bold">Check Out:</span>{" "}
          {format(checkOut!, "yyyy-MM-dd")}
        </p>
        <p>
          <span className="font-bold">Number of Nights:</span> {numberOfNights}
        </p>
        <p>
          <span className="font-bold">Adults:</span> {adultCount}
        </p>
        <p>
          <span className="font-bold">Children:</span> {childCount}
        </p>
      </div>
      {currentUser && paymentIntentData && (
        <Elements
          stripe={getStripe()}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm user={currentUser} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </section>
  );
};

export default Page;
