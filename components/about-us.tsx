import React from "react";
import { ABOUT_US } from "@/data/landing-page";
import Image from "next/image";
import ValueCard from "./cards/value-card";

import background from "@/assets/ecllipse-general.jpeg";

const AboutUs = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={background}
          alt="NebulaX Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 grid lg:flex lg:justify-between items-center w-full gap-10 px-6 py-20">
        <div className="w-full lg:w-1/3 space-y-10">
          <h2 className="text-3xl font-semibold">Why NebulaX</h2>
          <p className="leading-7 text-xl">
            NebulaX is a decentralized exchange (DEX) platform designed for
            Global content creators to tokenize, mint, and trade video and image
            NFTs. The platform integrates gamified incentives through a custom
            gas token that acts as loyalty points, promoting organic growth and
            user engagement. Built on the ABC Testnet, NebulaX provides a
            seamless experience for NFT creators and collectors Globally.
          </p>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {ABOUT_US.map((feat) => (
            <ValueCard key={feat.id} {...feat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
