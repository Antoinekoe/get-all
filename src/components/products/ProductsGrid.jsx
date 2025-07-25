import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  // If there's a pagination set, show current page products
  const currentPageProducts = useMemo(() => {
    if (paginationLimit > 0) {
      const startIndex = (currentPage - 1) * paginationLimit;
      const endIndex = startIndex + paginationLimit;
      return products.slice(startIndex, endIndex);
    }
    return products;
  }, [products, currentPage, paginationLimit]);

  useEffect(() => {
    setProductsInActualPage(currentPageProducts);
  }, [currentPageProducts]);

  // Set the total pages, isFirstPage and isLastPage.
  const paginationInfo = useMemo(() => {
    const totalPages =
      paginationLimit > 0 ? Math.ceil(products.length / paginationLimit) : 1;
    return {
      totalPages,
      isFirstPage: currentPage === 1,
      isLastPage: currentPage >= totalPages,
    };
  }, [products.length, paginationLimit, currentPage]);

  // Next/previous function, only rendered once
  const changePage = useCallback((operator) => {
    setCurrentPage((prevPage) => {
      const newPage = operator === "+" ? prevPage + 1 : prevPage - 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return newPage;
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        if (!searchTerm && !categoryTerm) {
          const data = await getProducts(numberOfProducts, paginationLimit);
          setProducts(data);
          setCurrentPage(1);
        } else if (searchTerm && !categoryTerm) {
          const data = await getProductsWithSearch(
            numberOfProducts,
            paginationLimit,
            searchTerm
          );
          setProducts(data);
          setCurrentPage(1);
        } else if (!searchTerm && categoryTerm) {
          const data = await getProductsByCategory(categoryTerm);
          setProducts(data.products);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
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
              isFirstPage={paginationInfo.isFirstPage}
              isLastPage={paginationInfo.isLastPage}
              totalPages={paginationInfo.totalPages}
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
