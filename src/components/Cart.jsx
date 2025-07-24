// Import React hooks and components
import React from "react";
// Import icons from lucide-react library
import { ShoppingCart, Trash, X } from "lucide-react";
// Import custom hook for cart functionality
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { useGroupedProducts } from "../hooks/useGroupedProducts";
import { useTotalPrice } from "../hooks/useTotalPrice";
import { useDeleteSingleProduct } from "../hooks/useDeleteSingleProduct";
import { useDeleteAllProducts } from "../hooks/useDeleteAllProducts";
import { useHandleClickPlus } from "../hooks/useHandleClickPlus";

const Cart = () => {
  const { products, isOpen, setIsOpen } = useCart();
  const groupedProducts = useGroupedProducts();
  const deleteSingleProduct = useDeleteSingleProduct();
  const deleteAllProducts = useDeleteAllProducts();
  const handleClickPlus = useHandleClickPlus();
  const totalPrice = useTotalPrice();

  // Toggle cart open/close state
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Render cart component based on open/close state
  {
    if (isOpen === false) {
      // Cart is closed - show shopping cart icon and product count
      return (
        <div>
          {/* Shopping cart icon - positioned for mobile and desktop */}
          <ShoppingCart
            color="white"
            size={56}
            className="bg-[#B6B09F] py-3 rounded-4xl cursor-pointer z-10000 fixed lg:right-4 right-20 top-4 lg:w-14 lg:h-14 w-12 h-12"
            onClick={handleClick}
          />
          {/* Product count badge - positioned for mobile and desktop */}
          <div className="bg-[#B6B09F] text-white rounded-full py-1 px-3 cursor-pointer fixed lg:right-4 lg:top-16 right-20 top-13">
            {products.length}
          </div>
        </div>
      );
    } else {
      // Cart is open - show full cart interface
      return (
        <div>
          {/* Close button (X icon) - positioned for mobile and desktop */}
          <X
            color="white"
            size={56}
            className="bg-[#B6B09F] py-3 rounded-4xl cursor-pointer fixed lg:right-4 right-20 top-4 z-5001 lg:w-14 lg:h-14 w-12 h-12"
            onClick={handleClick}
          />

          {/* Cart sidebar container */}
          <div className="flex flex-col border-l-2 border-[#B6B09F] w-60 h-full py-1 pt-20 fixed right-0 top-0 z-5000 bg-white">
            <div className="flex flex-col justify-center items-center h-max">
              {/* Conditional rendering based on cart content */}
              {products.length > 0 ? (
                <>
                  {/* Cart header with total price and checkout button */}
                  <div className="flex flex-col justify-center items-center gap-2 pb-3 border-b-2 w-full">
                    <span>Total :</span>
                    {/* Display total price with 2 decimal places */}
                    <span className="text-2xl font-medium">
                      {totalPrice.toFixed(2)} €
                    </span>
                    {/* Checkout button */}
                    <Link
                      to={"/checkoutcart"}
                      className="border-2 rounded-2xl px-5 py-1 hover:cursor-pointer hover:bg-[#B6B09F] hover:text-white"
                    >
                      Go to cart
                    </Link>
                  </div>
                  {/* Product list - show only first 3 products */}
                  {groupedProducts.slice(0, 3).map((group) => (
                    <div
                      key={group.product.id}
                      className="border-b-2 pb-4 flex flex-col gap-1 justify-center items-center text-center w-full"
                    >
                      {/* Product image */}
                      <img
                        src={group.product.images[0]}
                        className="w-30"
                        alt="Product image"
                      />
                      {/* Product title */}
                      <span>{group.product.title}</span>
                      {/* Product price */}
                      <span>{group.product.price} €</span>
                      <div className="flex gap-2 border-2 rounded-2xl px-2 w-fit">
                        <span>Quantity :</span>
                        <span
                          onClick={() =>
                            deleteSingleProduct(group.cartItemIds[0])
                          }
                          className="hover:cursor-pointer"
                        >
                          -
                        </span>
                        <span>{group.quantity}</span>
                        <span
                          onClick={() => handleClickPlus(group)}
                          className="hover:cursor-pointer"
                        >
                          +
                        </span>
                      </div>

                      {/* Delete button - removes product from cart */}
                      <Trash
                        className="cursor-pointer hover:stroke-red-400"
                        onClick={() => deleteAllProducts(group.product.id)}
                      />
                    </div>
                  ))}
                  {/* Show "more products" message if cart has more than 3 items */}
                  {groupedProducts.length > 3 && (
                    <div className="text-center text-gray-600 py-2">
                      (+{groupedProducts.length - 3} more)
                    </div>
                  )}
                </>
              ) : (
                // Show empty cart message when no products
                <div>Empty !</div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Cart;
