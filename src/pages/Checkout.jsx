import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // ✅ Calculate total directly

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleConfirmOrder = async () => {
    if (!address || cart.length === 0 || !user) {
      alert("Please provide a valid address and ensure your cart is not empty.");
      return;
    }

    const orderData = {
      user: user.email,
      items: cart,
      total,
      address,
      paymentMethod: "cod",
      date: new Date().toISOString()
    };

    try {
      await axios.post("http://localhost:3000/orders", orderData);
      localStorage.setItem("latestOrder", JSON.stringify(orderData)); // ✅ Save for order summary
      clearCart();
      navigate("/order-summary"); // ✅ Navigate
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Something went wrong while placing your order.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <label className="block font-medium mb-2">Shipping Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Enter your full address"
          rows={3}
        ></textarea>
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
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
