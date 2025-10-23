


// import React from "react";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useNavigate } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

//   const isInWishlist = wishlist.some((item) => item.productId === product.id);

//   const toggleWishlist = () => {
//     if (isInWishlist) {
//       const item = wishlist.find((item) => item.productId === product.id);
//       if (item) {
//         removeFromWishlist(item.id);
//       }
//     } else {
//       addToWishlist(product);
//     }
//   };

//   return (
//     <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 border border-gray-100/50 backdrop-blur-sm">
//       {/* Gradient overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
      
//       {/* Wishlist button with React icons */}
//       <button
//         onClick={toggleWishlist}
//         className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95"
//         title="Wishlist"
//       >
//         {isInWishlist ? (
//           <FaHeart className="text-red-500 text-lg transition-all duration-300" />
//         ) : (
//           <FaRegHeart className="text-gray-400 text-lg transition-all duration-300 hover:text-red-400" />
//         )}
//       </button>

//       {/* Image container with enhanced hover effects */}
//       <div className="relative overflow-hidden cursor-pointer" onClick={() => navigate(`/productDetails/${product.id}`)}>
//         <img
//           src={product.image}
//           alt={product.title}
//           className="w-full h-52 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
//         />
//         {/* Subtle overlay gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
//         {/* Quick view indicator */}
//         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
//           <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//             Quick View
//           </div>
//         </div>
//       </div>

//       {/* Content area with enhanced spacing */}
//       <div className="p-6 relative z-10">
//         {/* Title with truncation and hover effect */}
//         <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug transition-colors duration-300 group-hover:text-gray-700">
//           {product.title}
//         </h3>
        
//         {/* Price with enhanced styling */}
//         <div className="flex items-center mb-4">
//           <span className="text-xl font-bold text-gray-900 transition-colors duration-300">
//             ₹{product.price}
//           </span>
//           {/* Optional: Add a subtle price highlight */}
//           <div className="ml-2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         </div>

//         {/* Add to cart button with premium styling */}
//         <button
//           onClick={() => addToCart(product)}
//           className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-out hover:from-gray-800 hover:to-gray-700 hover:shadow-lg hover:shadow-gray-900/25 active:scale-[0.98] transform focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 relative overflow-hidden"
//         >
//           <span className="relative z-10">Add to Cart</span>
//           {/* Subtle shine effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
//         </button>
//       </div>

//       {/* Decorative corner accent */}
//       <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-gray-100/50 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.product.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      const item = wishlist.find((i) => i.product.id === product.id);
      if (item) removeFromWishlist(item.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 border border-gray-100/50 backdrop-blur-sm">
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95"
      >
        {isInWishlist ? (
          <FaHeart className="text-red-500 text-lg transition-all duration-300" />
        ) : (
          <FaRegHeart className="text-gray-400 text-lg transition-all duration-300 hover:text-red-400" />
        )}
      </button>

      <div className="relative overflow-hidden cursor-pointer" onClick={() => navigate(`/productDetails/${product.id}`)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </div>
        </div>
      </div>

      <div className="p-6 relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug transition-colors duration-300 group-hover:text-gray-700">
          {product.title}
        </h3>
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold text-gray-900 transition-colors duration-300">
            ₹{product.price}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-out hover:from-gray-800 hover:to-gray-700 hover:shadow-lg hover:shadow-gray-900/25 active:scale-[0.98] transform focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 relative overflow-hidden"
        >
          <span className="relative z-10">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
