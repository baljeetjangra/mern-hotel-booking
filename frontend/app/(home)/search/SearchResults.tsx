"use client";
import MyPagination from "@/components/shared/MyPagination";
import SearchResultCard from "@/components/shared/SearchResultCard";
import Filters from "@/components/shared/filters/Filters";
import StarRatingFilter from "@/components/shared/filters/StarRatingFilter";
import { searchHotels } from "@/lib/apiClient";
import { HotelType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React from "react";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["search", searchParams.toString()],
    queryFn: () => searchHotels(queryString.parse(searchParams.toString())),
  });

  return (
    <section className="m-4  flex gap-4 justify-between">
      {/* <Filters /> */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Search Results - {data?.pagination?.total} Hotels Found
        </h1>
        <div className="flex flex-col gap-8">
          {data?.data?.map((hotel: HotelType) => (
            <SearchResultCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <MyPagination
          page={data?.pagination?.page || 1}
          pages={data?.pagination?.pages || 1}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            router.push("/search?" + params.toString(), { scroll: false });
          }}
        />
      </div>
    </section>
  );
};

export default SearchResults;
