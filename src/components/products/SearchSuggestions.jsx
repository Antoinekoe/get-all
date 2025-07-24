import React from "react";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = ({
  productsSuggested,
  resetProductsSuggested,
  resetSearchTerm,
}) => {
  const navigate = useNavigate();

  const handleClick = (productTitle) => {
    resetProductsSuggested();
    resetSearchTerm();
    navigate(`/products/search/${productTitle}`);
  };
  return (
    <div className="absolute flex flex-col gap-3 top-full left-4 right-4 rounded bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
      {productsSuggested.map((product, index) => (
        <div
          key={index}
          className="hover:cursor-pointer p-2  hover:text-white hover:bg-[#B6B09F]"
          onClick={() => handleClick(product.title)}
        >
          {product.title}
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
