import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonCart from "./ButtonCart";

const Product = ({ id, images, category, description, price, title }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/details/${id}`);
  };

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
      <div className="flex gap-5">
        <ButtonCart />
        <button
          onClick={() => handleClick(id)}
          className="rounded-4xl px-3 py-2 border-[1.5px] hover:cursor-pointer hover:bg-black hover:text-white"
        >
          Product details
        </button>
      </div>
    </div>
  );
};

export default Product;
