import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // ✅ use cart context

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // ✅ use context method

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    await addToCart(product, quantity); // ✅ context call
    alert("Added to cart!");
    navigate("/cart"); // ✅ go to cart
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <img src={product.image} alt={product.title} className="w-60 h-60 my-4" />
      <p>₹{product.price}</p>

      <div className="mt-4 flex gap-4 items-center">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border px-2 py-1 w-20"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
