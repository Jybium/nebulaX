import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-5 text-white">
      <Image src={logo} alt="logo" width={50} height={50} />

      <span className="text-2xl font-medium">NebulaX</span>
    </Link>
  );
};

export default Logo;
