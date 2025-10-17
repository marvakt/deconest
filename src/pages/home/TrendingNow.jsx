import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const TrendingNow = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trending products from API
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        // Get first 3 products as trending (or filter by a "trending" property if you have one)
        const trending = res.data.slice(0, 3);
        setTrendingProducts(trending);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trending products:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20" style={{ animation: 'slideInUp 0.8s ease-out 0.4s both' }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight mb-3 sm:mb-4 md:mb-6 tracking-wider">Trending Now</h2>
          <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4 sm:mb-6 md:mb-8"></div>
          <p className="text-gray-600 font-light text-sm sm:text-base md:text-lg opacity-80">Most loved pieces this season</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading trending products...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {trendingProducts.map((item, index) => {
              const isInWishlist = wishlist.some((w) => w.productId === item.id);
              const wishlistItem = wishlist.find((w) => w.productId === item.id);

              return (
                <div
                  key={item.id}
                  className="group perspective-card mobile-optimized"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="card-3d relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover-lift border border-gray-100">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-all duration-1000 group-hover:scale-105 md:group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700"></div>
                      
                      {/* Wishlist Button - Responsive */}
                      <button
                        onClick={() => {
                          if (wishlistItem) {
                            removeFromWishlist(wishlistItem.id);
                          } else {
                            addToWishlist(item);
                          }
                        }}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95"
                        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        {isInWishlist ? (
                          <FaHeart className="text-red-500 text-sm sm:text-lg transition-all duration-300" />
                        ) : (
                          <FaRegHeart className="text-gray-400 text-sm sm:text-lg transition-all duration-300 hover:text-red-400" />
                        )}
                      </button>
                      
                      {/* Shimmer Effect - Desktop Only */}
                      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                    </div>

                    <div className="p-4 sm:p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl font-light mb-2 sm:mb-3 text-gray-900 group-hover:text-black transition-colors duration-500 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-xl sm:text-2xl font-light text-gray-800 mb-4 sm:mb-6 md:mb-8 tracking-wide">₹{item.price}</p>
                      
                      {/* Responsive Add to Cart Button */}
                      <button
                        onClick={() => {
                          addToCart(item);
                          if (wishlistItem) {
                            removeFromWishlist(wishlistItem.id);
                          }
                        }}
                        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-medium transition-all duration-300 ease-out hover:from-gray-800 hover:to-gray-700 hover:shadow-lg hover:shadow-gray-900/25 active:scale-[0.98] transform focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 relative overflow-hidden text-sm sm:text-base"
                      >
                        <span className="relative z-10">Add to Cart</span>
                        {/* Subtle shine effect - Desktop Only */}
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      </button>
                    </div>

                    {/* 3D Card Shadow - Desktop Only */}
                    <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" 
                         style={{ 
                           boxShadow: '0 30px 60px rgba(0,0,0,0.2), 0 15px 30px rgba(0,0,0,0.1)',
                           transform: 'translateZ(-10px)'
                         }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingNow;