"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const BookHotelFormSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
  adultCount: z.coerce.number(),
  childCount: z.coerce.number(),
});

const BookHotelForm = ({
  hotelId,
  pricePerNight,
}: {
  hotelId: string;
  pricePerNight: number;
}) => {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof BookHotelFormSchema>>({
    resolver: zodResolver(BookHotelFormSchema),
  });

  const onSubmit = (values: z.infer<typeof BookHotelFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[300px] bg-primary p-6 rounded-xl space-y-4"
      >
        <h3 className="text-lg text-white font-bold">${pricePerNight}</h3>
        <FormField
          control={form.control}
          name="adultCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Adult</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter adult count"
                  type="number"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="childCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Child</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter child count"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="my-1 text-white">Check In</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Check in date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="my-1 text-white">Check out</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Check out date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
        {session ? (
          <Button type="submit" variant={"outline"}>
            Book Now
          </Button>
        ) : (
          <Link href="/auth/signin">Signin to book</Link>
        )}
      </form>
    </Form>
  );
};

export default BookHotelForm;
