import React, { useEffect, useState } from "react";
import Menu from "../components/Layout/Menu";
import ProductsGrid from "../components/products/ProductsGrid";
import Footer from "../components/Layout/Footer";
import Searchbar from "../components/ui/Searchbar";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { capitalizeAndDeleteDash } from "../utils/stringUtils";
import Select from "react-select";

// Products page with search and category filtering
const Products = () => {
  const { search, category } = useParams();
  const { allCategories } = useCategories();
  const { selectedCategory, setSelectedCategory } = useCategories();
  const [imageLoading, setImageLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle category selection in product page
  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    const newCategory = selectedOption ? selectedOption.value : "";
    setSelectedCategory(newCategory);

    if (newCategory) {
      navigate(`/products/category/${newCategory}`);
    } else {
      navigate("/products");
    }
  };

  // Handle category selection from categories page
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("");
    }
  }, [category, setSelectedCategory]);

  // Format categories for select dropdown
  const options = allCategories.map((cat) => ({
    value: cat,
    label: capitalizeAndDeleteDash(cat),
  }));

  return (
    <>
      <Menu />
      <div className="pt-10 md:pt-20 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="font-medium text-3xl md:text-4xl lg:text-6xl text-center my-15">
            Our products
          </h1>
          {/* Search and filter controls */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-center justify-center">
            <Searchbar />
            <div className="flex relative shadow-uniform justify-center items-center bg-white rounded-2xl px-4 w-60 md:w-96">
              <Select
                options={options}
                onChange={handleChange}
                placeholder="Filter by category"
                isClearable={true}
                className="w-full"
                value={
                  selectedCategory
                    ? options.find(
                        (option) => option.value === selectedCategory
                      )
                    : null
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#B6B09F"
                      : state.isFocused
                      ? "#B6B09F"
                      : "white",
                    color: state.isSelected
                      ? "black"
                      : state.isFocused
                      ? "#your-focus-text-color"
                      : "#374151",
                    padding: "12px 16px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#B6B09F",
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
      </div>
      <ProductsGrid
        numberOfProducts={25}
        paginationLimit={9}
        searchTerm={search}
        categoryTerm={category}
        gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      />
      <Footer />
    </>
  );
};

export default Products;
