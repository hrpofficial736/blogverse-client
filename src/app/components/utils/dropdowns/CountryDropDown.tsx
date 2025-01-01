"use client";

import React, { useState } from "react";
import Countries from "@/app/utils/manual-data-files/countries.json";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

interface CountryDropDownProps {
  selectedCountry: string;
  onChange: (country: string) => void;
}

export const CountryDropDown: React.FC<CountryDropDownProps> = ({
  selectedCountry,
  onChange,
}) => {
  const [display, setDisplay] = useState<boolean>(false);
  const countries = Countries.countries;
  const handleCountryChange = (country: string) => {
    onChange(country);
    setDisplay(false);
  };
  return (
    <main>
      <div
        onClick={() => setDisplay(!display)}
        className="rounded-md border border-black bg-zinc-100 w-fit h-9 px-3 py-2 flex space-x-3 hover:cursor-pointer"
      >
        <h1 className="text-[80%]">
          {selectedCountry === "" ? "Select a Country" : selectedCountry}
        </h1>
        <MdKeyboardArrowDown />
      </div>
      <AnimatePresence>
        {display && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`${display} no-scrollbar border border-black flex flex-col w-[150px] h-40 overflow-scroll absolute bg-white rounded-lg`}
            >
              {countries.map((country, index) => {
                return (
                  <div
                    key={index}
                    className="flex cursor-pointer text-sm hover:bg-zinc-200"
                    onClick={() => {
                      setDisplay(false);
                      handleCountryChange(`${country.label} ${country.value}`);
                    }}
                  >
                    {country.label} {country.value}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
