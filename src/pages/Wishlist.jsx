

// import React from "react";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import Navbar from "../components/Navbar";
// import { toast } from "react-toastify"; 

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const handleAddToCart = async (item) => {
//     await addToCart(item); 
//     await removeFromWishlist(item.id);
    
//   };

//   const handleRemove = (id) => {
//     removeFromWishlist(id);
   
//   };

//   return (
//     <div className="min-h-screen bg-white text-black">
//       <Navbar />

//       <div className="px-6 py-10">
//         <h2 className="text-3xl font-bold text-center mb-8">💖 Your Wishlist</h2>

//         {wishlist.length === 0 ? (
//           <p className="text-center text-gray-500">Your wishlist is empty.</p>
//         ) : (
//           <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {wishlist.map((item) => (
//               <div
//                 key={item.id}
//                 className="border rounded-xl p-4 shadow-md flex flex-col items-center text-center"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-36 h-36 object-cover rounded-md mb-3"
//                 />
//                 <h3 className="font-semibold text-lg">{item.title}</h3>
//                 <p className="text-gray-600 mb-3">₹{item.price}</p>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleAddToCart(item)}
//                     className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800 transition"
//                   >
//                     Add to Cart
//                   </button>
//                   <button
//                     onClick={() => handleRemove(item.id)}
//                     className="text-red-500 hover:underline text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;


import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item) => {
    await addToCart(item);
    toast.success("Item added to cart!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-8 flex items-center gap-3 text-stone-800">
          <FaHeart className="text-amber-600 animate-pulse" />
          <span className="relative">
            Your Wishlist
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
          </span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 mb-4 rounded-full bg-amber-50">
              <svg
                className="w-16 h-16 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-stone-700 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-stone-500 max-w-md mx-auto">
              Save your favorite DecoNest items here for later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 object-cover object-center"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition duration-200 shadow-sm"
                    aria-label="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-stone-500 hover:text-amber-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-medium text-stone-800 mb-1 line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-amber-700 font-semibold text-lg mb-4">
                    ₹{item.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2.5 px-4 bg-stone-800 hover:bg-amber-600 text-white rounded-md transition duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Embedded animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Wishlist;