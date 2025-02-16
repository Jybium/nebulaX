import Image from "next/image";
import React from "react";

const ValueCard = ({
  image,
  text,
  title,
}: {
  image: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Image src={image} alt={text} className="" />
        <p className="font-medium text-xl">{text}</p>
      </div>
      <p className="font-medium text-sm">{title}</p>
    </div>
  );
};

export default ValueCard;
