import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getAllCategories } from "../services/DummyAPI";

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      setAllCategories(data);
    });
  }, []);

  const renderFirstGrid = (categories) => (
    <div className="grid grid-cols-3 grid-rows-2 gap-10 w-1/2 mx-auto mb-10">
      <div className="bg-amber-300 col-span-2 h-80">{categories[0]}</div>
      <div className="bg-amber-800 row-span-2">{categories[1]}</div>
      <div className="bg-black col-span-2">{categories[2]}</div>
    </div>
  );
  const renderSecondGrid = (categories) => (
    <div className="grid grid-cols-3 grid-rows-2 gap-10 w-1/2 mx-auto mb-10">
      <div className="bg-amber-800 row-span-2">{categories[0]}</div>
      <div className="bg-amber-300 col-span-2 h-80">{categories[1]}</div>
      <div className="bg-black col-span-2">{categories[2]}</div>
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
