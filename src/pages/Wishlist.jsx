


// import React from "react";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import Navbar from "../components/Navbar";
// import { FaHeart } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const handleAddToCart = async (item) => {
//     try {
//       await addToCart(item.product, 1); // add product to cart
//       removeFromWishlist(item.id); // remove from wishlist after adding
//       toast.success("Moved to cart!");
//     } catch (err) {
//       console.error("Error moving to cart:", err);
//       toast.error("Failed to move item to cart");
//     }
//   };

//   if (!wishlist.length) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center text-gray-500">
//           Your wishlist is empty.
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-32 left-1/4 w-64 h-64 bg-gray-100/30 rounded-full blur-3xl animate-float"></div>
//           <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-black/5 rounded-full blur-2xl animate-float-delayed"></div>
//         </div>

//         <div className="relative max-w-6xl mx-auto px-4 py-8">
//           <div className="text-center mb-12">
//             <h1 className="text-3xl font-semibold mb-8 flex items-center justify-center gap-3 text-black">
//               <FaHeart className="text-black animate-pulse" />
//               <span className="relative">
//                 Your Wishlist
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
//               </span>
//             </h1>
//           </div>

//           {wishlist.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="inline-block p-6 mb-4 rounded-full bg-gray-50">
//                 <svg
//                   className="w-16 h-16 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                   ></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-medium text-black mb-2">
//                 Your wishlist is empty
//               </h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 Save your favorite DecoNest items here for later
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="text-center mb-8">
//                 <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 font-medium shadow-sm">
//                   <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
//                   {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} in Wishlist
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {wishlist.map((item, index) => (
//                   <div
//                     key={item.id}
//                     className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-out border border-gray-200/60 hover:border-black/20 animate-slideInUp transform hover:-translate-y-1"
//                     style={{
//                       animationDelay: `${index * 0.1}s`,
//                     }}
//                   >
//                     <div className="relative overflow-hidden bg-gray-50">
//                       <div className="aspect-[4/3] overflow-hidden">
//                         <img
//                           src={item.image}
//                           alt={item.title}
//                           className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
//                         />
//                       </div>

//                       <button
//                         onClick={() => removeFromWishlist(item.id)}
//                         className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
//                         aria-label="Remove from wishlist"
//                       >
//                         <FaHeart className="h-4 w-4 text-red-500" />
//                       </button>
//                     </div>

//                     <div className="p-4 space-y-3">
//                       <h2 className="text-lg font-medium text-black line-clamp-1 group-hover:text-gray-800 transition-colors duration-300">
//                         {item.title}
//                       </h2>

//                       <div className="flex items-center justify-between">
//                         <span className="text-lg font-semibold text-black">
//                           ₹{item.price}
//                         </span>
//                       </div>

//                       <button
//                         onClick={() => handleAddToCart(item)}
//                         className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99] group/button"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 transition-transform duration-300 group-hover/button:scale-110"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//                         </svg>
//                         <span>Add to Cart</span>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

    
//       <style>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(40px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translate(0, 0) rotate(0deg);
//           }
//           33% {
//             transform: translate(20px, -20px) rotate(1deg);
//           }
//           66% {
//             transform: translate(-20px, 10px) rotate(-1deg);
//           }
//         }

//         .animate-slideInUp {
//           animation: slideInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
//           opacity: 0;
//         }

//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }

//         .animate-float-delayed {
//           animation: float 8s ease-in-out infinite;
//           animation-delay: 4s;
//         }

//         ::-webkit-scrollbar {
//           width: 6px;
//         }

//         ::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: rgba(0, 0, 0, 0.2);
//           border-radius: 3px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: rgba(0, 0, 0, 0.4);
//         }

//         .backdrop-blur-sm {
//           backdrop-filter: blur(8px);
//         }

//         * {
//           transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
//         }

//         .line-clamp-1 {
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//         }

//         .line-clamp-2 {
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Wishlist;



import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item.product, 1); // add product to cart
      removeFromWishlist(item.id); // remove from wishlist after adding
      toast.success("Moved to cart!");
    } catch (err) {
      console.error("Error moving to cart:", err);
      toast.error("Failed to move item to cart");
    }
  };

  if (!wishlist.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Your wishlist is empty.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-1/4 w-64 h-64 bg-gray-100/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-black/5 rounded-full blur-2xl animate-float-delayed"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold mb-8 flex items-center justify-center gap-3 text-black">
              <FaHeart className="text-black animate-pulse" />
              <span className="relative">
                Your Wishlist
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </h1>
          </div>

          <div className="text-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 font-medium shadow-sm">
              <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} in Wishlist
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-out border border-gray-200/60 hover:border-black/20 animate-slideInUp transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden bg-gray-50">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                    aria-label="Remove from wishlist"
                  >
                    <FaHeart className="h-4 w-4 text-red-500" />
                  </button>
                </div>

                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-medium text-black line-clamp-1 group-hover:text-gray-800 transition-colors duration-300">
                    {item.product.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-black">
                      ₹{item.product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99] group/button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform duration-300 group-hover/button:scale-110"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(1deg); }
          66% { transform: translate(-20px, 10px) rotate(-1deg); }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 4s;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.4); }

        .backdrop-blur-sm { backdrop-filter: blur(8px); }
        * { transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }

        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
      `}</style>
    </>
  );
};

export default Wishlist;
