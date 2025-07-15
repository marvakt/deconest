

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Fetch product by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product", { autoClose: 5000 }));
  }, [id]);

  const handleAddToCart = async () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    toast.warn("Please login first.", { autoClose: 2000 });
    setTimeout(() => navigate("/login"), 2000);
    return;
  }

  await addToCart(product, quantity); // ✅ Call context
  toast.success("Added to cart!", { autoClose: 4000 }); // ✅ Show toast manually here

  setTimeout(() => {
    navigate("/cart");
  }, 4000); // ✅ Delay to let toast display

  //  toast.success("Added to cart!", {
  //   autoClose: 6000,
  //   onClose: () => navigate("/cart"),
  // });
};


  // const handleAddToCart = async () => {
  //   const user = JSON.parse(localStorage.getItem("loggedInUser"));
  //   if (!user) {
  //     toast.warn("Please login first.", { autoClose: 5000 });
  //     setTimeout(() => navigate("/login"), 2000); // delay redirect
  //     return;
  //   }

  //   await addToCart(product, quantity); // toast is shown inside context

  //   setTimeout(() => {
  //     navigate("/cart"); // delay navigation so user sees the toast
  //   }, 1800);
  // };

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-md h-64 object-cover rounded-md mb-4"
        />
        <p className="text-xl text-gray-700 mb-2">₹{product.price}</p>

        <div className="mt-4 flex gap-4 items-center">
          <label className="font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border px-3 py-1 w-24 rounded"
          />
        </div>

        <button 
          type="button"
          onClick={handleAddToCart}
          className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
