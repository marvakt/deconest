


// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext"; // ✅ import useCart

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));
//   const { cartCount } = useCart(); // ✅ use cartCount from context

//   // Scroll to a specific section if on Home, otherwise navigate with state
//   const scrollToSection = (sectionId) => {
//     if (location.pathname !== "/") {
//       navigate("/", { state: { scrollTo: sectionId } });
//     } else {
//       document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white text-black sticky top-0 z-50">
//       <h1
//         onClick={() => navigate("/")}
//         className="text-2xl font-bold cursor-pointer"
//       >
//         DecoNest
//       </h1>

//       {/* Navigation Links */}
//       <nav className="flex gap-6 text-sm font-medium">
//         <button onClick={() => navigate("/")} className="hover:text-gray-700">
//           Home
//         </button>
//         <button onClick={() => scrollToSection("rooms")} className="hover:text-gray-700">
//           Rooms
//         </button>
//         <button onClick={() => scrollToSection("inspire")} className="hover:text-gray-700">
//           Inspire
//         </button>
//         <button onClick={() => navigate("/my-orders")} className="hover:text-gray-700">
//           My Orders
//         </button>
//       </nav>

//       {/* Icons + Auth Buttons */}
//       <div className="flex items-center space-x-4 relative">
//         <button
//           onClick={() => navigate("/wishlist")}
//           title="Wishlist"
//           className="hover:text-red-500 text-lg"
//         >
//           🤍
//         </button>

//         {/* Cart Icon with Notification Badge */}
//         <div className="relative">
//           <button
//             onClick={() => navigate("/cart")}
//             title="Cart"
//             className="hover:text-green-600 text-lg"
//           >
//             🛒
//           </button>
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {cartCount}
//             </span>
//           )}
//         </div>

//         {!user ? (
//           <>
//             <button
//               onClick={() => navigate("/signup")}
//               className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
//             >
//               Register
//             </button>
//             <button
//               onClick={() => navigate("/login")}
//               className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
//             >
//               Login
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => navigate("/profile")}
//             className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
//           >
//             Profile
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import cart context

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const { cartCount } = useCart(); // Get cart item count

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white text-black sticky top-0 z-50">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        DecoNest
      </h1>

      {/* Navigation Links */}
      <nav className="flex gap-6 text-sm font-medium">
        <button onClick={() => navigate("/")} className="hover:text-gray-700">
          Home
        </button>
        <button onClick={() => navigate("/my-orders")} className="hover:text-gray-700">
          My Orders
        </button>
      </nav>

      {/* Icons + Auth Buttons */}
      <div className="flex items-center space-x-4 relative">
        <button
          onClick={() => navigate("/wishlist")}
          title="Wishlist"
          className="hover:text-red-500 text-lg"
        >
          🤍
        </button>

        {/* Cart Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => navigate("/cart")}
            title="Cart"
            className="hover:text-green-600 text-lg"
          >
            🛒
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {!user ? (
          <>
            <button
              onClick={() => navigate("/signup")}
              className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
            >
              Login
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/profile")}
            className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            Profile
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
