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
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-10 w-4/5 lg:w-2/3 mx-auto mb-4 lg:mb-10 text-center">
        <CategoryCard
          category={categories[0]}
          categoryImage={categoryImage}
          isLoading={isLoading}
          className="h-32 lg:col-span-2 lg:h-80"
          capitalizeAndDeleteDash={capitalizeAndDeleteDash}
        />
        <CategoryCard
          category={categories[1]}
          categoryImage={categoryImage}
          isLoading={isLoading}
          className="h-32 lg:row-span-2 lg:h-full"
          capitalizeAndDeleteDash={capitalizeAndDeleteDash}
        />
        <CategoryCard
          category={categories[2]}
          categoryImage={categoryImage}
          isLoading={isLoading}
          className="h-32 lg:col-span-2 lg:h-80"
          capitalizeAndDeleteDash={capitalizeAndDeleteDash}
        />
      </div>
    );
  }

  // Second layout: tall vertical card, large horizontal card, large horizontal card
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:w-2/3 lg:gap-10 w-4/5 mx-auto mb-4 lg:mb-10 text-center">
      <CategoryCard
        category={categories[0]}
        categoryImage={categoryImage}
        isLoading={isLoading}
        className="h-32 lg:row-span-2 lg:h-full"
        capitalizeAndDeleteDash={capitalizeAndDeleteDash}
      />
      <CategoryCard
        category={categories[1]}
        categoryImage={categoryImage}
        isLoading={isLoading}
        className="h-32 lg:col-span-2 lg:h-80"
        capitalizeAndDeleteDash={capitalizeAndDeleteDash}
      />
      <CategoryCard
        category={categories[2]}
        categoryImage={categoryImage}
        isLoading={isLoading}
        className="h-32 lg:col-span-2 lg:h-80"
        capitalizeAndDeleteDash={capitalizeAndDeleteDash}
      />
    </div>
  );
};

export default CategoryGrid;
