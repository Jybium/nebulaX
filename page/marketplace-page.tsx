import React from "react";
import NFTPage from "@/components/marketplace/features-nfts";
import HeroSection from "@/components/marketplace/hero-section";
import PrizeWheel from "@/components/marketplace/prize-wheel";
import SpinWheel from "@/components/marketplace/spin-wheel";

const MarketplacePage = () => {
  return (
    <main>
      <HeroSection />
      <NFTPage />
      {/* <SpinWheel /> */}
    </main>
  );
};

export default MarketplacePage;
