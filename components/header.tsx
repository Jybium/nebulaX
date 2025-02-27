import React from "react";
import Logo from "./logo";
import SearchBar from "./search-bar";
import NavLink from "./nav-links";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-2">
      <Logo />
      <SearchBar />
      <NavLink />
    </header>
  );
};

export default Header;
