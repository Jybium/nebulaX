import React from "react";

const NavLink = () => {
  return (
    <nav className="flex items-center space-x-8 text-white">
      <ul className="flex items-center space-x-8 text-white">
        <li className="">
          <a href="/about" className="">
            About
          </a>
        </li>
        <li className="">
          <a href="/teams" className="">
            Teams
          </a>
        </li>
        <li className="">
          <a href="/marketplace" className="">
            Marketplace
          </a>
        </li>
      </ul>

      <button className="rounded-full text-black bg-white p-2 font-bold">
        Connect Wallet
      </button>
    </nav>
  );
};

export default NavLink;
