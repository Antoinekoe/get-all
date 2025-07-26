import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu as MenuIcon, UserRound, X } from "lucide-react";
import Cart from "../cart/Cart";
import { useCart } from "../../hooks/useCart";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";

// Main navigation component with responsive menu
const Menu = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logOut, userInfos } = useAuth();
  const { isOpen: isCartOpen, setIsOpen: setIsCartOpen } = useCart();

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

  // Handle mobile menu toggle and close cart if open
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close cart when mobile menu opens
  useEffect(() => {
    if (isMenuOpen && isCartOpen) {
      setIsCartOpen(false);
    }
  }, [isMenuOpen, isCartOpen, setIsCartOpen]);

  // Handle scroll to prevent main page scroll when at mobile menu bottom
  const handleMenuScroll = (e) => {
    const element = e.target;
    const isAtBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

    if (isAtBottom) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <header className="px-4 py-6 w-full max-w-full overflow-hidden">
      <nav className="flex justify-between items-center w-full">
        <Link to="/" className="flex flex-col self-start">
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
        {isLoggedIn === false ? (
          <div className="flex justify-end w-full items-end pr-35 lg:pr-20">
            <Link
              to={"/login"}
              className="bg-white px-4 py-2 lg:px-5 lg:py-3 shadow-uniform rounded-full"
            >
              <div className="flex flex-col justify-center items-center gap-1">
                <UserRound />
                <span>Login</span>
              </div>
            </Link>
          </div>
        ) : (
          <div
            className="flex justify-end w-full items-end pr-35 lg:pr-20 hover:cursor-pointer"
            onClick={() => logOut()}
          >
            <div className="flex flex-col bg-white px-4 py-2 lg:px-4 lg:py-3 shadow-uniform rounded-full justify-center items-center gap-1">
              <LogOut className="hover:cursor-pointer" />
              <span>Logout</span>
            </div>
          </div>
        )}

        {/* Mobile menu toggle button */}
        <button
          className={`lg:hidden z-[999999] p-3 fixed right-4 top-4 ${
            isCartOpen ? "hidden" : "block"
          }`}
          onClick={handleMenuToggle}
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
          <div
            className="lg:hidden fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg z-[99999] border-l overflow-y-auto"
            onScroll={handleMenuScroll}
          >
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
