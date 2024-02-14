"use client";
import SearchResultCard from "@/components/shared/SearchResultCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { searchHotels } from "@/lib/apiClient";
import { HotelType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";

const SearchResults = () => {
  const searchParams = useSearchParams();

  const { data } = useQuery({
    queryKey: ["search", searchParams],
    queryFn: () => searchHotels(queryString.parse(searchParams.toString())),
  });

  return (
    <section className="m-4 space-y-6">
      <h1 className="text-2xl font-bold">Search Results</h1>
      <div className="flex flex-col gap-8">
        {data?.data?.map((hotel: HotelType) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
};

export default SearchResults;
