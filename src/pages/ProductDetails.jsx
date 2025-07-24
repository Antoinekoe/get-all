import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import ButtonCart from "../components/ButtonCart";
import Footer from "../components/Footer";
import { getProductsWithId } from "../services/DummyAPI";
import { useParams } from "react-router-dom";
import Review from "../components/Review";
import Rating from "../components/Rating";

const ProductDetails = () => {
  const params = useParams(); // Get product ID from URL
  const [productSelected, setProductSelected] = useState({}); // Product data
  const [imageSelected, setImageSelected] = useState(0); // Selected image

  // Fetch product data when ID changes
  useEffect(() => {
    getProductsWithId(params.id).then((data) => setProductSelected(data));
  }, [params.id]);

  const handleMouseOver = (index) => {
    setImageSelected(index);
  };

  return (
    <>
      <Menu />
      {/* Main container - centered with responsive layout */}
      <div className="flex flex-col w-5/6 max-w-7xl mx-auto justify-center my-20 gap-10">
        {/* Product details section - 2 columns on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left column - Images */}
          <div className="flex flex-row gap-4 lg:w-1/2">
            {/* Thumbnail images - left of main image on mobile and desktop */}
            <div className="flex flex-col justify-center gap-2">
              {productSelected?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  onMouseOver={() => handleMouseOver(index)}
                  alt="Photo du produit"
                  className="w-16 h-16 lg:w-24 lg:h-24 object-cover rounded-lg hover:cursor-pointer hover:border-2 border-[#B6B09F]"
                />
              ))}
            </div>
            {/* Main product image */}
            <img
              src={productSelected.images?.[imageSelected]}
              alt="Photo du produit"
              className="w-48 h-48 lg:w-96 lg:h-96 object-contain rounded-lg"
            />
          </div>

          {/* Right column - Product info */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            <h2 className="font-bold text-3xl lg:text-4xl text-center lg:text-left">
              {productSelected.title}
            </h2>
            <div className="flex justify-center lg:justify-start">
              <span className="text-xl lg:text-2xl">
                <span className="font-bold">{productSelected.price} €</span> -{" "}
                {productSelected.category}
              </span>
            </div>
            <span className="text-center lg:text-left leading-relaxed">
              {productSelected.description}
            </span>
            {/* Rating display */}
            <div className="flex justify-center lg:justify-start">
              {productSelected?.rating ? (
                <Rating rating={productSelected.rating} />
              ) : (
                <span className="text-gray-500">No reviews</span>
              )}
            </div>
            <span className="text-center lg:text-left">
              <span className="text-xl lg:text-2xl font-medium">
                {productSelected.rating}
              </span>{" "}
              global review note
            </span>
            <div className="flex justify-center lg:justify-start">
              <ButtonCart
                id={productSelected.id}
                images={productSelected.images}
                price={productSelected.price}
                title={productSelected.title}
              />
            </div>
          </div>
        </div>

        {/* Customer reviews section */}
        <div className="flex flex-col gap-6 pb-10">
          <h3 className="font-medium text-2xl lg:text-3xl text-center lg:text-left">
            Customers comments
          </h3>
          <div className="flex flex-col gap-4 items-center lg:items-start">
            {productSelected?.reviews?.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
