

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Home = () => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

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
      price: "$25",
      image: "https://i.pinimg.com/1200x/13/30/bd/1330bdb20828ee93466a0a437cd2da30.jpg",
    },
    {
      id: 2,
      title: "Rattan Wall Mirror",
      price: "$40",
      image: "https://i.pinimg.com/1200x/70/1d/7d/701d7d1a9305b00b7b43a65154b8aedb.jpg",
    },
    {
      id: 3,
      title: "Linen Throw Pillows",
      price: "$55",
      image: "https://i.pinimg.com/736x/bd/76/74/bd7674f2252526a09f99989ec9a29761.jpg",
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
            <div
              key={look.name}
              className="min-w-[280px] relative rounded-lg overflow-hidden"
            >
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
          {trendingProducts.map((item) => {
            const isInWishlist = wishlist.some((w) => w.productId === item.id);
            const wishlistItem = wishlist.find((w) => w.productId === item.id);

            return (
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

                {/* ❤️ Wishlist Toggle Button */}
                <button
                  onClick={() => {
                    if (wishlistItem) {
                      removeFromWishlist(wishlistItem.id);
                    } else {
                      addToWishlist(item);
                    }
                  }}
                  className={`absolute top-2 right-2 text-xl transition ${
                    isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
                  }`}
                  title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  ♥
                </button>

                {/* 🛒 Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(item);
                    if (wishlistItem) {
                      removeFromWishlist(wishlistItem.id);
                    }
                  }}
                  className="mt-3 bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;



