import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getAllCategories, getCategoryImages } from "../services/DummyAPI";
import CategoryGrid from "../components/CategoryGrid";
import { useCategories } from "../hooks/useCategories";

const Categories = () => {
  // State management for categories and images
  const [categoryImage, setCategoryImage] = useState({});
  const { allCategories, isLoading, setAllCategories, setIsLoading } =
    useCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load all categories on component mount
  useEffect(() => {
    getAllCategories().then((data) => {
      setAllCategories(data);
    });
  }, []);

  // Fetch category images when categories are loaded
  useEffect(() => {
    if (allCategories.length > 0) {
      setIsLoading(true);
      getCategoryImages(allCategories).then((data) => {
        setCategoryImage(data);
        setIsLoading(false);
      });
    }
  }, [allCategories]);

  // Render alternating grid layouts (first layout, second layout, repeat)
  const renderAllGrids = () => {
    const grids = [];
    let categoryIndex = 0;

    while (categoryIndex < allCategories.length) {
      // Render first grid layout (3 categories)
      if (categoryIndex < allCategories.length) {
        const newCategories = allCategories.slice(
          categoryIndex,
          categoryIndex + 3
        );
        grids.push(
          <CategoryGrid
            key={`first-${categoryIndex}`}
            categories={newCategories}
            categoryImage={categoryImage}
            isLoading={isLoading}
            isFirstLayout={true}
          />
        );
        categoryIndex += 3;
      }

      // Render second grid layout (3 categories)
      if (categoryIndex < allCategories.length) {
        const newCategories = allCategories.slice(
          categoryIndex,
          categoryIndex + 3
        );
        grids.push(
          <CategoryGrid
            key={`second-${categoryIndex}`}
            categories={newCategories}
            categoryImage={categoryImage}
            isLoading={isLoading}
            isFirstLayout={false}
          />
        );
        categoryIndex += 3;
      }
    }
    return grids;
  };

  return (
    <>
      <Menu />
      <div className="pt-10 md:pt-20">
        <h1 className="font-medium text-3xl md:text-4xl lg:text-6xl text-center my-15">
          Choose your category
        </h1>
        {renderAllGrids()}
      </div>
      <Footer />
    </>
  );
};

export default Categories;
