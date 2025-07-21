import React from "react";
import Product from "./Product";

const ProductsSection = () => {
  return (
    <div className="grid grid-cols-3 items-center justify-items-center w-5/6 m-auto">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default ProductsSection;
