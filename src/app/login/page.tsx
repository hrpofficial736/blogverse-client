"use client";

import React, { useState } from "react";
import Login from "@/app/components/auth/Login";
import { motion } from "framer-motion";
import { Loader } from "../components/utils/loader/Loader";

const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const toggleLoader = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  return (
    <div>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.4 }}
      >
        {!isAuthenticated && (
          <div className="max-lg:w-screen">
            <h3 className="font-[Dancing] text-primary font-bold text-3xl mt-3 ml-4">
              BlogVerse
            </h3>
            <main
              style={{ backgroundColor: "whitesmoke" }}
              className="h-[80vh] flex items-center"
            >
              <Login toggleLoader={toggleLoader} />
            </main>
          </div>
        )}
      </motion.div>
      {isAuthenticated && <Loader />}
    </div>
  );
};

export default LoginPage;
