import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleConfirmOrder = async () => {
    if (isProcessing) return;

    if (!address || cart.length === 0) {
      setError("Please provide an address and ensure your cart is not empty.");
      return;
    }

    setError(""); 
    setIsProcessing(true);

    const orderData = {
      user: user.email,
      items: cart,
      total,
      address,
      paymentMethod: "cod",
      date: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3000/orders", orderData);
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      clearCart();

     
      navigate("/order-summary");bbbbbbbbbbbbbbbbbbj

    } catch (error) {
      console.error("Order failed:", error);
      setError("Something went wrong while placing your order.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-2">Shipping Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Enter your full address"
          rows={3}
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">Order Summary:</h3>
      <ul className="mb-4 space-y-2">
        {cart.map((item, index) => (
          <li key={index} className="flex items-center gap-4 border p-2 rounded">
            <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="font-bold text-lg mb-4">Total: ₹{total}</p>

      <button
        onClick={handleConfirmOrder}
        disabled={isProcessing}
        className={`px-6 py-2 rounded-md text-white transition 
          ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
      >
        {isProcessing ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
};

export default Checkout;
