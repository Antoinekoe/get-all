import React, { memo } from "react";
import { Link } from "react-router-dom";
import loading from "../../assets/loading.gif";
import { useCategories } from "../../hooks/useCategories";

const CategoryCard = memo(
  ({
    category,
    categoryImage,
    isLoading,
    className = "",
    capitalizeAndDeleteDash,
  }) => {
    const { setSelectedCategory } = useCategories();

    const handleClick = (category) => {
      setSelectedCategory(category);
    };

    return (
      <div
        className={`flex justify-center items-center bg-contain bg-no-repeat bg-center ${className}`}
        style={
          isLoading === false
            ? { backgroundImage: `url(${categoryImage[category]})` }
            : {
                backgroundImage: `url(${loading})`,
                backgroundSize: "100px",
              }
        }
      >
        <Link
          to={`/products/category/${category}`}
          className="flex justify-center items-center text-white text-[2.75rem] h-full w-full p-4 bg-gray-700/30 hover:bg-black/80 hover:text-[3rem] transition-all duration-300"
          onClick={() => handleClick(category)}
        >
          {capitalizeAndDeleteDash(category)}
        </Link>
      </div>
    );
  }
);

export default CategoryCard;
