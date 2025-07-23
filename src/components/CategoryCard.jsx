import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({
  category,
  categoryImage,
  isLoading,
  className = "",
  capitalizeAndDeleteDash,
}) => {
  return (
    <div
      className={`flex justify-center items-center bg-contain bg-no-repeat bg-center ${className}`}
      style={
        isLoading === false
          ? { backgroundImage: `url(${categoryImage[category]})` }
          : {
              backgroundImage: "url(./src/assets/loading.gif)",
              backgroundSize: "100px",
            }
      }
    >
      <Link
        to={`/products/category/${category}`}
        className="flex justify-center items-center text-white text-6xl h-full w-full bg-black/30 hover:bg-black/80 hover:text-[4rem] transition-all duration-300"
      >
        {capitalizeAndDeleteDash(category)}
      </Link>
    </div>
  );
};

export default CategoryCard;
