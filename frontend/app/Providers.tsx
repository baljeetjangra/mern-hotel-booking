"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClieny = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClieny}>{children}</QueryClientProvider>
  );
};

export default Providers;
