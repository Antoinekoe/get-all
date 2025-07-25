import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import Cart from "../cart/Cart";
import { useCart } from "../../hooks/useCart";
import logo from "../../assets/logo.png";

// Main navigation component with responsive menu
const Menu = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen: isCartOpen } = useCart();

  // Check if current route is active
  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="px-4 py-6 w-full max-w-full overflow-hidden">
      <nav className="flex justify-between items-center w-full">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="max-w-full h-auto" />
        </Link>

        {/* Desktop navigation menu */}
        <ul className="hidden lg:flex fixed z-10000 left-1/2 -translate-x-1/2 justify-center items-center gap-10 bg-white shadow-uniform p-5 rounded-4xl">
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

        {/* Mobile menu toggle button */}
        <button
          className={`lg:hidden z-10001 p-3 fixed right-4 top-4 ${
            isCartOpen ? "hidden" : "block"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={32} className="text-gray-800" />
          ) : (
            <MenuIcon size={32} className="text-gray-800" />
          )}
        </button>

        {/* Mobile menu sidebar */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg z-10000 border-l">
            <ul className="flex flex-col p-6 space-y-6 mt-20">
              <li>
                <Link
                  to="/"
                  className={`block py-3 px-4 rounded-lg transition-colors text-lg ${
                    isActive("/", true)
                      ? "bg-[#B6B09F] text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={`block py-3 px-4 rounded-lg transition-colors text-lg ${
                    isActive("/products")
                      ? "bg-[#B6B09F] text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className={`block py-3 px-4 rounded-lg transition-colors text-lg ${
                    isActive("/categories")
                      ? "bg-[#B6B09F] text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block py-3 px-4 rounded-lg transition-colors text-lg ${
                    isActive("/contact", true)
                      ? "bg-[#B6B09F] text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="justify-end">
          <Cart />
        </div>
      </nav>
    </header>
  );
};

export default Menu;
