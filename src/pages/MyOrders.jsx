


import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/orders?user=${user.email}`);
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sorted);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
        {/* Subtle background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative transform transition-all duration-700 hover:scale-105">
          <div className="text-center text-gray-700 text-lg px-8 py-12 max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-amber-100 hover:shadow-lg hover:bg-white transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="font-medium text-gray-800">Please log in to view your orders.</p>
          </div>
        </div>
      </div>
    </>
  );

  if (isLoading) return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
        {/* Elegant loading animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/50"></div>
        
        <div className="relative flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin"></div>
            <div className="absolute inset-2 h-12 w-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 animate-pulse"></div>
          </div>
          <div className="space-y-3 text-center">
            <div className="h-4 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 rounded-full w-48 animate-pulse"></div>
            <div className="h-3 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 rounded-full w-32 mx-auto animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Warm background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-gradient-to-r from-amber-100/30 to-orange-100/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 -right-32 w-96 h-96 bg-gradient-to-r from-orange-100/20 to-yellow-100/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 transform animate-fade-in-up">
            <div className="relative inline-block">
              <h2 className="text-4xl font-light text-gray-900 sm:text-5xl tracking-wide relative z-10">
                My Orders
              </h2>
              <p className="mt-3 text-gray-600 font-light">Your order history and tracking details</p>
            </div>
            <div className="mt-6 relative">
              <div className="h-0.5 w-24 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full transform hover:w-32 transition-all duration-500 ease-out"></div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20 transform animate-fade-in-up delay-300">
              <div className="relative inline-block group">
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-amber-100/50 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105 max-w-md mx-auto">
                  <div className="relative mx-auto h-20 w-20 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full"></div>
                    <svg
                      className="relative z-10 h-full w-full text-amber-500 transform hover:scale-110 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-3">No orders yet</h3>
                  <p className="text-gray-600 font-light leading-relaxed">Your elegant purchases will appear here when you discover our timeless pieces.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="group transform animate-fade-in-up hover:scale-[1.01] transition-all duration-500 ease-out"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="relative">
                    {/* Subtle glow on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur"></div>
                    
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-amber-200/50 hover:shadow-md transition-all duration-500">
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-8">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-3 rounded-lg group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300">
                                <svg
                                  className="h-5 w-5 text-amber-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                  />
                                </svg>
                              </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 tracking-wide">
                              Order #{order.id}
                            </h3>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className="inline-flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-50 group-hover:bg-amber-50 rounded-full border border-gray-200 group-hover:border-amber-200 transition-all duration-300">
                              {new Date(order.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div className="group/info">
                            <div className="p-5 rounded-lg bg-amber-50/50 group-hover/info:bg-amber-50 transition-all duration-300 border border-amber-100/50">
                              <p className="text-sm font-medium text-amber-700 mb-3 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Delivery Address
                              </p>
                              <p className="text-gray-800 font-light leading-relaxed">{order.address}</p>
                            </div>
                          </div>
                          <div className="group/info">
                            <div className="p-5 rounded-lg bg-orange-50/50 group-hover/info:bg-orange-50 transition-all duration-300 border border-orange-100/50">
                              <p className="text-sm font-medium text-orange-700 mb-3 flex items-center">
                                <svg className="w-4 h-4 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Payment Method
                              </p>
                              <p className="text-gray-800 font-light capitalize">
                                {order.paymentMethod}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-8">
                          <h4 className="text-sm font-medium text-gray-900 mb-6 tracking-wide uppercase">
                            Ordered Items
                          </h4>
                          <div className="bg-gray-50/70 rounded-xl p-6 border border-gray-100">
                            <ul className="divide-y divide-gray-200/60 space-y-4">
                              {order.items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="group/item pt-4 first:pt-0 pb-4 last:pb-0 flex items-start space-x-5 transition-all duration-300 hover:bg-white/80 hover:shadow-sm px-4 rounded-lg transform hover:scale-[1.01]"
                                >
                                  <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-18 h-18 object-cover transform group-hover/item:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 mb-2 group-hover/item:text-amber-700 transition-colors duration-300">
                                      {item.title}
                                    </p>
                                    <div className="flex items-center space-x-3">
                                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                                        Qty: {item.quantity}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-lg font-semibold text-gray-900 group-hover/item:text-amber-700 transition-colors duration-300">
                                      ₹{item.price}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded-full">
                                      ₹{(item.price / item.quantity).toFixed(2)} each
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200 flex justify-end">
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1 tracking-wide uppercase font-light">Order Total</p>
                            <p className="text-3xl font-light text-gray-900 tracking-wide">
                              ₹{order.total}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;

