import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cart from "./Cart";

const Menu = () => {
  const location = useLocation();

  // Manage all routes (exact and startswith)
  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  return (
    <header className="px-4 py-6">
      <nav className="flex justify-between items-center ">
        <Link to="/">
          <img src="../../src/assets/logo.png" alt="Logo" />
        </Link>
        <ul className="flex fixed left-1/2 -translate-x-1/2 justify-center items-center gap-10 bg-white shadow-uniform p-5 rounded-4xl">
          <li>
            <Link
              to="/"
              className={isActive("/", true) ? "li-item-active" : "li-item"}
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
              to="/categories"
              className={isActive("/categories") ? "li-item-active" : "li-item"}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={
                isActive("/contact", true) ? "li-item-active" : "li-item"
              }
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
