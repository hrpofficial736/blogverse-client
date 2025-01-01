"use client";

import React, { useState } from "react";
import Register from "@/app/components/auth/Register";
import { motion } from "framer-motion";
import { Loader } from "@/app/components/utils/loader/Loader";

const RegisterPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const toggleLoader = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  return (
    <>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.4 }}
      >
        <div className="max-lg:w-screen">
          <h3 className="font-[Dancing] text-primary font-bold text-3xl mt-3 ml-5">
            BlogVerse
          </h3>
          {!isAuthenticated && (
            <main
              style={{ backgroundColor: "whitesmoke" }}
              className="h-[80vh] md:h-[700px] flex items-center"
            >
              <Register toggleLoader={toggleLoader} />
            </main>
          )}
        </div>
      </motion.div>
      {isAuthenticated && <Loader />}
    </>
  );
};

export default RegisterPage;
