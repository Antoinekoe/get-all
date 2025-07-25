import { Search } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsSuggestions } from "../../services/DummyAPI";
import SearchSuggestions from "../products/SearchSuggestions";

// Search component with product suggestions
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsSuggested, setProductsSuggested] = useState([]);
  const searchbarRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const debouncedSearch = useCallback((value) => {
    //Clear the timeout if another letter is written
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (value.length >= 4) {
        getProductsSuggestions(value).then((data) => {
          setProductsSuggested(data.products);
        });
      } else {
        setProductsSuggested([]);
      }
    }, 500);
  }, []);

  // Final cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close suggestions when clicking outside
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

  // Get product suggestions after 4+ characters, and call API just once
  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const resetProductsSuggested = () => {
    setProductsSuggested([]);
  };

  const resetSearchTerm = () => {
    setSearchTerm("");
  };

  // Navigate to search results
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
        <SearchSuggestions
          productsSuggested={productsSuggested}
          resetProductsSuggested={resetProductsSuggested}
          resetSearchTerm={resetSearchTerm}
        />
      )}
    </div>
  );
};

export default Searchbar;
