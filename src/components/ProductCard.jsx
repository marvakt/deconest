


import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();


  const isInWishlist = wishlist.some((item) => item.productId === product.id);

 
  const toggleWishlist = () => {
    if (isInWishlist) {
      const item = wishlist.find((item) => item.productId === product.id);
      if (item) {
        removeFromWishlist(item.id);
      }
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition duration-200 bg-white relative">
     
    
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 text-xl"
        title="Wishlist"
      >
        {isInWishlist ? "❤️" : "🤍"}
      </button>

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover mb-4 rounded"
        onClick={() => navigate(`/productDetails/${product.id}`)}
      />

      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
