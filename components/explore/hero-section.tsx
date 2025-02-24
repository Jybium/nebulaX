import Image from "next/image";
import React from "react";

import firstImage from "@/assets/explore-1.png";
import secondImage from "@/assets/explore-2.png";

const Herosection = () => {
  return (
    <div className="flex justify-between p-10 border-y">
      <div className="space-y-5">
        <h2 className=" font-bold text-2xl">Marketing your NFTs</h2>
        <p className="">Strategies for Success in a Competitive Space</p>
      </div>

      <Image src={firstImage} alt="" />
      <Image src={secondImage} alt="" />
    </div>
  );
};

export default Herosection;
