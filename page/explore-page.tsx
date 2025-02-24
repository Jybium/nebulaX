import Herosection from "@/components/explore/hero-section";
import ImageNFTs from "@/components/explore/image-nfts";
import VideoNFTs from "@/components/explore/video-nfts";
import React from "react";

const ExplorePage = () => {
  return (
    <main>
      <Herosection />
      <VideoNFTs />
      <ImageNFTs />
    </main>
  );
};

export default ExplorePage;
