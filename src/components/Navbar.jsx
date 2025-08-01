



import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); 
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/my-orders", label: "My Orders" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white/90 backdrop-blur-xl border-b border-neutral-200/40 transition-all duration-500 hover:bg-white/95 hover:shadow-2xl hover:shadow-neutral-900/5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent"></div>

        {/* Logo */}
        <div className="relative group z-10">
          <div className="absolute -inset-2 bg-gradient-to-r from-neutral-300/0 via-neutral-300/10 to-neutral-300/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
          <h1
            onClick={() => handleNavClick("/")}
            className="relative text-xl sm:text-2xl font-bold text-neutral-800 tracking-tight cursor-pointer transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-105 group-hover:tracking-wide"
          >
            DecoNest
          </h1>
          <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-800 transition-all duration-500 group-hover:w-full rounded-full"></div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 text-sm font-medium z-10">
          {navigationItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative px-4 lg:px-6 py-3 rounded-2xl transition-all duration-500 group overflow-hidden ${
                isActive(item.path)
                  ? "text-neutral-900 bg-neutral-100/80 shadow-lg shadow-neutral-900/5"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50/60"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="relative z-10">{item.label}</span>
              <div
                className={`absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 rounded-2xl transition-all duration-500 ${
                  isActive(item.path)
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-60"
                }`}
              ></div>
              <div
                className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-neutral-500 to-neutral-700 rounded-full transition-all duration-500 ${
                  isActive(item.path) ? "w-8" : "w-0 group-hover:w-6"
                }`}
              ></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </nav>

        {/* Right side icons and auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3 text-xl z-10">
          {/* Wishlist */}
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-red-100/0 via-red-100/20 to-red-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
            <div
              className="relative p-2 sm:p-3 rounded-2xl transition-all duration-500 hover:bg-red-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/10"
              onClick={() => handleNavClick("/wishlist")}
            >
              <AiOutlineHeart
                className="text-base sm:text-xl text-neutral-600 transition-all duration-500 group-hover:text-red-500 group-hover:scale-110"
                title="Wishlist"
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
                  {wishlist.length}
                </span>
              )}
            </div>
          </div>

          {/* Cart */}
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-emerald-100/0 via-emerald-100/20 to-emerald-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
            <div
              className="relative p-2 sm:p-3 rounded-2xl transition-all duration-500 hover:bg-emerald-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/10"
              onClick={() => handleNavClick("/cart")}
            >
              <FiShoppingCart
                className="text-base sm:text-xl text-neutral-600 transition-all duration-500 group-hover:text-emerald-600 group-hover:scale-110"
                title="Cart"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          {/* Auth buttons - Desktop */}
          {!user ? (
            <div className="hidden sm:flex gap-2 lg:gap-3 ml-2 lg:ml-4">
              <button
                onClick={() => navigate("/signup")}
                className="relative text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 text-neutral-600 border border-neutral-300/60 rounded-2xl transition-all duration-500 hover:bg-neutral-800 hover:text-white hover:border-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 hover:scale-105 font-medium overflow-hidden group"
              >
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="relative text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 text-white rounded-2xl transition-all duration-500 hover:from-neutral-800 hover:via-neutral-900 hover:to-black hover:shadow-xl hover:shadow-neutral-900/30 hover:scale-105 font-medium overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </button>
            </div>
          ) : (
            <div className="relative group ml-2 lg:ml-4">
              <div className="absolute -inset-3 bg-gradient-to-r from-neutral-100/0 via-neutral-100/20 to-neutral-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              <div
                className="relative p-2 sm:p-3 rounded-2xl transition-all duration-500 hover:bg-neutral-100/60 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-neutral-900/10"
                onClick={() => handleNavClick("/profile")}
              >
                <FaRegUserCircle
                  className="text-base sm:text-xl text-neutral-600 transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-110"
                  title="Profile"
                />
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative p-2 sm:p-3 rounded-2xl transition-all duration-500 hover:bg-neutral-100/60 text-neutral-600 hover:text-neutral-900"
          >
            {isMobileMenuOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent"></div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={toggleMobileMenu}>
          <div 
            className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white/95 backdrop-blur-xl border-l border-neutral-200/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pt-20">
              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-3 mb-8">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative px-6 py-4 rounded-2xl transition-all duration-500 group overflow-hidden text-left ${
                      isActive(item.path)
                        ? "text-neutral-900 bg-neutral-100/80 shadow-lg shadow-neutral-900/5"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50/60"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative z-10 font-medium">{item.label}</span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 rounded-2xl transition-all duration-500 ${
                        isActive(item.path)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      }`}
                    ></div>
                    <div
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-1 bg-gradient-to-b from-neutral-500 to-neutral-700 rounded-full transition-all duration-500 ${
                        isActive(item.path) ? "h-8" : "h-0 group-hover:h-6"
                      }`}
                    ></div>
                  </button>
                ))}
              </nav>

              {/* Mobile Auth buttons */}
              {!user && (
                <div className="flex flex-col gap-3 pt-6 border-t border-neutral-200/40">
                  <button
                    onClick={() => handleNavClick("/signup")}
                    className="relative text-sm px-6 py-4 text-neutral-600 border border-neutral-300/60 rounded-2xl transition-all duration-500 hover:bg-neutral-800 hover:text-white hover:border-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 font-medium overflow-hidden group"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  </button>
                  <button
                    onClick={() => handleNavClick("/login")}
                    className="relative text-sm px-6 py-4 bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 text-white rounded-2xl transition-all duration-500 hover:from-neutral-800 hover:via-neutral-900 hover:to-black hover:shadow-xl hover:shadow-neutral-900/30 font-medium overflow-hidden group"
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;