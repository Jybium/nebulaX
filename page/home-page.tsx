import AboutUs from "@/components/about-us";
import HeroSection from "@/components/hero-section";
import LatestDrops from "@/components/latest-drop";
import React from "react";

const HomePage = () => {
  return (
    <main>
      <HeroSection />

      <AboutUs />

      <LatestDrops />
    </main>
  );
};

export default HomePage;
