import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  getAllCategories,
  getCategoryImage,
  fetchCategoryImages,
} from "../services/DummyAPI";

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState({});

  useEffect(() => {
    getAllCategories().then((data) => {
      setAllCategories(data);
    });
  }, []);

  useEffect(() => {
    if (allCategories.length > 0) {
      console.log(allCategories);
      fetchCategoryImages(allCategories).then((data) => setCategoryImage(data));
    }
  }, [allCategories]);

  const capitalizeAndDeleteDash = (string) => {
    let newString = string.charAt(0).toUpperCase() + string.slice(1);
    newString = newString.replace(/-/g, " ");
    return newString;
  };

  const renderFirstGrid = (categories) => (
    <div className="grid grid-cols-3 grid-rows-2 gap-10 w-1/2 mx-auto mb-10">
      <div
        className="flex justify-center items-center col-span-2 h-80 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${categoryImage[categories[0]]})` }}
      >
        <Link
          to={`/products/category/${categories[0]}`}
          className="flex justify-center items-center text-white text-6xl h-full w-full bg-black/30 hover:bg-black/80 hover:text-[4rem] transition-all duration-300"
        >
          {capitalizeAndDeleteDash(categories[0])}
        </Link>
      </div>
      <div
        className="flex justify-center items-center text-center row-span-2 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${categoryImage[categories[1]]})` }}
      >
        <Link
          to={`/products/category/${categories[1]}`}
          className="flex justify-center items-center text-white text-6xl h-full w-full bg-black/30 hover:bg-black/80 hover:text-[4rem] transition-all duration-300"
        >
          {capitalizeAndDeleteDash(categories[1])}
        </Link>
      </div>
      <div
        className="flex justify-center items-center col-span-2 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${categoryImage[categories[2]]})` }}
      >
        <Link
          to={`/products/category/${categories[2]}`}
          className="flex justify-center items-center text-white text-6xl h-full w-full bg-black/30 hover:bg-black/80 hover:text-[4rem] transition-all duration-300"
        >
          {capitalizeAndDeleteDash(categories[2])}
        </Link>
      </div>
    </div>
  );
  const renderSecondGrid = (categories) => (
    <div className="grid grid-cols-3 grid-rows-2 gap-10 w-1/2 mx-auto mb-10">
      <div
        className="flex justify-center items-center row-span-2 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${categoryImage[categories[0]]})` }}
      >
        <Link
          to={`/products/category/${categories[0]}`}
          className="flex justify-center items-center text-center text-white text-6xl h-full w-full bg-black/30 hover:bg-black/80 hover:text-[4rem] transition-all duration-300"
        >
          {capitalizeAndDeleteDash(categories[0])}
        </Link>
      </div>
      <div
        className="flex justify-center items-center col-span-2 h-80 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${categoryImage[categories[1]]})` }}
      >
        <Link
          to={`/products/category/${categories[1]}`}
          className="flex justify-center items-center text-white text-6xl h-full w-full bg-black/30 hover:bg-black/80 hover:text-[4rem] transition-all duration-300"
        >
          {capitalizeAndDeleteDash(categories[1])}
        </Link>
      </div>
      <div
        className="flex justify-center items-center col-span-2 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${categoryImage[categories[2]]})` }}
      >
        <Link
          to={`/products/category/${categories[2]}`}
          className="flex justify-center items-center text-white text-6xl h-full w-full bg-black/30 hover:bg-black/80 hover:text-[4rem] transition-all duration-300"
        >
          {capitalizeAndDeleteDash(categories[2])}
        </Link>
      </div>
    </div>
  );

  const renderAllGrids = () => {
    const grids = [];
    let categoryIndex = 0;

    while (categoryIndex < allCategories.length) {
      if (categoryIndex < allCategories.length) {
        const newCategories = allCategories.slice(
          categoryIndex,
          categoryIndex + 3
        );
        grids.push(renderFirstGrid(newCategories));
        categoryIndex += 3;
      }
      if (categoryIndex < allCategories.length) {
        const newCategories = allCategories.slice(
          categoryIndex,
          categoryIndex + 3
        );
        grids.push(renderSecondGrid(newCategories));
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
