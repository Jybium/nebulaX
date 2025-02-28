"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "@/components/hero-section";
import AboutUs from "@/components/about-us";
import LatestDrops from "@/components/latest-drop";
import SpinWheelModal from "@/components/spin-wheel";

const HomePage = () => {
  const [spinWheelOpen, setSpinWheelOpen] = useState(false);

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    // const today = new Date().toISOString().slice(0, 10);
    // const lastShownDate = localStorage.getItem("spinWheelShownDate");

    // Open modal only if it hasn't been shown today
    // if (lastShownDate !== today) {
    setSpinWheelOpen(true);
    // localStorage.setItem("spinWheelShownDate", today);
    // }
  }, []);

  return (
    <main>
      {spinWheelOpen && (
        <SpinWheelModal setShowSpin={() => setSpinWheelOpen(false)} />
      )}
      <HeroSection />
      <AboutUs />
      <LatestDrops />
    </main>
  );
};

export default HomePage;
