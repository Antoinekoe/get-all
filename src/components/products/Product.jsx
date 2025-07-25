import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../ui/AddToCartButton";

// Individual product card component
const Product = memo(({ id, images, category, description, price, title }) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  // Navigate to product details page
  const handleClick = (id) => {
    navigate(`/products/details/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-4 w-full pb-6 items-center text-center justify-between h-full">
      <div className="flex flex-col gap-4 items-center text-center w-full">
        <div className="relative w-full md:w-3/4">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            </div>
          )}
          <img
            src={images[0]}
            alt="Product image"
            className={`w-full max-w-full h-auto object-contain transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />
        </div>
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
