import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getAllCategories, getCategoryImages } from "../services/DummyAPI";
import CategoryGrid from "../components/CategoryGrid";
import { capitalizeAndDeleteDash } from "../utils/stringUtils.jsx";

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllCategories().then((data) => {
      setAllCategories(data);
    });
  }, []);

  useEffect(() => {
    if (allCategories.length > 0) {
      setIsLoading(true);
      getCategoryImages(allCategories).then((data) => {
        setCategoryImage(data);
        setIsLoading(false);
      });
    }
  }, [allCategories]);

  const renderAllGrids = () => {
    const grids = [];
    let categoryIndex = 0;

    while (categoryIndex < allCategories.length) {
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
      <div className="pt-20">
        <h1 className="font-medium text-6xl text-center my-15">
          Choose your category
        </h1>
        {renderAllGrids()}
      </div>
      <Footer />
    </>
  );
};

export default Categories;
