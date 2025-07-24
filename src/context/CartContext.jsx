import React, { useState } from "react";
import { createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartContext.Provider value={{ products, isOpen, setIsOpen, setProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
