import { useMemo } from "react";
import { useCart } from "./useCart";

export const useTotalPrice = () => {
  const { products } = useCart();

  const totalPrice = useMemo(() => {
    return products.reduce((sum, product) => sum + product.price, 0);
  }, [products]);

  return totalPrice;
};
