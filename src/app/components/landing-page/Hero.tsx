"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HeroImage from "@/app/resources/images/hero.jpg";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const Hero: React.FC = () => {
  const router: AppRouterInstance = useRouter();
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="flex items-center gap-x-[80px] lg:gap-x-[1000px]">
        <h3 className="font-[Dancing] text-primary font-bold text-3xl p-6 pt-7">
          BlogVerse
        </h3>
        <div>
          <button
            onClick={() => router.push("/register")}
            className="hidden sm:inline-block bg-primary font-[Nunito] rounded-3xl text-white
        font-bold w-48 h-11
        hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
        "
          >
            Create an Account
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-white font-[Nunito] rounded-3xl text-black
        font-bold w-fit px-10 h-11 ml-5
       hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
        "
          >
            Login
          </button>
        </div>
      </div>
      <main
        className="w-[90%] h-[70vh] overflow-hidden mx-auto flex flex-col-reverse
        relative md:flex-row md:flex bg-white rounded-3xl md:mt-5"
      >
        <div className="mx-5 mb-7 md:w-1/2 md:h-full md:py-5 md:pl-10 md:justify-center flex flex-col gap-y-5">
          <div className="md:flex md:flex-col md:gap-y-3">
            <h1 className="text-2xl sm:text-5xl text-black font-[MerriWeather]">
              Your Stories, Your Voice
            </h1>
            <h1 className="text-2xl sm:text-5xl text-primary font-[MerriWeather]">
              The World&apos;s Inspiration
            </h1>
            <p className="w-[90%] text-sm sm:text-xl text-zinc-500 font-sans">
              Discover insights, share stories, and ignite conversations. Dive
              into a world of content where every post inspires your next idea.
            </p>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="bg-primary font-[Nunito] rounded-3xl text-white
            font-bold w-48 h-11
            hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
            "
          >
            Get Started
          </button>
        </div>
        <Image
          quality={100}
          src={HeroImage}
          alt="BlogVerse"
          className="w-full md:w-1/2 absolute top-0 h-1/2 md:h-full clip-path-polygon-mobile md:right-0
          md:clip-path-polygon rounded-tl-3xl rounded-tr-3xl md:rounded-br-3xl md:rounded-tr-3xl"
        />
      </main>
    </motion.div>
  );
};
