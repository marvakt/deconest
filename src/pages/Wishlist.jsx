




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
      await addToCart(item.product, 1);
      removeFromWishlist(item.id); 
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FaHeart className="text-5xl text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding items you love!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-32 left-1/4 w-64 h-64 bg-gray-200 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-gray-300 rounded-full blur-2xl animate-float-delayed"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-black rounded-2xl shadow-lg mb-4">
              <FaHeart className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Wishlist</h1>
            <p className="text-gray-600">Items you've saved for later</p>
          </div>

          <div className="text-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 font-medium shadow-sm">
              <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} in Wishlist
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-out border border-gray-200 hover:border-gray-400 animate-slideInUp transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden bg-gray-50">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
                    />
                  </div>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2.5 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                    aria-label="Remove from wishlist"
                  >
                    <FaHeart className="h-4 w-4 text-red-500" />
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <h2 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-black transition-colors duration-300">
                    {item.product.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-3 px-4 bg-black hover:bg-gray-900 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] group/button"
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