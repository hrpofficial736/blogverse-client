"use client";

import React from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import writeImage from "@/app/resources/images/write.jpg";

export const Write: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <main className="flex flex-col overflow-hidden md:flex md:flex-row md:gap-x-52 w-[90%] h-[50vh] md:h-[60vh] rounded-3xl bg-white mt-10 mx-auto">
        <Image
          src={writeImage}
          alt="Write and Share"
          className="rounded-3xl w-full h-[60%] md:w-[40%] md:h-full"
        />
        <div className="flex flex-col justify-center items-center mt-6 gap-2">
          <h1 className="font-[MerriWeather] text-3xl md:text-6xl text-primary font-semi-bold">
            Write and Share
          </h1>
          <p className="w-full md:w-96 text-base md:text-xl text-zinc-500 font-sans text-center">
            Share your thoughts and knowledge with the world through insightful
            blog posts.
          </p>
        </div>
      </main>
    </motion.div>
  );
};
