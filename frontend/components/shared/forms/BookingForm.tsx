import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createRoomBooking } from "@/lib/apiClient";
import { PaymentIntentResponse, UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { setTimeout } from "timers";
import { z } from "zod";

export const BookingFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  adultCount: z.number(),
  childCount: z.number(),
  checkIn: z.string(),
  checkOut: z.string(),
  hotelId: z.string(),
  paymentIntentId: z.string(),
  totalCost: z.number(),
});

const BookingForm = ({
  user,
  paymentIntent,
}: {
  paymentIntent: PaymentIntentResponse;
  user: UserType;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const id: any = params.id;
  const router = useRouter();

  const form = useForm<z.infer<typeof BookingFormSchema>>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      adultCount: Number(sessionStorage.getItem("adultCount"))!,
      childCount: Number(sessionStorage.getItem("childCount"))!,
      checkIn: sessionStorage.getItem("checkIn")!,
      checkOut: sessionStorage.getItem("checkOut")!,
      hotelId: id!,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const [loading, setLoading] = useState(false);

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: createRoomBooking,
    onSuccess: () => {
      toast.success("Booking successful");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
    onError: (error) => {
      toast.error("Error saving booking details");
    },
  });

  const onSubmit = async (values: z.infer<typeof BookingFormSchema>) => {
    if (!stripe || !elements) return;
    setLoading(true);
    const result = await stripe?.confirmCardPayment(
      paymentIntent.clientSecret,

      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,

          // static and required as india regulations
          billing_details: {
            name: "Jenny Rosen",
            address: {
              line1: "1 Main street",
              city: "San Francisco",
              postal_code: "90210",
              state: "CA",
              country: "US",
            },
          },
        },
        // static and required as india regulations
        shipping: {
          name: "Jenny Shipping",
          address: {
            line1: "1 Main street",
            city: "San Francisco",
            postal_code: "90210",
            state: "CA",
            country: "US",
          },
        },
      }
    );

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...values, paymentIntentId: result.paymentIntent.id });
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold">Confirm your details</h2>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-xl font-bold">Price summary</h3>
        <div className="bg-primary rounded-xl p-4 text-white font-semibold">
          <p>Total Cost: ${paymentIntent.totalCost.toFixed(2)}</p>
          <p>Includes taxes and charges</p>
        </div>

        <div className="space-y-2">
          <h3>Payment Details</h3>
          <CardElement
            id="payment-element"
            className="border rounded-md p-2 text-sm"
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending || loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
