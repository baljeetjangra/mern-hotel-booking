import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className=" py-6">
      <div className="container mx-auto flex gap-2 flex-wrap justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl  font-bold">
            Find your next{" "}
            <span className="text-primary font-extrabold">adventure</span>
          </h1>
          <p className="text-xl ">
            Search for your next adventure and book <br /> your dream vacation.
          </p>
        </div>
        <div className="w-1/2 h-96 relative">
          <Image
            className="object-cover rounded-xl"
            src={"/assets/hotel.jpg"}
            layout="fill"
            objectFit="cover"
            alt="hero image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
