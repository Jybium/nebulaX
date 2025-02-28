import React from "react";
import { Playfair_Display } from "next/font/google";
import head from "@/assets/head-hero.svg";
import ecllipse from "@/assets/ecllipse-hero.svg";
import Image from "next/image";

const playfair = Playfair_Display({ weight: "400", subsets: ["latin"] });

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center h-max lg:h-screen bg-black text-white w-full">
      <div className="absolute flex justify-between w-full opacity-30">
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
          className="w-full hidden lg:block"
        />
      </div>

      <div className="w-[90%] lg:w-2/3 m-auto h-[50vh] lg:h-[80vh] flex flex-col justify-center relative z-10">
        <h1
          className="text-4xl lg:text-6xl font-medium lg:text-center text-white leading-relaxed lg:leading-[1.7]"
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
