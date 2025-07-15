// // pages/Wishlist.jsx
// import React from "react";
// import { useWishlist } from "../contexts/WishlistContext";

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist } = useWishlist();

//   if (!wishlist) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">❤️ Your Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {wishlist.map((item) => (
//             <div key={item.wid} className="border p-4 rounded shadow">
//               <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-2" />
//               <h3 className="text-lg font-semibold">{item.title}</h3>
//               <p className="text-gray-600">₹{item.price}</p>
//               <button
//                 onClick={() => removeFromWishlist(item.wid)}
//                 className="mt-2 text-red-500 hover:underline text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;


import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.wid); // wid is custom ID in wishlist
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">💖 Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.wid}
                className="border rounded-xl p-4 shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-36 h-36 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mb-3">₹{item.price}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.wid)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
