import { getHotelById } from "@/lib/apiClient";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
import Test from "./Test";

const page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => getHotelById(params.id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Test />
      </HydrationBoundary>
    </div>
  );
};

export default page;
