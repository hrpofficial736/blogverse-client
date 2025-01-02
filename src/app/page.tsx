"use client";

import React from "react";
import {
  Hero,
  Write,
  Idea,
  Footer,
} from "@/app/exports/components/landing-page/exports";
import { AnimatePresence } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <AnimatePresence>
      <main className="relative max-lg:w-screen">
        <Hero />
        <Write />
        <Idea />
        <Footer />
      </main>
    </AnimatePresence>
  );
};

export default LandingPage;
