

import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify"; 

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item) => {
    await addToCart(item); 
    await removeFromWishlist(item.id);
    
  };

  const handleRemove = (id) => {
    removeFromWishlist(id);
   
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
                key={item.id}
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
                    onClick={() => handleRemove(item.id)}
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
