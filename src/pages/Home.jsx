


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const shopByRoom = [
    {
      name: "Bedroom",
      image: "https://i.pinimg.com/1200x/eb/0f/17/eb0f17f9f852c820f30083879943b317.jpg",
    },
    {
      name: "Living Room",
      image: "https://i.pinimg.com/736x/b8/15/a1/b815a12708039611310ca7b5effbf31c.jpg",
    },
    {
      name: "Kitchen",
      image: "https://i.pinimg.com/736x/d7/0e/19/d70e19dd7a78fdbff4753bc30cde6514.jpg",
    },
  ];

  const inspirationRooms = [
    {
      name: "Modern Living",
      image: "https://i.pinimg.com/1200x/cb/b7/af/cbb7af456f16cf89557f79ed365b15e7.jpg",
    },
    {
      name: "Cozy Bedroom",
      image: "https://i.pinimg.com/736x/ed/f6/8b/edf68b0eec30954b0dfb277d1e8ad8bd.jpg",
    },
    {
      name: "Natural Kitchen",
      image: "https://i.pinimg.com/736x/37/58/3c/37583c606bf3fe14b67aeae10cb40fef.jpg",
    },
    {
      name: "Dining Room",
      image: "https://i.pinimg.com/736x/a8/33/61/a833617230ba2ee311a84e21170f9e14.jpg",
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      title: "Textured Ceramic Vase",
      price: 25, 
      image: "https://i.pinimg.com/1200x/13/30/bd/1330bdb20828ee93466a0a437cd2da30.jpg",
    },
    {
      id: 2,
      title: "Rattan Wall Mirror",
      price: 40,
      image: "https://i.pinimg.com/1200x/70/1d/7d/701d7d1a9305b00b7b43a65154b8aedb.jpg",
    },
    {
      id: 3,
      title: "Linen Throw Pillows",
      price: 55,
      image: "https://i.pinimg.com/736x/bd/76/74/bd7674f2252526a09f99989ec9a29761.jpg",
    },
  ];

  return (
    <>
     <Navbar />
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes floatReverse {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(20px) rotate(-5deg); }
          }
          
          @keyframes pulse3d {
            0%, 100% { transform: scale(1) rotateZ(0deg); box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
            50% { transform: scale(1.1) rotateZ(180deg); box-shadow: 0 0 0 20px rgba(255,255,255,0); }
          }
          
          @keyframes slideInUp {
            from { transform: translateY(100px) rotateX(15deg); opacity: 0; }
            to { transform: translateY(0) rotateX(0deg); opacity: 1; }
          }
          
          @keyframes morphShape {
            0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
            50% { border-radius: 50% 50% 25% 75% / 25% 75% 50% 50%; }
            75% { border-radius: 25% 75% 50% 50% / 50% 25% 75% 50%; }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%) rotateZ(45deg); }
            100% { transform: translateX(300%) rotateZ(45deg); }
          }
          
          @media (min-width: 768px) {
            .perspective-card {
              transform-style: preserve-3d;
              perspective: 1000px;
            }
            
            .card-3d {
              transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
              transform-style: preserve-3d;
            }
            
            .card-3d:hover {
              transform: rotateY(8deg) rotateX(8deg) translateZ(20px);
            }
          }
          
          .glass-morphism {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .text-glow {
            text-shadow: 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3);
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          @media (min-width: 768px) {
            .hover-lift {
              transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .hover-lift:hover {
              transform: translateY(-12px) scale(1.02);
              box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            }
          }

          @media (max-width: 767px) {
            .mobile-optimized {
              transform: none !important;
              transition: opacity 0.3s ease;
            }
            
            .mobile-optimized:active {
              opacity: 0.8;
            }
          }
        `}
      </style>
      
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden relative">
        {/* Floating Background Elements - Hidden on mobile for performance */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block">
          <div className="absolute top-20 left-10 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-gray-200/20 to-gray-300/10 rounded-full" 
               style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 right-20 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-bl from-gray-300/15 to-gray-200/5" 
               style={{ animation: 'floatReverse 8s ease-in-out infinite', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute bottom-40 left-1/4 w-24 md:w-40 h-24 md:h-40 bg-gradient-to-tr from-gray-200/10 to-transparent" 
               style={{ animation: 'morphShape 12s ease-in-out infinite' }}></div>
        </div>

        {/* Hero Section - Responsive Heights */}
        <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden perspective-card">
          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 md:from-black/50 md:via-black/20 md:to-black/50 z-10"></div>
          
          {/* Geometric Elements - Responsive and Hidden on Mobile */}
          <div className="hidden md:block absolute top-32 left-4 md:left-16 w-12 md:w-20 h-12 md:h-20 border-2 border-white/30 z-20" 
               style={{ 
                 animation: 'pulse3d 4s ease-in-out infinite', 
                 transform: 'rotate(45deg)',
                 clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
               }}></div>
          <div className="hidden md:block absolute top-48 right-8 md:right-24 w-12 md:w-16 h-12 md:h-16 glass-morphism rounded-full z-20" 
               style={{ animation: 'float 5s ease-in-out infinite' }}></div>
          <div className="hidden lg:block absolute bottom-32 left-32 w-28 h-1 bg-gradient-to-r from-white/40 to-transparent z-20" 
               style={{ animation: 'shimmer 3s ease-in-out infinite' }}></div>

          {/* Enhanced Slides */}
          <div 
            className="absolute inset-0 flex transition-all duration-[2000ms] ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroImages.map((image, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                <img
                  src={`${image}?auto=format&fit=crop&w=1920&h=1080`}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-105 md:hover:scale-110"
                  style={{ 
                    filter: 'brightness(0.85) contrast(1.1)',
                    transform: currentSlide === index ? 'scale(1.02) md:scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
              </div>
            ))}
          </div>

          {/* Hero Content - Fully Responsive */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 sm:px-6">
            <div style={{ animation: 'slideInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1)' }}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extralight mb-4 sm:mb-6 md:mb-8 text-white tracking-wider leading-tight text-glow">
                Discover
                <span className="block font-thin italic text-2xl sm:text-3xl md:text-5xl lg:text-7xl mt-2 md:mt-4 opacity-95 transform hover:scale-105 transition-transform duration-700">
                  Minimal Elegance
                </span>
              </h1>
              <div className="w-20 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4 sm:mb-6 md:mb-8" 
                   style={{ animation: 'shimmer 2s ease-in-out infinite' }}></div>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 md:mb-12 max-w-4xl leading-relaxed font-light opacity-90 px-4">
                Timeless pieces for your favorite spaces
              </p>
              <button
                onClick={() => navigate("/products")}
                className="group relative bg-white/10 backdrop-blur-sm text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 border border-white/30 font-light transition-all duration-700 hover:bg-white hover:text-black transform hover:scale-105 hover:shadow-2xl overflow-hidden active:scale-95 md:active:scale-100"
                style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)' }}
              >
                <span className="relative z-10 tracking-widest uppercase text-xs sm:text-sm">Shop Now</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>
          </div>

          {/* Responsive Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center space-x-2 sm:space-x-3 md:space-x-4 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-700 transform hover:scale-125 active:scale-110 ${
                  currentSlide === index 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                style={{
                  boxShadow: currentSlide === index ? '0 0 20px rgba(255,255,255,0.6)' : 'none',
                  animation: currentSlide === index ? 'pulse3d 2s ease-in-out infinite' : 'none'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Shop by Room Section - Responsive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20" style={{ animation: 'slideInUp 0.8s ease-out' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight mb-3 sm:mb-4 md:mb-6 tracking-wider">Shop by Room</h2>
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4 sm:mb-6 md:mb-8"></div>
              <p className="text-gray-600 font-light text-sm sm:text-base md:text-lg opacity-80">Curated collections for every space</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {shopByRoom.map((room, index) => (
                <div
                  key={room.name}
                  onClick={() => navigate(`/products?room=${room.name.toLowerCase()}`)}
                  className="group cursor-pointer perspective-card mobile-optimized"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="card-3d relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl hover-lift bg-white">
                    <div className="relative overflow-hidden">
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover transition-all duration-1000 group-hover:scale-105 md:group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2 md:mb-3 tracking-wide transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                        {room.name}
                      </h3>
                      <div className="w-8 sm:w-10 md:w-12 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
                    </div>

                    {/* 3D Border Effect - Desktop Only */}
                    <div className="hidden md:block absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-700 rounded-3xl"></div>
                    
                    {/* Hover Glow - Desktop Only */}
                    <div className="hidden md:block absolute inset-0 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" 
                         style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspire Your Space Section - Responsive Horizontal Scroll */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Floating Decoration - Hidden on Mobile */}
          <div className="hidden lg:block absolute top-20 right-20 w-32 md:w-40 h-32 md:h-40 border border-gray-200/50 rounded-full opacity-30" 
               style={{ animation: 'morphShape 15s ease-in-out infinite' }}></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20" style={{ animation: 'slideInUp 0.8s ease-out 0.2s both' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight mb-3 sm:mb-4 md:mb-6 tracking-wider">Inspire Your Space</h2>
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4 sm:mb-6 md:mb-8"></div>
              <p className="text-gray-600 font-light text-sm sm:text-base md:text-lg opacity-80">Design inspiration for modern living</p>
            </div>
            
            <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide">
              {inspirationRooms.map((look, index) => (
                <div
                  key={look.name}
                  className="group min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] perspective-card flex-shrink-0 mobile-optimized"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="card-3d relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover-lift bg-white">
                    <div className="relative overflow-hidden">
                      <img
                        src={look.image}
                        alt={look.name}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-1000 group-hover:scale-105 md:group-hover:scale-115"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-light mb-2 md:mb-3 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-all duration-700 tracking-wide">
                        {look.name}
                      </h3>
                      <div className="w-10 sm:w-12 md:w-16 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Now Section - Fully Responsive */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20" style={{ animation: 'slideInUp 0.8s ease-out 0.4s both' }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight mb-3 sm:mb-4 md:mb-6 tracking-wider">Trending Now</h2>
              <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4 sm:mb-6 md:mb-8"></div>
              <p className="text-gray-600 font-light text-sm sm:text-base md:text-lg opacity-80">Most loved pieces this season</p>
            </div>
            
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
          </div>
        </section>

        {/* Footer Spacer with Gradient - Responsive */}
        <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-t from-gray-200/50 to-white"></div>
      </div>
      
    </>
  );
};

export default Home;









