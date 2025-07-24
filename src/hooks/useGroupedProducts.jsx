import { useMemo } from "react";
import { useCart } from "./useCart";

export const useGroupedProducts = () => {
  const { products } = useCart();

  // Reduce the products in carts in groups
  const groupedProducts = useMemo(() => {
    return products.reduce((groups, product) => {
      // Search if a group already exist with the product ID
      const existingGroup = groups.find(
        (group) => group.product.id === product.id
      );

      // If yes, add 1 to quantity and push the product cardsItemId

      if (existingGroup) {
        existingGroup.quantity += 1;
        existingGroup.cartItemIds.push(product.cartItemId);

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
  }, [products]);

  return groupedProducts;
};
