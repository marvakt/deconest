import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const OrderSummary = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("access_token");
      let latestOrder = null;

      // Try fetching from backend first
      if (token) {
        try {
          const res = await axios.get(`${BASE_URL}/api/orders/latest/`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000, // 10 second timeout
          });
          latestOrder = res.data;
        } catch (err) {
          console.error("Backend fetch failed:", err);
          
          // Set specific error message
          if (err.code === 'ECONNABORTED') {
            setError("Connection timeout. Please check your internet connection.");
          } else if (err.response?.status === 404) {
            setError("No orders found.");
          } else if (err.response?.status === 401) {
            setError("Session expired. Please log in again.");
          }
        }
      }

      // Fallback to localStorage
      if (!latestOrder) {
        try {
          const localOrder = localStorage.getItem("latestOrder");
          if (localOrder) {
            latestOrder = JSON.parse(localOrder);
          }
        } catch (err) {
          console.error("Failed to parse localStorage order:", err);
        }
      }

      setOrder(latestOrder);
      setLoading(false);
    };

    fetchLatestOrder();
  }, []);

  // Handle image loading errors
  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  // Get properly formatted image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder.png";
    
    // If it's already a full URL, return it
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    
    // If it starts with /media/, prepend BASE_URL
    if (imageUrl.startsWith("/media/")) {
      return `${BASE_URL}${imageUrl}`;
    }
    
    // Otherwise, assume it's a relative path
    return `${BASE_URL}/media/${imageUrl}`;
  };

  // Calculate order totals
  const calculateTotals = (items) => {
    const subtotal = items.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + (price * quantity);
    }, 0);
    
    return {
      subtotal,
      shipping: 0, // Free shipping
      tax: 0,
      total: subtotal
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-amber-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="inline-block w-16 h-16 border-4 border-stone-300 border-t-stone-800 rounded-full animate-spin mb-4"></div>
            <p className="text-stone-600 text-lg font-medium">Loading your order...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or no order state
  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-amber-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md w-full animate-fade-in">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg 
                className="w-10 h-10 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-3">
              {error || "No Order Found"}
            </h2>
            <p className="text-stone-600 mb-6">
              {error 
                ? "There was an issue loading your order details." 
                : "We couldn't find any recent orders associated with your account."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const items = order.items || [];
  const totals = calculateTotals(items);
  const orderDate = new Date(order.date || order.created_at);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-amber-50">
      <Navbar />

      <div className="flex-grow px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-lg animate-bounce-gentle">
            <svg 
              className="w-10 h-10 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-stone-800 mb-3">
            Order Confirmed!
          </h1>
          <p className="text-stone-600 text-lg mb-2">
            Thank you for your purchase
          </p>
          <p className="text-stone-500 text-sm">
            Order #{order.id} • Placed on {orderDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="w-24 h-0.5 bg-stone-300 mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Order Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100 animate-slide-up">
            
            {/* Order Header */}
            <div className="bg-gradient-to-r from-stone-800 to-stone-700 p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light mb-2">Order Summary</h2>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1 bg-white/20 rounded-full">
                      {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </span>
                    <span className="px-3 py-1 bg-green-500/90 rounded-full font-medium">
                      {order.status || 'Confirmed'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-stone-200 text-sm mb-1">Total Amount</p>
                  <p className="text-3xl md:text-4xl font-light">
                    ₹{totals.total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                  <svg 
                    className="w-5 h-5 text-stone-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-800">Shipping Address</h3>
              </div>
              <div className="bg-gradient-to-r from-stone-50 to-amber-50 p-5 rounded-2xl border-2 border-stone-100 hover:border-stone-200 transition-colors duration-300">
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">
                  {order.address}
                </p>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="p-6 md:p-8 border-t border-stone-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                  <svg 
                    className="w-5 h-5 text-stone-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-800">Ordered Items</h3>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => {
                  const itemPrice = Number(item.price) || 0;
                  const itemQuantity = Number(item.quantity) || 0;
                  const itemTotal = itemPrice * itemQuantity;

                  return (
                    <div
                      key={item.id || index}
                      className="group bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-100 hover:border-stone-200 hover:bg-gradient-to-r hover:from-stone-100 hover:to-amber-50 transition-all duration-500 transform hover:scale-[1.01] animate-item-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-4 md:gap-6">
                        {/* Product Image */}
                        <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-stone-200">
                          {!imageErrors[item.id] ? (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title || "Product"}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={() => handleImageError(item.id)}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg 
                                className="w-8 h-8 text-stone-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                />
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow min-w-0">
                          <h4 className="font-semibold text-stone-800 text-base md:text-lg mb-2 group-hover:text-stone-900 transition-colors duration-300 truncate">
                            {item.title || "Product"}
                          </h4>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
                              <span className="flex items-center gap-1">
                                <span className="font-medium">Qty:</span> 
                                <span className="px-2 py-0.5 bg-stone-200 rounded-md font-semibold">
                                  {itemQuantity}
                                </span>
                              </span>
                              <span className="hidden sm:inline text-stone-300">|</span>
                              <span>
                                <span className="font-medium">Price:</span> ₹{itemPrice.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <div className="text-left sm:text-right">
                              <p className="text-stone-500 text-xs mb-1">Subtotal</p>
                              <p className="font-bold text-stone-800 text-lg">
                                ₹{itemTotal.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Total */}
            <div className="p-6 md:p-8 border-t border-stone-200">
              <div className="max-w-md ml-auto bg-gradient-to-r from-stone-800 to-stone-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-200">Subtotal</span>
                    <span className="font-medium">₹{totals.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-200">Shipping</span>
                    <span className="font-medium text-green-300">Free</span>
                  </div>
                  <div className="border-t border-stone-600 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-light">Total</span>
                      <span className="text-2xl md:text-3xl font-semibold">
                        ₹{totals.total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 md:p-8 border-t border-stone-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                  <svg 
                    className="w-5 h-5 text-stone-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-800">Payment Method</h3>
              </div>
              <div className="bg-green-50 p-5 rounded-2xl border-2 border-green-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg 
                      className="w-4 h-4 text-green-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <span className="text-green-800 font-semibold">
                    {order.payment_method === 'COD' ? 'Cash on Delivery' : order.payment_method || 'Cash on Delivery'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-6 md:p-8 text-center bg-stone-50">
              <button
                onClick={() => navigate("/")}
                className="group bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-stone-400/50"
              >
                <div className="flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                  Continue Shopping
                </div>
              </button>
            </div>
          </div>

          {/* Success Message */}
          <div className="mt-8 p-6 bg-green-50 rounded-2xl border-2 border-green-200 animate-fade-in-delayed shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg 
                  className="w-8 h-8 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-green-900 mb-1">
                  Your order has been successfully placed!
                </p>
                <p className="text-sm text-green-700">
                  You will receive a confirmation call shortly. Track your order status in the "My Orders" section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-gentle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes item-fade-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
        
        .animate-item-fade-in {
          animation: item-fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;