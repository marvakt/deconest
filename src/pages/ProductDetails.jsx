



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product", { autoClose: 2000 }));
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      toast.warn("Please login first.", { autoClose: 1000 });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (quantity > product.stock) {
      toast.error("Quantity exceeds available stock!", { autoClose: 1500 });
      return;
    }

    await addToCart(product, quantity);
    toast.success("Added to cart!", { autoClose: 1000 });

    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  if (!product) return <div className="p-6">Loading...</div>;

  const isOutOfStock = product.stock === 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start bg-white p-6 rounded-2xl shadow-lg">
          {/* IMAGE */}
          <div className="w-full">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-xl w-full h-auto object-cover shadow-md"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-lg">
              Room: <span className="italic">{product.room}</span>
            </p>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <p className="text-2xl text-pink-600 font-semibold">₹ {product.price}</p>

            <p className={`text-sm font-medium ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
              {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuantity(val > product.stock ? product.stock : val);
                }}
                disabled={isOutOfStock}
                className="border border-gray-300 rounded-lg px-3 py-1 w-20 text-center focus:outline-none shadow-sm"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`${
                isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              } text-white font-semibold px-6 py-2 rounded-xl shadow transition duration-300`}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
