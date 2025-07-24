// Import React hooks and components
import React, { useEffect, useState } from "react";
// Import icons from lucide-react library
import { ShoppingCart, Trash, X } from "lucide-react";
// Import custom hook for cart functionality
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { products, setProducts, isOpen, setIsOpen } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  // Reduce the products in carts in groups
  const groupedProducts = products.reduce((groups, product) => {
    // Search if a group already exist with the product ID
    const existingGroups = groups.find(
      (group) => group.product.id === product.id
    );

    // If yes, add 1 to quantity and push the product cardsItemId

    if (existingGroups) {
      existingGroups.quantity += 1;
      existingGroups.cartItemIds.push(product.cardsItemId);

      // If no, create a group with the object product that stores the ID, create a quantity of 1 and stores the cartItemIds
    } else {
      groups.push({
        product: product,
        quantity: 1,
        cartItemIds: [product.cartItemId],
      });
    }
    return groups;
  }, []);

  useEffect(() => {
    console.log(groupedProducts);
  }, [groupedProducts]);

  // Toggle cart open/close state
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Calculate total price whenever products change
  useEffect(() => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    setTotalPrice(total);
  }, [products]);

  // Remove product from cart by filtering out the product with matching cartItemId
  const deleteSingleProduct = (cartItemId) => {
    // Create new array without the deleted product
    const newProducts = products.filter((product) => {
      return product.cartItemId !== cartItemId;
    });
    // Update cart state with filtered products
    setProducts(newProducts);
  };

  const deleteAllProducts = (id) => {
    const newProducts = products.filter((product) => {
      return product.id !== id;
    });
    // Update cart state with filtered products
    setProducts(newProducts);
  };

  const handleClickPlus = (group) => {
    // Create unique cart item ID using timestamp and random number
    const cartItemId = `${
      group.product.id
    }_${Date.now()}_${Math.random().toString(36)}`;

    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: group.product.id,
        title: group.product.title,
        images: group.product.images,
        price: group.product.price,
        cartItemId, // Add unique cart item ID
      },
    ]);
  };

  // Render cart component based on open/close state
  {
    if (isOpen === false) {
      // Cart is closed - show shopping cart icon and product count
      return (
        <div>
          {/* Shopping cart icon - click to open cart */}
          <ShoppingCart
            color="white"
            size={56}
            className="bg-[#B6B09F] py-3 rounded-4xl cursor-pointer fixed right-4 top-4"
            onClick={handleClick}
          />
          {/* Product count badge - shows number of items in cart */}
          <div className="bg-[#B6B09F] text-white rounded-full py-1 px-3 cursor-pointer fixed right-4 top-15">
            {products.length}
          </div>
        </div>
      );
    } else {
      // Cart is open - show full cart interface
      return (
        <div>
          {/* Close button (X icon) - click to close cart */}
          <X
            color="white"
            size={56}
            className="bg-[#B6B09F] py-3 rounded-4xl cursor-pointer fixed right-4 top-4 z-5000"
            onClick={handleClick}
          />

          {/* Cart sidebar container */}
          <div className="flex flex-col border-l-2 border-[#B6B09F] w-60 h-full py-1 pt-20 fixed right-0 top-0 z-1000 bg-white">
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
                    <button className="border-2 rounded-2xl px-5 py-1 hover:cursor-pointer hover:bg-[#B6B09F] hover:text-white">
                      Go to cart
                    </button>
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
                      <div className="flex gap-2 border-2 rounded-2xl px-2">
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
