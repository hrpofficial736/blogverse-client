import React from "react";
import { BeatLoader } from "react-spinners";

export const Loader: React.FC = () => {
  return (
    <main className="w-40 h-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-4 justify-center items-center">
      <BeatLoader color="#1d4ed8" size={20} className="text-primary" />
      <h3 className="text-center">Please wait...</h3>
    </main>
  );
};
