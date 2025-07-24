import { useCart } from "./useCart";
import { useCallback } from "react";

// Remove product from cart by filtering out the product with matching cartItemId
export const useHandleClickPlus = () => {
  const { setProducts } = useCart();
  const handleClickPlus = useCallback(
    (group) => {
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
    },
    [setProducts]
  );

  return handleClickPlus;
};
