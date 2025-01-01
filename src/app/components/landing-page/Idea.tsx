"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ideaImage from "@/app/resources/images/idea.jpg";

export const Idea = () => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <main className="flex flex-col-reverse relative overflow-hidden md:flex md:flex-row-reverse w-[90%] h-[50vh] md:h-[60vh] rounded-3xl bg-white mt-10 mx-auto">
        <div className="flex flex-col z-10 m-4 mb-8 justify-center items-center gap-2 md:m-0 md:absolute md:left-0 md:w-1/2 md:h-full">
          <h1 className="font-[MerriWeather] text-3xl md:text-6xl text-primary font-semi-bold">
            Organize Ideas
          </h1>
          <p className="w-full md:w-96 text-base md:text-xl text-zinc-500 font-sans text-center">
            Easily categorize and organize your blog content for better
            readability.
          </p>
        </div>
        <Image
          src={ideaImage}
          alt="Write and Share"
          quality={100}
          className="absolute top-0 max-sm:rounded-tl-3xl rounded-tr-3xl md:rounded-br-3xl md:rounded-tr-3xl w-full h-[60%] md:w-1/2 md:h-full md:my-auto"
        />
      </main>
    </motion.div>
  );
};
