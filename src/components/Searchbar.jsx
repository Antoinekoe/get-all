import { Search } from "lucide-react";
import React from "react";

const Searchbar = () => {
  return (
    <form className="flex shadow-uniform justify-center items-center bg-white rounded-2xl px-4 py-2 w-96">
      <input
        type="text"
        className="w-full focus:outline-none"
        placeholder="An amazing vacuum cleaner"
        autoFocus
      />
      <Search className="cursor-pointer" />
    </form>
  );
};

export default Searchbar;
