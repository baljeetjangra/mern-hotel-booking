import Hero from "@/components/shared/Hero";
import SearchHotels, {
  searchFormSchema,
} from "@/components/shared/forms/SearchHotels";
import { searchHotels } from "@/lib/apiClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import { z } from "zod";

const page = async ({
  searchParams,
}: {
  searchParams: z.infer<typeof searchFormSchema>;
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["search", searchParams],
    queryFn: () => searchHotels(searchParams),
  });

  return (
    <main className="container mx-auto py-10">
      <Hero />
      <div className="-my-56 mx-4 shadow-lg relative z-99">
        <SearchHotels />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
    </main>
  );
};

export default page;
