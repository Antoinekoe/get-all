import React from "react";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";

const ButtonCart = ({ id, images, price, title, autoOpen = true }) => {
  const { setProducts, setIsOpen } = useCart();

  const handleClick = () => {
    // Create unique cart item ID using timestamp and random number
    const cartItemId = `${id}_${Date.now()}_${Math.random().toString(36)}`;

    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id,
        title,
        images,
        price,
        cartItemId, // Add unique cart item ID
      },
    ]);
    if (toast.isActive("product-added")) {
      toast.update("product-added", {
        render: "Produit ajouté !",
        type: "success",
        autoClose: 5000,
      });
    } else {
      toast.success("Produit ajouté !", {
        toastId: "product-added",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // Open cart automatically only if autoOpen is true and on desktop
    if (autoOpen) {
      // Open cart automatically only on desktop (screen width >= 768px)
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    }
  };
  return (
    <div className="flex gap-0">
      <button
        onClick={handleClick}
        className="flex bg-[#B6B09F] text-white w-fit rounded-4xl px-3 py-2 hover:cursor-pointer hover:shadow-lg"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ButtonCart;
