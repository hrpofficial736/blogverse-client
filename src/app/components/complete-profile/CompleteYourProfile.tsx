"use client";

import { CompleteYourProfileForm } from "@/app/forms/CompleteYourProfileForm";
import React from "react";
import { toggleLoaderHandler } from "@/app/forms/LoginForm";

export const CompleteYourProfile: React.FC<toggleLoaderHandler> = ({
  toggleLoader,
}: {
  toggleLoader: () => void;
}) => {
  return (
    <main
      className="w-[90%] h-[65%] mx-auto pt-2
    bg-white lg:w-[30%] lg:h-[65%] rounded-3xl shadow-2xl shadow-primary"
    >
      <h1 className="text-center text-black text-lg lg:text-xl font-bold font-sans]">
        Complete Your Profile
      </h1>

      <CompleteYourProfileForm toggleLoader={toggleLoader} />
    </main>
  );
};
