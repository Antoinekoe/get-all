import { useCart } from "./useCart";
import { useCallback } from "react";

// Remove product from cart by filtering out the product with matching cartItemId
export const useDeleteSingleProduct = () => {
  const { products, setProducts } = useCart();

  const deleteSingleProduct = useCallback(
    (cartItemId) => {
      // Create new array without the deleted product
      const newProducts = products.filter((product) => {
        return product.cartItemId !== cartItemId;
      });
      // Update cart state with filtered products
      setProducts(newProducts);
    },
    [products, setProducts]
  );

  return deleteSingleProduct;
};
