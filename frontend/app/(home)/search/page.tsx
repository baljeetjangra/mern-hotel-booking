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
import SearchResults from "./SearchResults";
import { SearchFormParams } from "@/types";

const page = async ({ searchParams }: { searchParams: SearchFormParams }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["search", searchParams],
    queryFn: () => searchHotels(searchParams),
  });

  return (
    <main className="container mx-auto py-10">
      <Hero />
      <div className="absolute -my-56 mx-2 shadow-lg  z-99">
        <SearchHotels />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchResults />
      </HydrationBoundary>
    </main>
  );
};

export default page;
