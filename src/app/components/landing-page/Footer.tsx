"use client";

import React from "react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  return (
    <motion.div>
      <main
        style={{
          borderTopLeftRadius: "60px",
          borderTopRightRadius: "60px",
        }}
        className="w-[100vw] flex flex-col relative h-[40vh] md:h-[50vh] mt-10 bg-primary text-white p-10"
      >
        <div className="flex flex-col md:py-8 gap-y-7 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-y-2">
            <h1 className="text-white font-bold font-[Nunito] text-center text-2xl md:text-5xl">
              Join Our Newsletter
            </h1>
            <p className="w-[90%] text-center md:w-[75%] text-sm md:text-xl text-white font-sans">
              Get the latest articles, tips, and updates delivered straight to
              your inbox. Stay informed, stay inspired!
            </p>
          </div>
          <div className="flex gap-x-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-[90%] md:w-96 h-10 rounded-3xl bg-white p-4 text-black font-sans"
            />
            <button
              className="bg-white text-black font-sans font-bold rounded-3xl w-40 h-10
          hover:bg-gray-200"
            >
              Submit
            </button>
          </div>
          <h6 className="text-base absolute bottom-3 text-gray-50 font-sans text-center">
            © 2024 BlogVerse. All rights reserved.
          </h6>
        </div>
      </main>
    </motion.div>
  );
};
