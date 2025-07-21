import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "../services/DummyAPI";
import { getProductsWithSearch } from "../services/DummyAPI";

const ProductsSection = ({
  numberOfProducts,
  paginationLimit = 0,
  searchTerm,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      getProducts(numberOfProducts, paginationLimit).then((data) => {
        setProducts(data);
      });
    } else {
      getProductsWithSearch(numberOfProducts, paginationLimit, searchTerm).then(
        (data) => {
          setProducts(data);
        }
      );
    }
  }, [numberOfProducts, paginationLimit, searchTerm]);

  return (
    <div className="grid grid-cols-3 items-center justify-items-center w-5/6 m-auto">
      {products.map((product, index) => (
        <Product
          key={index}
          category={product.category}
          description={product.description}
          price={product.price}
          title={product.title}
          images={product.images}
        />
      ))}
    </div>
  );
};

export default ProductsSection;
