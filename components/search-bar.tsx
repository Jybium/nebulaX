"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { LuSearch } from "react-icons/lu";

const SearchBar = ({
  placeholder = "Search NebulaX",
  onSearch,
}: {
  onSearch?: (v: string) => void;
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-1/5 items-center border rounded-2xl shadow-sm bg-white p-1 focus-within:ring-1 focus-within:ring-brand-primary-1">
      <button
        onClick={handleSearch}
        aria-label="Execute search"
        className="ml-2 mr-4 p-1 rounded-full"
      >
        <LuSearch className="text-xl text-black" />
      </button>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        aria-label="Search NebulaX"
        className="flex-1 outline-none border-none focus:ring-0 bg-transparent text-black placeholder:text-black/60 text-sm"
      />
    </div>
  );
};

export default SearchBar;
