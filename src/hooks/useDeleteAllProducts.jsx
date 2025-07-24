import { useCart } from "./useCart";
import { useCallback } from "react";

// Remove product from cart by filtering out the product with matching cartItemId
export const useDeleteAllProducts = () => {
  const { products, setProducts } = useCart();

  const deleteAllProducts = useCallback(
    (id) => {
      const newProducts = products.filter((product) => {
        return product.id !== id;
      });
      // Update cart state with filtered products
      setProducts(newProducts);
    },
    [products, setProducts]
  );

  return deleteAllProducts;
};
