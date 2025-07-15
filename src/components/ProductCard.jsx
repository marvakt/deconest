import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWishlist } from "../context/WishlistContext"; // ✅ use context

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // ✅ use context

  // Check if already wishlisted
  useEffect(() => {
    const found = wishlist.find((item) => item.id === product.id);
    setIsWishlisted(!!found);
  }, [wishlist, product.id]);

  const toggleWishlist = () => {
    if (isWishlisted) {
      const found = wishlist.find((item) => item.id === product.id);
      if (found) removeFromWishlist(found.wid); // use wid to remove from server
    } else {
      addToWishlist(product); // add via context
    }
  };

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) {
        alert("Please login first.");
        return;
      }

      const res = await axios.get(`http://localhost:3000/cart?userId=${user.id}&productId=${product.id}`);
      if (res.data.length > 0) {
        const existingItem = res.data[0];
        await axios.patch(`http://localhost:3000/cart/${existingItem.id}`, {
          quantity: existingItem.quantity + 1,
        });
        alert("Quantity updated in cart!");
      } else {
        const newItem = {
          ...product,
          productId: product.id,
          userId: user.id,
          quantity: 1,
        };
        await axios.post("http://localhost:3000/cart", newItem);
        alert("Added to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition relative">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />

      {/* Wishlist heart */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 text-xl"
        title="Add to Wishlist"
      >
        {isWishlisted ? (
          <span className="text-red-500">♥</span>
        ) : (
          <span className="text-gray-400 hover:text-red-500">♡</span>
        )}
      </button>

      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-4 py-1 rounded text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
