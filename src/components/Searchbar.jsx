import { Search } from "lucide-react";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm("");
    navigate(`/products/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex shadow-uniform justify-center items-center bg-white rounded-2xl px-4 py-2 w-96"
    >
      <input
        type="text"
        className="w-full focus:outline-none"
        placeholder="An amazing vacuum cleaner"
        onChange={handleChange}
        value={searchTerm}
        autoFocus
      />
      <Search className="cursor-pointer" onClick={handleSearch} />
    </form>
  );
};

export default Searchbar;
