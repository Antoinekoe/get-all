import React from "react";
import CategoryCard from "./CategoryCard";
import { capitalizeAndDeleteDash } from "../utils/stringUtils";

const CategoryGrid = ({
  categories,
  categoryImage,
  isLoading,
  isFirstLayout = true,
}) => {
  // First layout: large horizontal card, tall vertical card, large horizontal card
  if (isFirstLayout) {
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-10 w-1/2 mx-auto mb-10 text-center">
        <CategoryCard
          category={categories[0]}
          categoryImage={categoryImage}
          isLoading={isLoading}
          className="col-span-2 h-80"
          capitalizeAndDeleteDash={capitalizeAndDeleteDash}
        />
        <CategoryCard
          category={categories[1]}
          categoryImage={categoryImage}
          isLoading={isLoading}
          className="row-span-2"
          capitalizeAndDeleteDash={capitalizeAndDeleteDash}
        />
        <CategoryCard
          category={categories[2]}
          categoryImage={categoryImage}
          isLoading={isLoading}
          className="col-span-2"
          capitalizeAndDeleteDash={capitalizeAndDeleteDash}
        />
      </div>
    );
  }

  // Second layout: tall vertical card, large horizontal card, large horizontal card
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-10 w-1/2 mx-auto mb-10 text-center">
      <CategoryCard
        category={categories[0]}
        categoryImage={categoryImage}
        isLoading={isLoading}
        className="row-span-2"
        capitalizeAndDeleteDash={capitalizeAndDeleteDash}
      />
      <CategoryCard
        category={categories[1]}
        categoryImage={categoryImage}
        isLoading={isLoading}
        className="col-span-2 h-80"
        capitalizeAndDeleteDash={capitalizeAndDeleteDash}
      />
      <CategoryCard
        category={categories[2]}
        categoryImage={categoryImage}
        isLoading={isLoading}
        className="col-span-2"
        capitalizeAndDeleteDash={capitalizeAndDeleteDash}
      />
    </div>
  );
};

export default CategoryGrid;
