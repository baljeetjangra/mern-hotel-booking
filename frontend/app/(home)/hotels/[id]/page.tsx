import { getHotelById } from "@/lib/apiClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import HotelDetails from "./HotelDetails";

const page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => getHotelById(params.id),
  });

  return (
    <div className="my-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HotelDetails />
      </HydrationBoundary>
    </div>
  );
};

export default page;
