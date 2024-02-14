import HotelList from "@/components/shared/MyHotel/HotelList";
import { Button } from "@/components/ui/button";
import { getMyHotels } from "@/lib/apiClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-hotels"],
    queryFn: getMyHotels,
  });

  return (
    <div className="space-y-5 my-8 container mx-auto sm:py-4 md:py-0">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Hotels</h1>
        <Link href="/add-hotel">
          <Button className="rounded-full">Add Hotel</Button>
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HotelList />
      </HydrationBoundary>
    </div>
  );
};

export default page;
