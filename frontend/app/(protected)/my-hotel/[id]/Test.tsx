"use client";
import { getHotelById } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Test = ({ params }: any) => {
  const { data, error } = useQuery({
    queryKey: ["my-hotels"],
    queryFn: () => getHotelById(params.id),
  });
  console.log("🚀 ~ Test ~ data", data);

  return <div>Test</div>;
};

export default Test;
