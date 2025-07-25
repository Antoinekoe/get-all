import React, { useEffect, useState } from "react";
import Menu from "../components/Layout/Menu";
import Footer from "../components/Layout/Footer";
import { getCategoryImages } from "../services/DummyAPI";
import CategoryGrid from "../components/Categories/CategoryGrid";
import { useCategories } from "../hooks/useCategories";
import loading from "../assets/loading.gif";

const Categories = () => {
  // State management for categories and images
  const [categoryImage, setCategoryImage] = useState({});
  const { allCategories, isLoading: isLoadingCategories } = useCategories();
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch category images when categories are loaded
  useEffect(() => {
    if (allCategories.length > 0) {
      setIsLoadingImages(true);
      getCategoryImages(allCategories)
        .then((data) => {
          setCategoryImage(data);
          setIsLoadingImages(false);
        })
        .catch((error) => {
          console.error("Error fetching category images :", error);
          setIsLoadingImages(false);
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
            isLoading={isLoadingImages}
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
            isLoading={isLoadingImages}
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
        {isLoadingCategories ? (
          <img
            src={loading}
            alt=""
            className="flex justify-center items-center w-32 mx-auto mt-20"
          />
        ) : (
          renderAllGrids()
        )}
      </div>
      <Footer />
    </>
  );
};

export default Categories;
