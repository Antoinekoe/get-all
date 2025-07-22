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
      {/* Main container */}
      <div className="flex flex-col w-1/2 mx-auto justify-center my-40 gap-5">
        <div className="flex h-[30rem]">
          {/* Thumbnail images */}
          <div className=" flex flex-col">
            {productSelected?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                onMouseOver={() => handleMouseOver(index)}
                alt="Photo du produit"
                className="w-[10rem] hover:cursor-pointer hover:border-2"
              />
            ))}
          </div>
          {/* Main product image */}
          <img
            src={productSelected.images?.[imageSelected]}
            alt="Photo du produit"
            className="w-[40rem] object-contain"
          />
          {/* Product info */}
          <div className="flex flex-col w-full gap-5">
            <h2 className="font-bold text-4xl">{productSelected.title}</h2>
            <div className="flex">
              <span className="text-2xl">
                <span className="font-bold">{productSelected.price} €</span> -{" "}
                {productSelected.category}
              </span>
            </div>
            <span>{productSelected.description}</span>
            {/* Rating display */}
            <div className="flex">
              {productSelected?.rating ? (
                <Rating rating={productSelected.rating} />
              ) : (
                <span className="text-gray-500">No reviews</span>
              )}
            </div>
            <span>
              <span className="text-2xl font-medium">
                {productSelected.rating}
              </span>{" "}
              global review note
            </span>
            <ButtonCart />
          </div>
        </div>
        {/* Customer reviews */}
        <div className="flex flex-col gap-5 pb-10">
          <h3 className="font-medium text-3xl">Customers comments</h3>
          {productSelected?.reviews?.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
