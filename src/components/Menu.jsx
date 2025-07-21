import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cart from "./Cart";

const Menu = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <header className="px-4 py-6">
      <nav className="flex justify-between items-center ">
        <img src="../src/assets/logo.png" alt="" />
        <ul className="flex justify-center items-center gap-10 bg-white p-5 rounded-4xl">
          <li>
            <Link
              to="/"
              className={isActive("/") ? "li-item-active" : "li-item"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={isActive("/products") ? "li-item-active" : "li-item"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/category"
              className={isActive("/category") ? "li-item-active" : "li-item"}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive("/contact") ? "li-item-active" : "li-item"}
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="justify-end">
          <Cart />
        </div>
      </nav>
    </header>
  );
};

export default Menu;
