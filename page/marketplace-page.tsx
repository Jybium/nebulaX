import React from "react";
import NFTPage from "@/components/marketplace/features-nfts";
import HeroSection from "@/components/marketplace/hero-section";

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
