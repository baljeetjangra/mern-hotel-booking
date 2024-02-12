"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { addHotel } from "@/lib/apiClient";
import { toast } from "sonner";
import { HotelType } from "@/types";
import Image from "next/image";

export const hotelFormSchema = z.object({
  name: z.string().min(3),
  city: z.string().min(3),
  country: z.string().min(3),
  description: z.string().min(3),
  type: z.string(),
  pricePerNight: z.coerce.number(),
  starRating: z.coerce.number().min(1).max(5),
  adultCount: z.coerce.number(),
  childCount: z.coerce.number(),
  facilities: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  imageFiles: z.instanceof(FileList),
  imageUrls: z.array(z.string()).optional(),
});

const hotelTypes = [
  { label: "Budget", value: "budget" },
  { label: "Boutique", value: "boutique" },
  { label: "Luxury", value: "luxury" },
  { label: "Ski Resort", value: "ski_resort" },
  { label: "Business", value: "business" },
  { label: "Family", value: "family" },
  { label: "Romantic", value: "romantic" },
  { label: "Hiking Resort", value: "hiking_resort" },
  { label: "Cabin", value: "cabin" },
  { label: "Beach Resort", value: "beach_resort" },
  { label: "Golf Resort", value: "golf_resort" },
  { label: "Motel", value: "motel" },
  { label: "All Inclusive", value: "all_exclusive" },
  { label: "Pet Friendly", value: "pet_friendly" },
  { label: "Self Catering", value: "self_catering" },
];

const hotelFacilities = [
  { label: "Free Wifi", value: "free_wifi" },
  { label: "Parking", value: "parking" },
  { label: "Airport Shuttle", value: "airport_shuttle" },
  { label: "Family Rooms", value: "family_rooms" },
];

const CreateHotelForm = ({
  hotel,
  onSave,
  isLoading,
}: {
  hotel?: HotelType;
  onSave?: (data: FormData) => void;
  isLoading?: boolean;
}) => {
  const form = useForm<z.infer<typeof hotelFormSchema>>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      facilities: [],
    },
  });

  useEffect(() => {
    form.reset(hotel);
  }, [hotel, form]);

  const fileRef = form.register("imageFiles");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => addHotel(data),
    onSuccess: (data) => {
      toast.success("Hotel Saved!");
    },
  });

  function onSubmit(values: z.infer<typeof hotelFormSchema>) {
    const formData = new FormData();

    if (hotel) {
      formData.append("id", hotel._id);
    }
    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("description", values.description);
    formData.append("type", values.type);
    formData.append("pricePerNight", values.pricePerNight.toString());
    formData.append("starRating", values.starRating.toString());
    formData.append("adultCount", values.adultCount.toString());
    formData.append("childCount", values.childCount.toString());

    values.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(values.imageFiles).forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    if (values.imageUrls) {
      values.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    if (hotel && onSave) {
      onSave(formData);
    } else {
      mutate(formData);
    }
  }

  const imageUrls: string[] | undefined = form.watch("imageUrls");

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    imageUrl: string
  ) => {
    e.preventDefault();
    const newImageUrls = imageUrls?.filter((url) => url !== imageUrl);
    form.setValue("imageUrls", newImageUrls);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-1/2 mx-auto"
      >
        <h1 className="text-3xl mb-6 font-bold">Add Hotel</h1>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    type="textarea"
                    placeholder="Enter hotel description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="pricePerNight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Per Night</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="starRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Star Rating</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter rating between 1 to 5"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap space-y-1"
                >
                  {hotelTypes.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="">
          <p className="text-xl font-bold mb-4">Facilities</p>
          <FormField
            control={form.control}
            name="facilities"
            render={() => (
              <FormItem className="">
                {hotelFacilities.map((item) => (
                  <FormField
                    key={item.value}
                    control={form.control}
                    name="facilities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.value
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <p className="text-xl font-bold mb-4">Guests</p>
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="adultCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adults</FormLabel>
                <FormControl>
                  <Input placeholder="Enter no." type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="childCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Children</FormLabel>
                <FormControl>
                  <Input placeholder="Enter no." type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="imageFiles"
          rules={{
            validate: (value) => {
              if (value.length === 0) {
                return "Please select at least one image.";
              } else if (imageUrls && value.length + imageUrls?.length > 6) {
                return "You can select up to 6 images";
              } else if (value.length > 6) {
                return "You can select up to 6 images";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input type="file" multiple {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {imageUrls && imageUrls?.length > 0 && (
          <div className="flex items-start flex-wrap gap-4">
            {imageUrls.map((imageUrl) => {
              return (
                <div className="relative group h-32 w-32" key={imageUrl}>
                  <Image
                    className=" object-cover"
                    src={imageUrl}
                    layout="fill"
                    objectFit="cover"
                    alt={imageUrl}
                  />
                  <Button
                    className="absolute inset-0 h-full opacity-0 group-hover:opacity-80"
                    onClick={(e) => handleDelete(e, imageUrl)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        <Button type="submit" disabled={isPending || isLoading}>
          {isPending || isLoading ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateHotelForm;
