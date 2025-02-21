import React from "react";
import { Playfair_Display } from "next/font/google";
import head from "@/assets/marketplace-hero.svg";
import Image from "next/image";

const playfair = Playfair_Display({ weight: "400", subsets: ["latin"] });

const HeroSection = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-black text-white">
      <div className="">
        <Image
          src={head}
          alt="head"
          width={100}
          height={100}
          className="w-auto"
        />
      </div>

      <div className="w-fit m-a5uto h-[80vh] flex flex-col justify-center relative z-10 space-y-3">
        <h1
          className="text-6xl font-medium text-white leading-[98px]"
          style={playfair.style}
        >
          Exploring Trending NFTS
        </h1>

        <p className="text-3xl leading-[48.7px]">
          "Art meets technology! 🌟 Explore the fascinating world of NFTs and
          learn how blockchain is transforming the art market, and discover how
          digital ownership is changing creativity forever."
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
