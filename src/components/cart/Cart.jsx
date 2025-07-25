// Import React hooks and components
import React from "react";
// Import icons from lucide-react library
import { ShoppingCart, Trash, X } from "lucide-react";
// Import custom hook for cart functionality
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { useGroupedProducts } from "../../hooks/useGroupedProducts";
import { useTotalPrice } from "../../hooks/useTotalPrice";
import { useDeleteSingleProduct } from "../../hooks/useDeleteSingleProduct";
import { useDeleteAllProducts } from "../../hooks/useDeleteAllProducts";
import { useHandleClickPlus } from "../../hooks/useHandleClickPlus";

// Shopping cart component with sidebar interface
const Cart = () => {
  const { products, isOpen, setIsOpen } = useCart();
  const groupedProducts = useGroupedProducts();
  const deleteSingleProduct = useDeleteSingleProduct();
  const deleteAllProducts = useDeleteAllProducts();
  const handleClickPlus = useHandleClickPlus();
  const totalPrice = useTotalPrice();

  // Toggle cart visibility
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll to prevent main page scroll when at cart bottom
  const handleScroll = (e) => {
    const element = e.target;
    const isAtBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

    if (isAtBottom) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Render cart based on open/closed state
  {
    if (isOpen === false) {
      // Closed cart - show icon and item count
      return (
        <div>
          <ShoppingCart
            color="white"
            size={56}
            className="bg-[#B6B09F] py-3 rounded-4xl cursor-pointer z-10000 fixed lg:right-4 right-20 top-4 lg:w-14 lg:h-14 w-12 h-12"
            onClick={handleClick}
          />
          <div className="bg-[#B6B09F] text-white rounded-full py-1 px-3 cursor-pointer fixed lg:right-4 lg:top-16 right-20 top-13">
            {products.length}
          </div>
        </div>
      );
    } else {
      // Open cart - show sidebar with items
      return (
        <div>
          <X
            color="white"
            size={56}
            className="bg-[#B6B09F] py-3 rounded-4xl cursor-pointer fixed lg:right-4 right-20 top-4 z-5001 lg:w-14 lg:h-14 w-12 h-12"
            onClick={handleClick}
          />

          {/* Cart sidebar */}
          <div
            className="flex flex-col border-l-2 border-[#B6B09F] w-60 h-screen py-1 pt-17 fixed right-0 top-0 z-5000 bg-white overflow-y-auto"
            onScroll={handleScroll}
          >
            <div className="flex flex-col justify-start items-center w-full">
              {products.length > 0 ? (
                <>
                  {/* Cart header with total and checkout */}
                  <div className="flex flex-col justify-center items-center gap-2 pb-3 border-b-2 w-full">
                    <span>Total :</span>
                    <span className="text-2xl font-medium">
                      {totalPrice.toFixed(2)} €
                    </span>
                    <Link
                      to={"/checkoutcart"}
                      className="border-2 rounded-2xl px-5 py-1 hover:cursor-pointer hover:bg-[#B6B09F] hover:text-white"
                    >
                      Go to cart
                    </Link>
                  </div>
                  {/* Product list - first 3 items */}
                  <div className="w-full">
                    {groupedProducts.slice(0, 3).map((group) => (
                      <div
                        key={group.product.id}
                        className="border-b-2 pb-4 flex flex-col gap-1 justify-center items-center text-center w-full"
                      >
                        <img
                          src={group.product.images[0]}
                          className="w-24 h-24 object-cover"
                          alt="Product image"
                        />
                        <span className="text-sm truncate w-full px-1">
                          {group.product.title}
                        </span>
                        <span className="text-sm">{group.product.price} €</span>
                        <div className="flex gap-1 border-2 rounded-2xl px-2 py-1 text-sm">
                          <span>Qty:</span>
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

                        <Trash
                          size={16}
                          className="cursor-pointer hover:stroke-red-400"
                          onClick={() => deleteAllProducts(group.product.id)}
                        />
                      </div>
                    ))}
                    {groupedProducts.length > 3 && (
                      <div className="text-center text-gray-600 py-2 text-sm">
                        (+{groupedProducts.length - 3} more)
                      </div>
                    )}
                  </div>
                </>
              ) : (
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
