import React, { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useGroupedProducts } from "../hooks/useGroupedProducts";
import { useTotalPrice } from "../hooks/useTotalPrice";

const CheckoutCart = () => {
  const { products, isOpen, setIsOpen, setProducts } = useCart();
  const groupedProducts = useGroupedProducts();
  const totalPrice = useTotalPrice();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, []);
  useEffect(() => {
    console.log(groupedProducts);
  }, []);

  return (
    <>
      <Menu />
      <div className="pt-20">
        <h1 className="font-medium text-6xl text-center my-15">
          Checkout cart
        </h1>
      </div>
      <div className="grid grid-cols-3 w-3/4 gap-5 mx-auto">
        <div className="col-span-2 border-[#B6B09F] border-2 px-6 py-6">
          <h3 className="text-2xl font-bold pb-5">Your checkout</h3>
          <div className="flex justify-end">
            <span>Price</span>
          </div>
          {groupedProducts.map((group, index) => (
            <div
              key={index}
              className="flex border-t-2 border-b-2 border-[#DDDDDD] py-5"
            >
              <img
                src={group.product.images[0]}
                alt="Product image"
                className="w-80"
              />
              <div className="flex flex-col gap-2">
                <span className="text-4xl">{group.product.title}</span>
                <div className="flex gap-2">
                  <span>Quantity :</span>
                  <span>{group.quantity}</span>
                </div>
              </div>
              <div className="flex justify-end flex-1">
                <span className="text-2xl font-bold">
                  {group.product.price.toFixed(2)} €
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#B6B09F] text-white flex flex-col h-36 px-4 py-6 justify-center items-center gap-4">
          <div className="flex gap-2 justify-center items-center">
            <span className="text-2xl">Total :</span>
            <span className="text-2xl font-bold">{totalPrice} €</span>
          </div>
          <button className="bg-white text-black w-6/12 mx-auto rounded-2xl py-2 font-bold hover:cursor-pointer">
            Pay
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutCart;
