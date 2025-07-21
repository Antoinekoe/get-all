import React from "react";

const Product = () => {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <img
        src="https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp"
        alt=""
      />
      <h3 className="text-5xl">Title of the product</h3>
      <div className="flex">
        <span className="text-2xl">Price - Category</span>
      </div>
      <span>Description</span>
      <button className="flex bg-[#B6B09F] text-white w-fit rounded-4xl px-3 py-2 hover:cursor-pointer hover:shadow-lg">
        Add to cart
      </button>
    </div>
  );
};

export default Product;
