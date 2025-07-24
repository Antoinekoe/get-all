import { Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsSuggestions } from "../services/DummyAPI";
import ProductsSuggested from "./ProductsSuggested";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsSuggested, setProductsSuggested] = useState([]);
  const searchbarRef = useRef(null);
  const navigate = useNavigate();

  // Check if a click has been made outside of the searchbar, if yes delete suggested products
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchbarRef.current &&
        !searchbarRef.current.contains(event.target)
      ) {
        setProductsSuggested([]);
      }
    };

    if (productsSuggested.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productsSuggested.length]);

  // If value entered > 4, get suggested products
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setTimeout(() => {
      e.target.value.length >= 4
        ? getProductsSuggestions(searchTerm).then((data) => {
            setProductsSuggested(data.products);
          })
        : setProductsSuggested([]);
    }, 500);

    return;
  };

  const resetProductsSuggested = () => {
    setProductsSuggested([]);
  };

  const resetSearchTerm = () => {
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={searchbarRef}>
      <form
        onSubmit={handleSearch}
        className="flex shadow-uniform justify-center items-center bg-white rounded-2xl px-4 py-2 w-full md:w-96"
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
      {productsSuggested.length > 0 && (
        <ProductsSuggested
          productsSuggested={productsSuggested}
          resetProductsSuggested={resetProductsSuggested}
          resetSearchTerm={resetSearchTerm}
        />
      )}
    </div>
  );
};

export default Searchbar;
