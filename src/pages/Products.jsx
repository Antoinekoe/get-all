import React from "react";
import Menu from "../components/Menu";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import { useParams } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { capitalizeAndDeleteDash } from "../utils/stringUtils";
import Select from "react-select";

const Products = () => {
  const { search, category } = useParams();
  const { allCategories } = useCategories();

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  const options = [
    { value: "", label: "Filter by category" },
    ...allCategories.map((cat) => ({
      value: cat,
      label: capitalizeAndDeleteDash(cat),
    })),
  ];

  return (
    <>
      <Menu />
      <div className="flex flex-col justify-center items-center gap-10 my-20">
        <h1 className="font-medium text-6xl text-center my-10">Our products</h1>
        <div className="flex gap-10">
          <Searchbar />
          <div className="flex shadow-uniform justify-center items-center bg-white rounded-2xl px-4 w-96">
            <Select
              options={options}
              onChange={handleChange}
              placeholder="Filter by category"
              isClearable={true}
              className="w-full"
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#B6B09F" : "white",
                  color: state.isFocused ? "black" : "black",
                  cusor: "pointer",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "black",
                  "&:hover": {
                    color: "black",
                    cursor: "pointer",
                  },
                }),
              }}
            />
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
