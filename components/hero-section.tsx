import React from "react";
import { Playfair_Display } from "next/font/google";
import head from "@/assets/head-hero.svg";
import ecllipse from "@/assets/ecllipse-hero.svg";
import Image from "next/image";

const playfair = Playfair_Display({ weight: "400", subsets: ["latin"] });

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="absolute flex justify-between w-full">
        <Image
          src={head}
          alt="head"
          width={100}
          height={100}
          className="w-auto"
        />
        <Image
          src={ecllipse}
          alt="ecllipse"
          width={100}
          height={100}
          className="w-full"
        />
      </div>

      <div className="w-2/3 m-auto h-[80vh] flex flex-col justify-center relative z-10">
        <h1
          className="text-6xl font-medium text-center text-white leading-snug"
          style={playfair.style}
        >
          Empowering Creators <br /> Seamless NFT Tokenization and Trading with
          Rewarding Gamified Incentives
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
