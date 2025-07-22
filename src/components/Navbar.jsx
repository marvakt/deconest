



// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FiShoppingCart } from "react-icons/fi";
// import { FaRegUserCircle } from "react-icons/fa";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
 

//   const { cartCount } = useCart();
//   const { wishlist } = useWishlist();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 bg-white/90 backdrop-blur-xl border-b border-neutral-200/40 transition-all duration-500 hover:bg-white/95 hover:shadow-2xl hover:shadow-neutral-900/5">
//       {/* Animated Top Border */}
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent"></div>

//       {/* Logo */}
//       <div className="relative group z-10">
//         <div className="absolute -inset-2 bg-gradient-to-r from-neutral-300/0 via-neutral-300/10 to-neutral-300/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//         <h1
//           onClick={() => navigate("/")}
//           className="relative text-2xl font-bold text-neutral-800 tracking-tight cursor-pointer transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-105 group-hover:tracking-wide"
//         >
//           DecoNest
//         </h1>
//         <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-800 transition-all duration-500 group-hover:w-full rounded-full"></div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex gap-2 text-sm font-medium z-10">
//         {[
//           { path: "/", label: "Home" },
//           { path: "/products", label: "Products" },
//           { path: "/my-orders", label: "My Orders" },
//         ].map((item, index) => (
//           <button
//             key={item.path}
//             onClick={() => navigate(item.path)}
//             className={`relative px-6 py-3 rounded-2xl transition-all duration-500 group overflow-hidden ${
//               isActive(item.path)
//                 ? "text-neutral-900 bg-neutral-100/80 shadow-lg shadow-neutral-900/5"
//                 : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50/60"
//             }`}
//             style={{ animationDelay: `${index * 100}ms` }}
//           >
//             <span className="relative z-10">{item.label}</span>

//             <div
//               className={`absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 rounded-2xl transition-all duration-500 ${
//                 isActive(item.path)
//                   ? "opacity-100"
//                   : "opacity-0 group-hover:opacity-60"
//               }`}
//             ></div>

//             <div
//               className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-neutral-500 to-neutral-700 rounded-full transition-all duration-500 ${
//                 isActive(item.path) ? "w-8" : "w-0 group-hover:w-6"
//               }`}
//             ></div>

//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </button>
//         ))}
//       </nav>

//       {/* Right Icons */}
//       <div className="flex items-center gap-3 text-xl z-10">
//         {/* Wishlist */}
//         <div className="relative group">
//           <div className="absolute -inset-3 bg-gradient-to-r from-red-100/0 via-red-100/20 to-red-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//           <div
//             className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-red-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/10"
//             onClick={() => navigate("/wishlist")}
//           >
//             <AiOutlineHeart className="text-neutral-600 transition-all duration-500 group-hover:text-red-500 group-hover:scale-110" title="Wishlist" />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
//                 {wishlist.length}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Cart */}
//         <div className="relative group">
//           <div className="absolute -inset-3 bg-gradient-to-r from-emerald-100/0 via-emerald-100/20 to-emerald-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//           <div
//             className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-emerald-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/10"
//             onClick={() => navigate("/cart")}
//           >
//             <FiShoppingCart className="text-neutral-600 transition-all duration-500 group-hover:text-emerald-600 group-hover:scale-110" title="Cart" />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Auth Buttons */}
//         {!user ? (
//           <div className="flex gap-3 ml-4">
//             <button
//               onClick={() => navigate("/signup")}
//               className="relative text-sm px-6 py-3 text-neutral-600 border border-neutral-300/60 rounded-2xl transition-all duration-500 hover:bg-neutral-800 hover:text-white hover:border-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 hover:scale-105 font-medium overflow-hidden group"
//             >
//               <span className="relative z-10">Register</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
//             </button>
//             <button
//               onClick={() => navigate("/login")}
//               className="relative text-sm px-6 py-3 bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 text-white rounded-2xl transition-all duration-500 hover:from-neutral-800 hover:via-neutral-900 hover:to-black hover:shadow-xl hover:shadow-neutral-900/30 hover:scale-105 font-medium overflow-hidden group"
//             >
//               <span className="relative z-10">Login</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
//             </button>
//           </div>
//         ) : (
//           <div className="relative group ml-4">
//             <div className="absolute -inset-3 bg-gradient-to-r from-neutral-100/0 via-neutral-100/20 to-neutral-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//             <div
//               className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-neutral-100/60 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-neutral-900/10"
//               onClick={() => navigate("/profile")}
//             >
//               <FaRegUserCircle className="text-neutral-600 transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-110" title="Profile" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Bottom Decoration */}
//       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent"></div>
//     </header>
//   );
// };

// export default Navbar;




// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext"; // ✅ added
// import { AiOutlineHeart } from "react-icons/ai";
// import { FiShoppingCart } from "react-icons/fi";
// import { FaRegUserCircle } from "react-icons/fa";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth(); // ✅ updated to use context
//   const { cartCount } = useCart();
//   const { wishlist } = useWishlist();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 bg-white/90 backdrop-blur-xl border-b border-neutral-200/40 transition-all duration-500 hover:bg-white/95 hover:shadow-2xl hover:shadow-neutral-900/5">
//       {/* Animated Top Border */}
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent"></div>

//       {/* Logo */}
//       <div className="relative group z-10">
//         <div className="absolute -inset-2 bg-gradient-to-r from-neutral-300/0 via-neutral-300/10 to-neutral-300/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//         <h1
//           onClick={() => navigate("/")}
//           className="relative text-2xl font-bold text-neutral-800 tracking-tight cursor-pointer transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-105 group-hover:tracking-wide"
//         >
//           DecoNest
//         </h1>
//         <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-800 transition-all duration-500 group-hover:w-full rounded-full"></div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex gap-2 text-sm font-medium z-10">
//         {[
//           { path: "/", label: "Home" },
//           { path: "/products", label: "Products" },
//           { path: "/my-orders", label: "My Orders" },
//         ].map((item, index) => (
//           <button
//             key={item.path}
//             onClick={() => navigate(item.path)}
//             className={`relative px-6 py-3 rounded-2xl transition-all duration-500 group overflow-hidden ${
//               isActive(item.path)
//                 ? "text-neutral-900 bg-neutral-100/80 shadow-lg shadow-neutral-900/5"
//                 : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50/60"
//             }`}
//             style={{ animationDelay: `${index * 100}ms` }}
//           >
//             <span className="relative z-10">{item.label}</span>

//             <div
//               className={`absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 rounded-2xl transition-all duration-500 ${
//                 isActive(item.path)
//                   ? "opacity-100"
//                   : "opacity-0 group-hover:opacity-60"
//               }`}
//             ></div>

//             <div
//               className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-neutral-500 to-neutral-700 rounded-full transition-all duration-500 ${
//                 isActive(item.path) ? "w-8" : "w-0 group-hover:w-6"
//               }`}
//             ></div>

//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </button>
//         ))}
//       </nav>

//       {/* Right Icons */}
//       <div className="flex items-center gap-3 text-xl z-10">
//         {/* Wishlist */}
//         <div className="relative group">
//           <div className="absolute -inset-3 bg-gradient-to-r from-red-100/0 via-red-100/20 to-red-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//           <div
//             className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-red-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/10"
//             onClick={() => navigate("/wishlist")}
//           >
//             <AiOutlineHeart className="text-neutral-600 transition-all duration-500 group-hover:text-red-500 group-hover:scale-110" title="Wishlist" />
//             {wishlist.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
//                 {wishlist.length}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Cart */}
//         <div className="relative group">
//           <div className="absolute -inset-3 bg-gradient-to-r from-emerald-100/0 via-emerald-100/20 to-emerald-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//           <div
//             className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-emerald-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/10"
//             onClick={() => navigate("/cart")}
//           >
//             <FiShoppingCart className="text-neutral-600 transition-all duration-500 group-hover:text-emerald-600 group-hover:scale-110" title="Cart" />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Auth Buttons */}
//         {!user ? (
//           <div className="flex gap-3 ml-4">
//             <button
//               onClick={() => navigate("/signup")}
//               className="relative text-sm px-6 py-3 text-neutral-600 border border-neutral-300/60 rounded-2xl transition-all duration-500 hover:bg-neutral-800 hover:text-white hover:border-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 hover:scale-105 font-medium overflow-hidden group"
//             >
//               <span className="relative z-10">Register</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
//             </button>
//             <button
//               onClick={() => navigate("/login")}
//               className="relative text-sm px-6 py-3 bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 text-white rounded-2xl transition-all duration-500 hover:from-neutral-800 hover:via-neutral-900 hover:to-black hover:shadow-xl hover:shadow-neutral-900/30 hover:scale-105 font-medium overflow-hidden group"
//             >
//               <span className="relative z-10">Login</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
//             </button>
//           </div>
//         ) : (
//           <div className="relative group ml-4">
//             <div className="absolute -inset-3 bg-gradient-to-r from-neutral-100/0 via-neutral-100/20 to-neutral-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
//             <div
//               className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-neutral-100/60 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-neutral-900/10"
//               onClick={() => navigate("/profile")}
//             >
//               <FaRegUserCircle className="text-neutral-600 transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-110" title="Profile" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Bottom Decoration */}
//       <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent"></div>
//     </header>
//   );
// };

// export default Navbar;
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // ✅ use context
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  // Remove this line so Navbar always renders
  // if (user === null) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 bg-white/90 backdrop-blur-xl border-b border-neutral-200/40 transition-all duration-500 hover:bg-white/95 hover:shadow-2xl hover:shadow-neutral-900/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent"></div>

      <div className="relative group z-10">
        <div className="absolute -inset-2 bg-gradient-to-r from-neutral-300/0 via-neutral-300/10 to-neutral-300/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
        <h1
          onClick={() => navigate("/")}
          className="relative text-2xl font-bold text-neutral-800 tracking-tight cursor-pointer transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-105 group-hover:tracking-wide"
        >
          DecoNest
        </h1>
        <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-800 transition-all duration-500 group-hover:w-full rounded-full"></div>
      </div>

      <nav className="flex gap-2 text-sm font-medium z-10">
        {[
          { path: "/", label: "Home" },
          { path: "/products", label: "Products" },
          { path: "/my-orders", label: "My Orders" },
        ].map((item, index) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative px-6 py-3 rounded-2xl transition-all duration-500 group overflow-hidden ${
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

      <div className="flex items-center gap-3 text-xl z-10">
        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-red-100/0 via-red-100/20 to-red-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
          <div
            className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-red-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/10"
            onClick={() => navigate("/wishlist")}
          >
            <AiOutlineHeart
              className="text-neutral-600 transition-all duration-500 group-hover:text-red-500 group-hover:scale-110"
              title="Wishlist"
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
                {wishlist.length}
              </span>
            )}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-emerald-100/0 via-emerald-100/20 to-emerald-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
          <div
            className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-emerald-50/40 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/10"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingCart
              className="text-neutral-600 transition-all duration-500 group-hover:text-emerald-600 group-hover:scale-110"
              title="Cart"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {!user ? (
          <div className="flex gap-3 ml-4">
            <button
              onClick={() => navigate("/signup")}
              className="relative text-sm px-6 py-3 text-neutral-600 border border-neutral-300/60 rounded-2xl transition-all duration-500 hover:bg-neutral-800 hover:text-white hover:border-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 hover:scale-105 font-medium overflow-hidden group"
            >
              <span className="relative z-10">Register</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="relative text-sm px-6 py-3 bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 text-white rounded-2xl transition-all duration-500 hover:from-neutral-800 hover:via-neutral-900 hover:to-black hover:shadow-xl hover:shadow-neutral-900/30 hover:scale-105 font-medium overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </button>
          </div>
        ) : (
          <div className="relative group ml-4">
            <div className="absolute -inset-3 bg-gradient-to-r from-neutral-100/0 via-neutral-100/20 to-neutral-100/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
            <div
              className="relative p-3 rounded-2xl transition-all duration-500 hover:bg-neutral-100/60 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-neutral-900/10"
              onClick={() => navigate("/profile")}
            >
              <FaRegUserCircle
                className="text-neutral-600 transition-all duration-500 group-hover:text-neutral-900 group-hover:scale-110"
                title="Profile"
              />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent"></div>
    </header>
  );
};

export default Navbar;
