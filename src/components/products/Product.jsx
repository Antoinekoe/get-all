import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../ui/AddToCartButton";

// Individual product card component
const Product = memo(({ id, images, category, description, price, title }) => {
  const navigate = useNavigate();

  // Navigate to product details page
  const handleClick = (id) => {
    navigate(`/products/details/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-4 w-full pb-6 items-center text-center justify-between h-full">
      <div className="flex flex-col gap-4 items-center text-center w-full">
        <img
          src={images[0]}
          alt="Product image"
          className="w-full md:w-3/4 max-w-full h-auto object-contain"
        />
        <h3 className="text-3xl text-center break-words w-full">{title}</h3>
        <div className="flex justify-center w-full">
          <span className="text-2xl text-center">
            {price} € - {category}
          </span>
        </div>
        <span className="text-center break-words w-full">{description}</span>
      </div>
      {/* Product actions */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-center items-center w-full mt-auto">
        <AddToCartButton
          id={id}
          images={images}
          category={category}
          description={description}
          price={price}
          title={title}
        />
        <button
          onClick={() => handleClick(id)}
          className="rounded-4xl px-3 py-2 border-[1.5px] hover:cursor-pointer hover:bg-black hover:text-white"
        >
          Product details
        </button>
      </div>
    </div>
  );
});

export default Product;
