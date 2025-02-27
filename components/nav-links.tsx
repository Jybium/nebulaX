import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { ConnectBtn } from "./connect-button";

const NavLink = () => {
  return (
    <nav className="flex items-center space-x-12 text-white">
      <ul className="flex items-center space-x-12 text-white">
        {/* <li className="">
          <a href="/about" className="">
            About
          </a>
        </li> */}
        <li className="">
          <a href="/explore" className="">
            Explore
          </a>
        </li>
        <li className="">
          <a href="/marketplace" className="">
            Marketplace
          </a>
        </li>
      </ul>

      <ConnectBtn />
    </nav>
  );
};

export default NavLink;
