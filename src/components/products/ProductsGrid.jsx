import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "../../services/DummyAPI";
import { getProductsWithSearch } from "../../services/DummyAPI";
import Pagination from "../ui/Pagination";
import { getProductsByCategory } from "../../services/DummyAPI";
import { capitalizeAndDeleteDash } from "../../utils/stringUtils";

// Products display section with pagination and filtering
const ProductsGrid = ({
  numberOfProducts,
  paginationLimit = 0,
  searchTerm,
  categoryTerm,
  gridCols = "grid-cols-2 md:grid-cols-3",
}) => {
  // State for products and pagination
  const [products, setProducts] = useState([]);
  const [productsInActualPage, setProductsInActualPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate pagination info
  const totalPages =
    paginationLimit > 0 ? Math.ceil(products.length / paginationLimit) : 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  // Handle pagination - slice products for current page
  useEffect(() => {
    if (paginationLimit > 0) {
      const startIndex = (currentPage - 1) * paginationLimit;
      const endIndex = startIndex + paginationLimit;

      setProductsInActualPage(products.slice(startIndex, endIndex));
    } else {
      setProductsInActualPage(products);
    }
  }, [currentPage, products, paginationLimit]);

  // Navigation between pages with smooth scroll to top
  const changePage = (operator) => {
    switch (operator) {
      case "+":
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "-":
        setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
    }
  };

  // Fetch products based on search/category filters
  useEffect(() => {
    if (!searchTerm && !categoryTerm) {
      // Load all products
      getProducts(numberOfProducts, paginationLimit).then((data) => {
        setProducts(data);
        setCurrentPage(1);
      });
    }
    if (searchTerm && !categoryTerm) {
      // Search products by term
      getProductsWithSearch(numberOfProducts, paginationLimit, searchTerm).then(
        (data) => {
          setProducts(data);
          setCurrentPage(1);
        }
      );
    }
    if (!searchTerm && categoryTerm) {
      // Filter products by category
      getProductsByCategory(categoryTerm).then((data) => {
        setProducts(data.products);
        setCurrentPage(1);
      });
    }
  }, [numberOfProducts, paginationLimit, searchTerm, categoryTerm]);

  return (
    <>
      {products.length > 0 ? (
        <>
          {/* Product grid display */}
          <div
            className={`grid ${gridCols} items-center justify-items-center w-4/6 mt-10 m-auto gap-1 md:gap-12`}
          >
            {productsInActualPage.map((product, index) => (
              <Product
                key={index}
                id={product.id}
                category={capitalizeAndDeleteDash(product.category)}
                description={product.description}
                price={product.price}
                title={product.title}
                images={product.images}
              />
            ))}
          </div>

          {/* Pagination controls */}
          <div>
            <Pagination
              changePage={changePage}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center text-4xl font-bold">
          Sorry, there are no products matching your criterias.
        </div>
      )}
    </>
  );
};
export default ProductsGrid;
