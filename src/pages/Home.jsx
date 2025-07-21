



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";

// const Home = () => {
//   const navigate = useNavigate();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();

//   const shopByRoom = [
//     {
//       name: "Bedroom",
//       image: "https://i.pinimg.com/1200x/eb/0f/17/eb0f17f9f852c820f30083879943b317.jpg",
//     },
//     {
//       name: "Living Room",
//       image: "https://i.pinimg.com/736x/b8/15/a1/b815a12708039611310ca7b5effbf31c.jpg",
//     },
//     {
//       name: "Kitchen",
//       image: "https://i.pinimg.com/736x/d7/0e/19/d70e19dd7a78fdbff4753bc30cde6514.jpg",
//     },
//   ];

//   const inspirationRooms = [
//     {
//       name: "Modern Living",
//       image: "https://i.pinimg.com/1200x/cb/b7/af/cbb7af456f16cf89557f79ed365b15e7.jpg",
//     },
//     {
//       name: "Cozy Bedroom",
//       image: "https://i.pinimg.com/736x/ed/f6/8b/edf68b0eec30954b0dfb277d1e8ad8bd.jpg",
//     },
//     {
//       name: "Natural Kitchen",
//       image: "https://i.pinimg.com/736x/37/58/3c/37583c606bf3fe14b67aeae10cb40fef.jpg",
//     },
//     {
//       name: "Dining Room",
//       image: "https://i.pinimg.com/736x/a8/33/61/a833617230ba2ee311a84e21170f9e14.jpg",
//     },
//   ];

//   const trendingProducts = [
//     {
//       id: 1,
//       title: "Textured Ceramic Vase",
//       price: 25, 
//       image: "https://i.pinimg.com/1200x/13/30/bd/1330bdb20828ee93466a0a437cd2da30.jpg",
//     },
//     {
//       id: 2,
//       title: "Rattan Wall Mirror",
//       price: 40,
//       image: "https://i.pinimg.com/1200x/70/1d/7d/701d7d1a9305b00b7b43a65154b8aedb.jpg",
//     },
//     {
//       id: 3,
//       title: "Linen Throw Pillows",
//       price: 55,
//       image: "https://i.pinimg.com/736x/bd/76/74/bd7674f2252526a09f99989ec9a29761.jpg",
//     },
//   ];

//   return (
//     <div className="bg-white text-black">
//       <Navbar />

//       <section className="text-center py-16 bg-gradient-to-b from-gray-100 to-white">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Minimal Elegance</h1>
//         <p className="text-lg text-gray-600 mb-6">Timeless pieces for your favorite spaces</p>
//         <button
//           onClick={() => navigate("/products")}
//           className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
//         >
//           Shop Now
//         </button>
//       </section>

//       <section className="py-12 px-6">
//         <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Shop by Room</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {shopByRoom.map((room) => (
//             <div
//               key={room.name}
//               onClick={() => navigate(`/products?room=${room.name.toLowerCase()}`)}
//               className="cursor-pointer hover:scale-105 transition transform"
//             >
//               <img src={room.image} alt={room.name} className="rounded-lg w-full h-56 object-cover" />
//               <p className="mt-3 text-center font-medium text-lg">{room.name}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="py-12 px-6 bg-gray-50">
//         <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Inspire Your Space</h2>
//         <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
//           {inspirationRooms.map((look) => (
//             <div
//               key={look.name}
//               className="min-w-[280px] relative rounded-lg overflow-hidden"
//             >
//               <img
//                 src={look.image}
//                 alt={look.name}
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//               <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full text-center py-2 text-sm font-semibold">
//                 {look.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="py-12 px-6">
//         <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Trending Now</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {trendingProducts.map((item) => {
//             const isInWishlist = wishlist.some((w) => w.productId === item.id);
//             const wishlistItem = wishlist.find((w) => w.productId === item.id);

//             return (
//               <div
//                 key={item.id}
//                 className="border rounded-lg p-4 hover:shadow-md transition group relative"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-48 object-cover rounded-md"
//                 />
//                 <div className="mt-3">
//                   <h3 className="text-lg font-medium">{item.title}</h3>
//                   <p className="text-sm text-gray-600">₹{item.price}</p> 
//                 </div>

//                 <button
//                   onClick={() => {
//                     if (wishlistItem) {
//                       removeFromWishlist(wishlistItem.id);
//                     } else {
//                       addToWishlist(item);
//                     }
//                   }}
//                   className={`absolute top-2 right-2 text-xl transition ${
//                     isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
//                   }`}
//                   title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//                 >
//                   ♥
//                 </button>

//                 <button
//                   onClick={() => {
//                     addToCart(item);
//                     if (wishlistItem) {
//                       removeFromWishlist(wishlistItem.id);
//                     }
//                   }}
//                   className="mt-3 bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";

// const Home = () => {
//   const navigate = useNavigate();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const { addToCart } = useCart();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Hero slide images
//   const heroImages = [
//     "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
//     "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3",
//     "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3"
//   ];

//   // Auto slide effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [heroImages.length]);

//   const shopByRoom = [
//     {
//       name: "Bedroom",
//       image: "https://i.pinimg.com/1200x/eb/0f/17/eb0f17f9f852c820f30083879943b317.jpg",
//     },
//     {
//       name: "Living Room",
//       image: "https://i.pinimg.com/736x/b8/15/a1/b815a12708039611310ca7b5effbf31c.jpg",
//     },
//     {
//       name: "Kitchen",
//       image: "https://i.pinimg.com/736x/d7/0e/19/d70e19dd7a78fdbff4753bc30cde6514.jpg",
//     },
//   ];

//   const inspirationRooms = [
//     {
//       name: "Modern Living",
//       image: "https://i.pinimg.com/1200x/cb/b7/af/cbb7af456f16cf89557f79ed365b15e7.jpg",
//     },
//     {
//       name: "Cozy Bedroom",
//       image: "https://i.pinimg.com/736x/ed/f6/8b/edf68b0eec30954b0dfb277d1e8ad8bd.jpg",
//     },
//     {
//       name: "Natural Kitchen",
//       image: "https://i.pinimg.com/736x/37/58/3c/37583c606bf3fe14b67aeae10cb40fef.jpg",
//     },
//     {
//       name: "Dining Room",
//       image: "https://i.pinimg.com/736x/a8/33/61/a833617230ba2ee311a84e21170f9e14.jpg",
//     },
//   ];

//   const trendingProducts = [
//     {
//       id: 1,
//       title: "Textured Ceramic Vase",
//       price: 25, 
//       image: "https://i.pinimg.com/1200x/13/30/bd/1330bdb20828ee93466a0a437cd2da30.jpg",
//     },
//     {
//       id: 2,
//       title: "Rattan Wall Mirror",
//       price: 40,
//       image: "https://i.pinimg.com/1200x/70/1d/7d/701d7d1a9305b00b7b43a65154b8aedb.jpg",
//     },
//     {
//       id: 3,
//       title: "Linen Throw Pillows",
//       price: 55,
//       image: "https://i.pinimg.com/736x/bd/76/74/bd7674f2252526a09f99989ec9a29761.jpg",
//     },
//   ];

//   // Enhanced DecoNest Home Component with Modern Styling
// // Replace your existing return statement with this enhanced version

// return (
//   <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900 overflow-hidden">
//     <Navbar />

//     {/* Hero Section with Enhanced Animations */}
//     <section className="relative h-[85vh] overflow-hidden">
//       {/* Animated Background Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-5"></div>
      
//       {/* Floating Geometric Elements */}
//       <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rotate-45 animate-pulse"></div>
//       <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
//       <div className="absolute bottom-40 left-20 w-24 h-1 bg-white/30 animate-pulse"></div>

//       {/* Slides with Enhanced Parallax Effect */}
//       <div 
//         className="absolute inset-0 flex transition-all duration-[1500ms] ease-out"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {heroImages.map((image, index) => (
//           <div key={index} className="w-full h-full flex-shrink-0 relative">
//             <img
//               src={`${image}?auto=format&fit=crop&w=1920&h=1080`}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover transition-transform duration-[8000ms] hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
//           </div>
//         ))}
//       </div>

//       {/* Enhanced Hero Content */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
//         <div className="animate-[fadeInUp_1s_ease-out]">
//           <h1 className="text-5xl md:text-7xl font-light mb-6 text-white tracking-wide leading-tight">
//             Discover
//             <span className="block font-thin italic text-4xl md:text-6xl mt-2 opacity-90">
//               Minimal Elegance
//             </span>
//           </h1>
//           <div className="w-24 h-0.5 bg-white mx-auto mb-6 animate-pulse"></div>
//           <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl leading-relaxed font-light">
//             Timeless pieces for your favorite spaces
//           </p>
//           <button
//             onClick={() => navigate("/products")}
//             className="group relative bg-white text-black px-10 py-4 rounded-none font-medium transition-all duration-500 hover:bg-black hover:text-white transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-white/20 overflow-hidden"
//           >
//             <span className="relative z-10 tracking-wider uppercase text-sm">Shop Now</span>
//             <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
//           </button>
//         </div>
//       </div>

//       {/* Enhanced Slide Indicators */}
//       <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
//         {heroImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`h-0.5 rounded-full transition-all duration-500 ${
//               currentSlide === index 
//                 ? 'bg-white w-12 shadow-lg' 
//                 : 'bg-white/40 w-6 hover:bg-white/70'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>

//     {/* Shop by Room Section with Glass Morphism */}
//     <section className="py-20 px-6 relative">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="w-full h-full bg-gradient-to-r from-gray-900 via-transparent to-gray-900"></div>
//       </div>
      
//       <div className="relative z-10 max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Shop by Room</h2>
//           <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-6"></div>
//           <p className="text-gray-600 font-light text-lg">Curated collections for every space</p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {shopByRoom.map((room, index) => (
//             <div
//               key={room.name}
//               onClick={() => navigate(`/products?room=${room.name.toLowerCase()}`)}
//               className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
//               style={{ animationDelay: `${index * 200}ms` }}
//             >
//               <div className="relative overflow-hidden">
//                 <img 
//                   src={room.image} 
//                   alt={room.name} 
//                   className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75" 
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               </div>
              
//               <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                 <h3 className="text-2xl font-light mb-2 tracking-wide">{room.name}</h3>
//                 <div className="w-8 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//               </div>

//               {/* Hover Border Effect */}
//               <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-2xl"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* Inspire Your Space Section with Scroll Animation */}
//     <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
//       {/* Floating Elements */}
//       <div className="absolute top-10 right-10 w-32 h-32 border border-gray-200 rounded-full opacity-30 animate-spin" style={{ animationDuration: '20s' }}></div>
      
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Inspire Your Space</h2>
//           <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-6"></div>
//           <p className="text-gray-600 font-light text-lg">Design inspiration for modern living</p>
//         </div>
        
//         <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
//           {inspirationRooms.map((look, index) => (
//             <div
//               key={look.name}
//               className="group min-w-[320px] relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 flex-shrink-0"
//               style={{ animationDelay: `${index * 150}ms` }}
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={look.image}
//                   alt={look.name}
//                   className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
//               </div>
              
//               <div className="absolute bottom-0 left-0 right-0 p-6">
//                 <h3 className="text-white text-xl font-light mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
//                   {look.name}
//                 </h3>
//                 <div className="w-12 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//               </div>

//               {/* Glassmorphism Hover Effect */}
//               <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* Trending Now Section with Card Animations */}
//     <section className="py-20 px-6 bg-white relative">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">Trending Now</h2>
//           <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-6"></div>
//           <p className="text-gray-600 font-light text-lg">Most loved pieces this season</p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {trendingProducts.map((item, index) => {
//             const isInWishlist = wishlist.some((w) => w.productId === item.id);
//             const wishlistItem = wishlist.find((w) => w.productId === item.id);

//             return (
//               <div
//                 key={item.id}
//                 className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 hover:border-gray-200"
//                 style={{ animationDelay: `${index * 200}ms` }}
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  
//                   {/* Wishlist Button with Enhanced Animation */}
//                   <button
//                     onClick={() => {
//                       if (wishlistItem) {
//                         removeFromWishlist(wishlistItem.id);
//                       } else {
//                         addToWishlist(item);
//                       }
//                     }}
//                     className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm border transition-all duration-500 flex items-center justify-center ${
//                       isInWishlist 
//                         ? "bg-red-500/20 border-red-500/50 text-red-500 scale-110" 
//                         : "bg-white/20 border-white/30 text-white hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 hover:scale-110"
//                     }`}
//                     title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//                   >
//                     <span className="text-lg">{isInWishlist ? "♥" : "♡"}</span>
//                   </button>
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-xl font-light mb-2 text-gray-900 group-hover:text-black transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-2xl font-light text-gray-800 mb-6">₹{item.price}</p>
                  
//                   <button
//                     onClick={() => {
//                       addToCart(item);
//                       if (wishlistItem) {
//                         removeFromWishlist(wishlistItem.id);
//                       }
//                     }}
//                     className="w-full bg-gray-900 text-white py-3 px-6 rounded-none font-light tracking-wider uppercase text-sm transition-all duration-500 hover:bg-black hover:shadow-lg transform hover:scale-105 border-2 border-transparent hover:border-gray-300 relative overflow-hidden group/btn"
//                   >
//                     <span className="relative z-10">Add to Cart</span>
//                     <div className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
//                     <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 z-20 font-light tracking-wider uppercase text-sm">
//                       Add to Cart
//                     </span>
//                   </button>
//                 </div>

//                 {/* Card Glow Effect */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>

//     {/* Footer Spacer with Gradient */}
//     <div className="h-20 bg-gradient-to-t from-gray-100 to-white"></div>
//   </div>
// );
// };

// export default Home;


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

  // Hero slide images
  const heroImages = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3"
  ];

  // Auto slide effect
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
          
          .hover-lift {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .hover-lift:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          }
        `}
      </style>
      
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden relative">
        <Navbar />

        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-gray-300/10 rounded-full" 
               style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-bl from-gray-300/15 to-gray-200/5" 
               style={{ animation: 'floatReverse 8s ease-in-out infinite', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-tr from-gray-200/10 to-transparent" 
               style={{ animation: 'morphShape 12s ease-in-out infinite' }}></div>
        </div>

        {/* Hero Section with Enhanced 3D Effects */}
        <section className="relative h-[85vh] overflow-hidden perspective-card">
          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/50 z-10"></div>
          
          {/* Geometric Elements with 3D Animation */}
          <div className="absolute top-32 left-16 w-20 h-20 border-2 border-white/30 z-20" 
               style={{ 
                 animation: 'pulse3d 4s ease-in-out infinite', 
                 transform: 'rotate(45deg)',
                 clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
               }}></div>
          <div className="absolute top-48 right-24 w-16 h-16 glass-morphism rounded-full z-20" 
               style={{ animation: 'float 5s ease-in-out infinite' }}></div>
          <div className="absolute bottom-32 left-32 w-28 h-1 bg-gradient-to-r from-white/40 to-transparent z-20" 
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
                  className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110"
                  style={{ 
                    filter: 'brightness(0.85) contrast(1.1)',
                    transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
              </div>
            ))}
          </div>

          {/* Hero Content with 3D Text Effects */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
            <div style={{ animation: 'slideInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1)' }}>
              <h1 className="text-5xl md:text-8xl font-extralight mb-8 text-white tracking-wider leading-tight text-glow">
                Discover
                <span className="block font-thin italic text-4xl md:text-7xl mt-4 opacity-95 transform hover:scale-105 transition-transform duration-700">
                  Minimal Elegance
                </span>
              </h1>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8" 
                   style={{ animation: 'shimmer 2s ease-in-out infinite' }}></div>
              <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl leading-relaxed font-light opacity-90">
                Timeless pieces for your favorite spaces
              </p>
              <button
                onClick={() => navigate("/products")}
                className="group relative bg-white/10 backdrop-blur-sm text-white px-12 py-5 border border-white/30 font-light transition-all duration-700 hover:bg-white hover:text-black transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)' }}
              >
                <span className="relative z-10 tracking-widest uppercase text-sm">Shop Now</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>
          </div>

          {/* 3D Slide Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-700 transform hover:scale-125 ${
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

        {/* Shop by Room Section with 3D Cards */}
        <section className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-20" style={{ animation: 'slideInUp 0.8s ease-out' }}>
              <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-wider">Shop by Room</h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-8"></div>
              <p className="text-gray-600 font-light text-lg opacity-80">Curated collections for every space</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {shopByRoom.map((room, index) => (
                <div
                  key={room.name}
                  onClick={() => navigate(`/products?room=${room.name.toLowerCase()}`)}
                  className="group cursor-pointer perspective-card"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="card-3d relative overflow-hidden rounded-3xl shadow-xl hover-lift bg-white">
                    <div className="relative overflow-hidden">
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="w-full h-80 object-cover transition-all duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-light mb-3 tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                        {room.name}
                      </h3>
                      <div className="w-12 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
                    </div>

                    {/* 3D Border Effect */}
                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-700 rounded-3xl"></div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" 
                         style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspire Your Space Section with Horizontal Scroll */}
        <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Floating Decoration */}
          <div className="absolute top-20 right-20 w-40 h-40 border border-gray-200/50 rounded-full opacity-30" 
               style={{ animation: 'morphShape 15s ease-in-out infinite' }}></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20" style={{ animation: 'slideInUp 0.8s ease-out 0.2s both' }}>
              <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-wider">Inspire Your Space</h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-8"></div>
              <p className="text-gray-600 font-light text-lg opacity-80">Design inspiration for modern living</p>
            </div>
            
            <div className="flex gap-10 overflow-x-auto pb-6 scrollbar-hide">
              {inspirationRooms.map((look, index) => (
                <div
                  key={look.name}
                  className="group min-w-[380px] perspective-card flex-shrink-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="card-3d relative rounded-3xl overflow-hidden shadow-xl hover-lift bg-white">
                    <div className="relative overflow-hidden">
                      <img
                        src={look.image}
                        alt={look.name}
                        className="w-full h-64 object-cover transition-all duration-1000 group-hover:scale-115"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-white text-xl font-light mb-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 tracking-wide">
                        {look.name}
                      </h3>
                      <div className="w-16 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
                    </div>

                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 glass-morphism opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Now Section with Advanced 3D Cards */}
        <section className="py-24 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20" style={{ animation: 'slideInUp 0.8s ease-out 0.4s both' }}>
              <h2 className="text-4xl md:text-6xl font-extralight mb-6 tracking-wider">Trending Now</h2>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-8"></div>
              <p className="text-gray-600 font-light text-lg opacity-80">Most loved pieces this season</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {trendingProducts.map((item, index) => {
                const isInWishlist = wishlist.some((w) => w.productId === item.id);
                const wishlistItem = wishlist.find((w) => w.productId === item.id);

                return (
                  <div
                    key={item.id}
                    className="group perspective-card"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="card-3d relative bg-white rounded-3xl overflow-hidden shadow-xl hover-lift border border-gray-100">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-72 object-cover transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700"></div>
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={() => {
                            if (wishlistItem) {
                              removeFromWishlist(wishlistItem.id);
                            } else {
                              addToWishlist(item);
                            }
                          }}
                          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95"
                          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                          {isInWishlist ? (
                            <FaHeart className="text-red-500 text-lg transition-all duration-300" />
                          ) : (
                            <FaRegHeart className="text-gray-400 text-lg transition-all duration-300 hover:text-red-400" />
                          )}
                        </button>
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                      </div>

                      <div className="p-8">
                        <h3 className="text-xl font-light mb-3 text-gray-900 group-hover:text-black transition-colors duration-500 tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-2xl font-light text-gray-800 mb-8 tracking-wide">₹{item.price}</p>
                        
                        {/* Updated Add to Cart Button */}
                        <button
                          onClick={() => {
                            addToCart(item);
                            if (wishlistItem) {
                              removeFromWishlist(wishlistItem.id);
                            }
                          }}
                          className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-out hover:from-gray-800 hover:to-gray-700 hover:shadow-lg hover:shadow-gray-900/25 active:scale-[0.98] transform focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 relative overflow-hidden"
                        >
                          <span className="relative z-10">Add to Cart</span>
                          {/* Subtle shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        </button>
                      </div>

                      {/* 3D Card Shadow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" 
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

        {/* Footer Spacer with Gradient */}
        <div className="h-24 bg-gradient-to-t from-gray-200/50 to-white"></div>
      </div>
    </>
  );
};

export default Home;