import React from "react";
import Menu from "../components/Menu";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import { useParams } from "react-router-dom";

const Products = () => {
  const { search, category } = useParams();

  return (
    <>
      <Menu />
      <div className="flex flex-col justify-center items-center gap-10 my-20">
        <h1 className="font-medium text-6xl text-center my-10">Our products</h1>
        <div className="flex gap-10">
          <Searchbar />
          <div className="flex shadow-uniform justify-center items-center bg-white rounded-2xl px-4 py-2 w-96">
            <select className="w-full border-gray-300 self-end focus:outline-none">
              <option value="" className="rounded">
                Filter by category
              </option>
              <option value="category-value">Category 1</option>
            </select>
          </div>
        </div>
      </div>
      <ProductsSection
        numberOfProducts={25}
        paginationLimit={9}
        searchTerm={search}
        categoryTerm={category}
      />
      <Footer />
    </>
  );
};

export default Products;
