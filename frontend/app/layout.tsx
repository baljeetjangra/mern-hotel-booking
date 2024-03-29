import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MERN Hotels",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <>
            <Header />
            {children}
            <Toaster />
            {/* <Footer /> */}
          </>
        </Providers>
      </body>
    </html>
  );
}
