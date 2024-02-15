"use client";
import React from "react";
import StarRatingFilter from "./StarRatingFilter";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="w-60">
      <h2 className="text-2xl">Filter By</h2>
      <hr className="my-4" />
      <StarRatingFilter
        selectedStars={searchParams.get("stars")?.split(",") || []}
        onChange={(val, star: number) => {
          const params = new URLSearchParams(searchParams.toString());
          console.log("afsdfasdf", searchParams.getAll("stars") as string[]);
          if (val) {
            const values = queryString.stringify(
              {
                stars: [
                  ...(searchParams.getAll("stars") as string[]),
                  star.toString(),
                ],
              },
              { arrayFormat: "bracket" }
            );
            params.set("stars", values);
          } else {
            const values = queryString.stringify(
              {
                stars: [
                  ...(searchParams.getAll("stars") as string[]).filter(
                    (s) => s !== star.toString()
                  ),
                ],
              },
              { arrayFormat: "bracket" }
            );
            params.set("stars", values);
          }
          router.push("/search?" + params.toString(), { scroll: false });
        }}
      />
    </div>
  );
};

export default Filters;
