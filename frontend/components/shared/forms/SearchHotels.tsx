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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import queryString from "query-string";

export const searchFormSchema = z.object({
  destination: z.string().optional(),
  adultCount: z.coerce.number().optional(),
  childCount: z.coerce.number().optional(),
  checkIn: z.date().optional(),
  checkOut: z.date().optional(),
});

const SearchHotels = ({
  values,
}: {
  values?: z.infer<typeof searchFormSchema>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    form.reset(queryString.parse(searchParams.toString()));
  }, [form, searchParams]);

  const onSubmit = (values: z.infer<typeof searchFormSchema>) => {
    router.push(`/search?${queryString.stringify(values)}`, {});
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between items-center flex-wrap bg-primary p-6 rounded-xl gap-2"
      >
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="text-white">Location</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter destination"
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
          name="adultCount"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="text-white">Adult</FormLabel> */}
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
              {/* <FormLabel className="text-white">Child</FormLabel> */}
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
              {/* <FormLabel className="my-1 text-white">Check In</FormLabel> */}
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
              {/* <FormLabel className="my-1 text-white">Check out</FormLabel> */}
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
        <Button type="submit" variant={"outline"}>
          Search
        </Button>
        <Button
          type="reset"
          className="bg-red-400"
          variant={"outline"}
          onClick={() => form.reset()}
        >
          Reset
        </Button>
      </form>
    </Form>
  );
};

export default SearchHotels;
