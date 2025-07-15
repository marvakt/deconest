// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Home = () => {
//   const navigate = useNavigate();

//   const shopByRoom = [
//     {
//       name: "Bedroom",
//       image: "https://images.unsplash.com/photo-1600585152917-5c6e3d30575a?auto=format&fit=crop&w=600&q=80",
//     },
//     {
//       name: "Living Room",
//       image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
//     },
//     {
//       name: "Kitchen",
//       image: "https://images.unsplash.com/photo-1598300055014-e9d4543dfb6d?auto=format&fit=crop&w=600&q=80",
//     },
//   ];

//   const inspirationRooms = [
//     {
//       name: "Modern Living",
//       image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
//     },
//     {
//       name: "Cozy Bedroom",
//       image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=900&q=80",
//     },
//     {
//       name: "Natural Kitchen",
//       image: "https://images.unsplash.com/photo-1615874959474-d607a0177ac5?auto=format&fit=crop&w=900&q=80",
//     },
//   ];

//   const trendingProducts = [
//     {
//       id: 1,
//       title: "Boho Vase",
//       price: "$25",
//       image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80",
//     },
//     {
//       id: 2,
//       title: "Minimalist Lamp",
//       price: "$40",
//       image: "https://images.unsplash.com/photo-1560185127-6ed189bf1365?auto=format&fit=crop&w=600&q=80",
//     },
//     {
//       id: 3,
//       title: "Wooden Mirror",
//       price: "$55",
//       image: "https://images.unsplash.com/photo-1600585152917-5c6e3d30575a?auto=format&fit=crop&w=600&q=80",
//     },
//   ];

//   return (
//     <div className="bg-white text-black">
//       <Navbar />

//       {/* Hero */}
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

//       {/* Shop by Room */}
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

//       {/* Inspire Your Space */}
//       <section className="py-12 px-6 bg-gray-50">
//         <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Inspire Your Space</h2>
//         <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
//           {inspirationRooms.map((look) => (
//             <div key={look.name} className="min-w-[280px] relative rounded-lg overflow-hidden">
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

//       {/* Trending Now */}
//       <section className="py-12 px-6">
//         <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Trending Now</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {trendingProducts.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-lg p-4 hover:shadow-md transition group relative"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <div className="mt-3">
//                 <h3 className="text-lg font-medium">{item.title}</h3>
//                 <p className="text-sm text-gray-600">{item.price}</p>
//               </div>
//               <button
//                 className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
//                 title="Add to Wishlist"
//               >
//                 ♥
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Home;



import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const shopByRoom = [
    {
      name: "Bedroom",
      image: "https://images.unsplash.com/photo-1600585152917-5c6e3d30575a?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Living Room",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Kitchen",
      image: "https://images.unsplash.com/photo-1598300055014-e9d4543dfb6d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const inspirationRooms = [
    {
      name: "Modern Living",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Cozy Bedroom",
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Natural Kitchen",
      image: "https://images.unsplash.com/photo-1615874959474-d607a0177ac5?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      title: "Boho Vase",
      price: "$25",
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Minimalist Lamp",
      price: "$40",
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf1365?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Wooden Mirror",
      price: "$55",
      image: "https://images.unsplash.com/photo-1600585152917-5c6e3d30575a?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="bg-white text-black">
      <Navbar />

      {/* Hero */}
      <section className="text-center py-16 bg-gradient-to-b from-gray-100 to-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Minimal Elegance</h1>
        <p className="text-lg text-gray-600 mb-6">Timeless pieces for your favorite spaces</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Shop Now
        </button>
      </section>

      {/* Shop by Room */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Shop by Room</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {shopByRoom.map((room) => (
            <div
              key={room.name}
              onClick={() => navigate(`/products?room=${room.name.toLowerCase()}`)}
              className="cursor-pointer hover:scale-105 transition transform"
            >
              <img src={room.image} alt={room.name} className="rounded-lg w-full h-56 object-cover" />
              <p className="mt-3 text-center font-medium text-lg">{room.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inspire Your Space */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Inspire Your Space</h2>
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {inspirationRooms.map((look) => (
            <div key={look.name} className="min-w-[280px] relative rounded-lg overflow-hidden">
              <img
                src={look.image}
                alt={look.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full text-center py-2 text-sm font-semibold">
                {look.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center uppercase">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trendingProducts.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-md transition group relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-3">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.price}</p>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
                title="Add to Wishlist"
              >
                ♥
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
