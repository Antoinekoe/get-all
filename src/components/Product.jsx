import React from "react";

const Product = ({ images, category, description, price, title }) => {
  return (
    <div className="flex flex-col gap-2 w-3/4">
      <img src={images[0]} alt="Product image" />
      <h3 className="text-5xl">{title}</h3>
      <div className="flex">
        <span className="text-2xl">
          {price} € - {category}
        </span>
      </div>
      <span>{description}</span>
      <button className="flex bg-[#B6B09F] text-white w-fit rounded-4xl px-3 py-2 hover:cursor-pointer hover:shadow-lg">
        Add to cart
      </button>
    </div>
  );
};

export default Product;
