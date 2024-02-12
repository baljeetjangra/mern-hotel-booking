"use client";
import { getHotelById, updateHotelById } from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import CreateHotelForm from "./CreateHotelForm";
import { toast } from "sonner";

const ManageHotelForm = () => {
  const params = useParams();
  const { data: hotel, error } = useQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => getHotelById(params.id as string),
    enabled: !!params.id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateHotelById,
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: (data) => {
      toast.success("Hotel Saved!");
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  if (!hotel) {
    return <div className="">No Hotel Found!</div>;
  }

  return (
    <CreateHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  );
};

export default ManageHotelForm;
