import Image from "next/image";
import React from "react";

import firstImage from "@/assets/explore-1.png";
import secondImage from "@/assets/explore-2.png";

const Herosection = () => {
  return (
    <div className="grid lg:flex lg:justify-between p-10 border-y">
      <div className="space-y-5">
        <h2 className=" font-bold text-2xl">Marketing your NFTs</h2>
        <p className="">Strategies for Success in a Competitive Space</p>
      </div>

      <Image src={firstImage} alt="" className="hidden lg:block mt-4 lg:mt-0" />
      <Image src={secondImage} alt="" className="mt-6 lg:mt-0" />
    </div>
  );
};

export default Herosection;
