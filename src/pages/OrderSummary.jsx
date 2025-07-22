




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderSummary = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
    setOrder(latestOrder);
  }, []);

  if (!order) {
    return (
      <div className="bg-gradient-to-br from-stone-50 to-amber-50 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl animate-fade-in">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-stone-600 text-lg">No recent order found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-stone-50 to-amber-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-lg animate-bounce-gentle">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-light text-stone-800 mb-3">Order Confirmed!</h1>
          <p className="text-stone-600 text-lg mb-4">Thank you for your purchase</p>
          <div className="w-24 h-0.5 bg-stone-300 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100 animate-slide-up">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-stone-800 to-stone-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light mb-2">Order Summary</h2>
                  <p className="text-stone-200 text-sm">
                    Order Date: {new Date(order.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-stone-200 text-sm">Total Amount</p>
                  <p className="text-3xl font-light">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Shipping Details */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-stone-800">Shipping Address</h3>
                </div>
                <div className="bg-gradient-to-r from-stone-50 to-amber-50 p-4 rounded-2xl border-2 border-stone-100 hover:border-stone-200 transition-colors duration-300">
                  <p className="text-stone-700 leading-relaxed">{order.address}</p>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-stone-800">Ordered Items</h3>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div 
                      key={index} 
                      className="group bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-stone-200 hover:bg-gradient-to-r hover:from-stone-100 hover:to-amber-50 transition-all duration-500 transform hover:scale-[1.01] animate-item-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-6">
                        <div className="relative overflow-hidden rounded-xl flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className="font-semibold text-stone-800 text-lg mb-2 group-hover:text-stone-900 transition-colors duration-300">
                            {item.title}
                          </h4>
                          {item.description && (
                            <p className="text-stone-600 text-sm mb-3 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center text-stone-600">
                                <span className="text-sm mr-4">
                                  <span className="font-medium">Qty:</span> {item.quantity}
                                </span>
                                <span className="text-sm">
                                  <span className="font-medium">Price:</span> ₹{item.price.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-stone-500 text-xs">Subtotal</p>
                              <p className="font-bold text-stone-800 text-lg">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-stone-200 pt-6 mb-8">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-stone-800 to-stone-700 rounded-2xl p-6 text-white min-w-80">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-200">Subtotal</span>
                        <span className="font-medium">₹{order.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-200">Shipping</span>
                        <span className="font-medium">Free</span>
                      </div>
                      <div className="border-t border-stone-600 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-light">Total</span>
                          <span className="text-2xl font-semibold">₹{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-stone-800">Payment Method</h3>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-200">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-green-800 font-medium">Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-8 animate-fade-in-delayed">
            <button
              onClick={() => navigate("/")}
              className="group bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-stone-300"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Continue Shopping
              </div>
            </button>
          </div>

          {/* Success Message */}
          <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200 animate-fade-in-delayed">
            <div className="text-center text-green-800">
              <svg className="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">Your order has been successfully placed!</p>
              <p className="text-sm text-green-600 mt-1">You will receive a confirmation call shortly.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Styles */}
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;