import { getHotelById } from "@/lib/apiClient";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import React from "react";
import ManageHotelForm from "../../../../components/shared/forms/ManageHotelForm";

const page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => getHotelById(params.id),
  });

  return (
    <div className="my-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ManageHotelForm />
      </HydrationBoundary>
    </div>
  );
};

export default page;
