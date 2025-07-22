import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import ButtonCart from "../components/ButtonCart";
import Footer from "../components/Footer";
import { Star } from "lucide-react";
import { getProductsWithId } from "../services/DummyAPI";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [productSelected, setProductSelected] = useState({});

  useEffect(() => {
    console.log("Params ID :", params.id);
    getProductsWithId(params.id).then((data) => setProductSelected(data));
  }, [params.id]);

  return (
    <>
      <Menu />
      <div className="flex flex-col w-1/2 mx-auto justify-center my-40 gap-5">
        <div className="flex h-[30rem]">
          <div className=" flex flex-col">
            {productSelected?.images?.map((image, index) => (
              <img key={index} src={image} alt="" className="w-[10rem]" />
            ))}
          </div>
          <img
            src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
            alt=""
            className="w-[40rem] object-contain"
          />
          <div className="flex flex-col w-full gap-5">
            <h2 className="font-bold text-4xl">Title of the product</h2>
            <div className="flex">
              <span className="text-2xl">
                <span className="font-bold">Price</span> - Category
              </span>
            </div>
            <span>Description</span>
            <div className="flex">
              <Star fill="#FACF19" stroke="#FACF19" />
              <Star fill="white" stroke="#FACF19" />
            </div>
            <span>
              <span className="text-2xl font-medium">4.15</span> global review
              note
            </span>
            <ButtonCart />
          </div>
        </div>
        <div className="border-b-[1px] border-b-gray-300 flex flex-col gap-5 pb-10">
          <h3 className="font-medium text-3xl">Customers comments</h3>
          <div className="flex">
            <span>
              <span className="font-bold">Name of the user</span> - Date
            </span>
          </div>
          <div className="flex">
            <Star fill="#FACF19" stroke="#FACF19" />
            <Star fill="white" stroke="#FACF19" />
          </div>
          <span>Comment text</span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
