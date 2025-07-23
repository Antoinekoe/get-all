import React, { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "../services/DummyAPI";
import { getProductsWithSearch } from "../services/DummyAPI";
import Pagination from "./Pagination";

const ProductsSection = ({
  numberOfProducts,
  paginationLimit = 0,
  searchTerm,
}) => {
  const [products, setProducts] = useState([]);
  const [productsInActualPage, setProductsInActualPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (paginationLimit > 0) {
      const startIndex = (currentPage - 1) * paginationLimit;
      const endIndex = startIndex + paginationLimit;

      setProductsInActualPage(products.slice(startIndex, endIndex));
    } else {
      setProductsInActualPage(products);
    }
  }, [currentPage, products, paginationLimit]);

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

  useEffect(() => {
    if (!searchTerm) {
      getProducts(numberOfProducts, paginationLimit).then((data) => {
        setProducts(data);
        setCurrentPage(1);
      });
    } else {
      getProductsWithSearch(numberOfProducts, paginationLimit, searchTerm).then(
        (data) => {
          setProducts(data);
          setCurrentPage(1);
        }
      );
    }
  }, [numberOfProducts, paginationLimit, searchTerm]);

  const totalPages =
    paginationLimit > 0 ? Math.ceil(products.length / paginationLimit) : 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <>
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-3 items-center justify-items-center w-5/6 m-auto">
            {productsInActualPage.map((product, index) => (
              <Product
                key={index}
                id={product.id}
                category={product.category}
                description={product.description}
                price={product.price}
                title={product.title}
                images={product.images}
              />
            ))}
          </div>
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
export default ProductsSection;
