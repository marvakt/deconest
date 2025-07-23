

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
      navigate("/order-summary");
    } catch (error) {
      console.error("Order failed:", error);
      setError("Something went wrong while placing your order.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-wider">DecoNest</h1>
          <nav className="flex space-x-8">
            <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Home</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Products</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">My Orders</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-2">Complete Your Order</h2>
          <div className="w-16 h-px bg-gray-200 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 border border-gray-100 rounded-none shadow-sm">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-400">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <h3 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-100">Shipping Information</h3>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Shipping Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gray-900 transition-colors duration-300 placeholder-gray-400"
                  placeholder="Enter your full shipping address"
                  rows={4}
                />
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-100">Payment Method</h3>
              
              <div className="p-4 border border-gray-200 flex items-center">
                <div className="mr-4">
                  <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                  </div>
                </div>
                <span className="text-gray-700">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 border border-gray-100 rounded-none shadow-sm sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-100">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-start border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 bg-gray-50 mr-4 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 mb-1">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm text-gray-900">Free</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className={`w-full py-3 px-4 border border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300 ${
                  isProcessing ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;