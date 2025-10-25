

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-hot-toast";

// const BASE_URL = "http://127.0.0.1:8000"; // Match your backend URL

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageErrors, setImageErrors] = useState({}); // Track failed image loads
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
//   const [token, setToken] = useState(() => localStorage.getItem("access_token"));

//   const navigate = useNavigate();

//   // Helper function to get proper image URL
//   const getImageUrl = (imageUrl) => {
//     if (!imageUrl) return "/placeholder.png";

//     if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
//       return imageUrl;
//     }
//     if (imageUrl.startsWith("/media/")) return `${BASE_URL}${imageUrl}`;
//     if (imageUrl.startsWith("media/")) return `${BASE_URL}/${imageUrl}`;
//     return `${BASE_URL}/media/${imageUrl}`;
//   };

//   // Handle image loading errors
//   const handleImageError = (itemId) => {
//     setImageErrors((prev) => ({ ...prev, [itemId]: true }));
//   };

//   useEffect(() => {
//     if (!user || !token) {
//       setIsLoading(false);
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const res = await axiosInstance.get("orders/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         toast.error("Failed to fetch orders. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user, token]);

//   // Not logged in
//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
//           <div className="text-center bg-white/90 backdrop-blur-sm px-10 py-12 rounded-xl shadow-md border border-amber-100 animate-fade-in">
//             <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <p className="font-medium text-gray-800 mb-4 text-lg">Please log in to view your orders</p>
//             <button
//               onClick={() => navigate("/login")}
//               className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   // Loading state
//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
//           <div className="text-center">
//             <div className="h-16 w-16 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin mx-auto"></div>
//             <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-[80vh] bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         {/* Background decoration */}
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-5xl mx-auto relative z-10">
//           {/* Page Header */}
//           <div className="text-center mb-12 animate-fade-in">
//             <h2 className="text-4xl font-light text-gray-900 sm:text-5xl mb-2">My Orders</h2>
//             <p className="mt-3 text-gray-600 font-light">Your order history and tracking details</p>
//             {orders.length > 0 && (
//               <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-amber-200">
//                 <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//                 <span className="text-sm font-medium text-gray-700">
//                   {orders.length} {orders.length === 1 ? "Order" : "Orders"}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Empty State */}
//           {orders.length === 0 ? (
//             <div className="text-center py-20 animate-fade-in">
//               <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
//                 <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-light text-gray-900 mb-3">No orders yet</h3>
//               <p className="text-gray-600 font-light mb-6">Your purchases will appear here once you place an order.</p>
//               <button
//                 onClick={() => navigate("/")}
//                 className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
//               >
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {orders.map((order, orderIndex) => (
//                 <div
//                   key={order.id}
//                   className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 p-6 sm:p-8 animate-slide-up"
//                   style={{ animationDelay: `${orderIndex * 0.1}s` }}
//                 >
//                   {/* Order Header */}
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 pb-4 border-b border-gray-200">
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-1">Order #{order.id}</h3>
//                       <span className="text-sm text-gray-500">
//                         {new Date(order.date || order.created_at).toLocaleDateString("en-IN", {
//                           day: "numeric",
//                           month: "long",
//                           year: "numeric",
//                         })}
//                       </span>
//                     </div>
//                     <div className="mt-3 sm:mt-0">
//                       <span
//                         className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
//                           order.status === "delivered"
//                             ? "bg-green-100 text-green-800"
//                             : order.status === "processing"
//                             ? "bg-blue-100 text-blue-800"
//                             : order.status === "cancelled"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-amber-100 text-amber-800"
//                         }`}
//                       >
//                         {order.status || "Confirmed"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Address & Payment */}
//                   <div className="mb-6 grid sm:grid-cols-2 gap-4">
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <div className="flex items-start">
//                         <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <div>
//                           <p className="text-xs text-gray-500 font-medium mb-1">Shipping Address</p>
//                           <p className="text-sm text-gray-700">{order.address}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <div className="flex items-start">
//                         <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//                         </svg>
//                         <div>
//                           <p className="text-xs text-gray-500 font-medium mb-1">Payment Method</p>
//                           <p className="text-sm text-gray-700 capitalize">{order.payment_method}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Ordered Items */}
//                   <div className="bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-xl p-5 border border-gray-100 mb-4">
//                     <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Order Items ({order.items?.length || 0})
//                     </h4>
//                     <div className="space-y-3">
//                       {order.items?.map((item, itemIndex) => (
//                         <div
//                           key={item.id || itemIndex}
//                           className="group flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-center space-x-4 flex-1">
//                             {/* Product Image */}
//                             <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//                               {!imageErrors[item.id] ? (
//                                 <img
//                                   src={getImageUrl(item.image)}
//                                   alt={item.title || "Product"}
//                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                                   onError={() => handleImageError(item.id)}
//                                   loading="lazy"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center bg-gray-200">
//                                   <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                   </svg>
//                                 </div>
//                               )}
//                             </div>

//                             {/* Product Details */}
//                             <div className="flex-1 min-w-0">
//                               <p className="text-gray-900 text-sm sm:text-base font-semibold mb-1 truncate group-hover:text-amber-700 transition-colors">
//                                 {item.title}
//                               </p>
//                               <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500">
//                                 <span className="flex items-center">
//                                   <span className="font-medium">Qty:</span>
//                                   <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-md font-semibold text-gray-700">
//                                     {item.quantity}
//                                   </span>
//                                 </span>
//                                 <span className="text-gray-300">•</span>
//                                 <span>₹{Number(item.price).toLocaleString("en-IN")}</span>
//                               </div>
//                               {item.product_id && (
//                                 <button
//                                   onClick={() => navigate(`/productDetails/${item.product_id}`)}
//                                   className="text-amber-600 hover:text-amber-800 text-xs font-medium mt-2 inline-flex items-center group-hover:underline"
//                                 >
//                                   View Details
//                                   <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                   </svg>
//                                 </button>
//                               )}
//                             </div>
//                           </div>

//                           {/* Item Total */}
//                           <div className="text-right ml-4">
//                             <p className="text-sm sm:text-base font-bold text-gray-900">
//                               ₹{(Number(item.price) * Number(item.quantity)).toLocaleString("en-IN")}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Order Total */}
//                   <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//                     <span className="text-gray-600 font-medium">Order Total</span>
//                     <span className="text-2xl sm:text-3xl font-light text-gray-900">
//                       ₹{Number(order.total).toLocaleString("en-IN")}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in { animation: fade-in 0.6s ease-out; }
//         .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
//       `}</style>
//     </>
//   );
// };

// export default MyOrders




import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const BASE_URL = "http://127.0.0.1:8000";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  
  // ✅ FIXED: Use consistent localStorage keys with AuthContext
  const [user] = useState(() => JSON.parse(localStorage.getItem("loggedInUser")));
  const [token] = useState(() => localStorage.getItem("access_token"));

  const navigate = useNavigate();
  const location = useLocation();

  // Helper to build image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder.png";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
    if (imageUrl.startsWith("/media/")) return `${BASE_URL}${imageUrl}`;
    if (imageUrl.startsWith("media/")) return `${BASE_URL}/${imageUrl}`;
    return `${BASE_URL}/media/${imageUrl}`;
  };

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  useEffect(() => {
    if (!user || !token) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        // ✅ This will now send the correct authentication token
        const res = await axiosInstance.get("orders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("Fetched orders:", res.data); // Debug log
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        
        // ✅ Better error handling
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.clear();
          navigate("/login");
        } else {
          toast.error("Failed to fetch orders. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();

    // Refresh if coming from checkout
    if (new URLSearchParams(location.search).get("refresh")) {
      fetchOrders();
    }
  }, [user, token, location.search, navigate]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
          <div className="text-center bg-white/90 backdrop-blur-sm px-10 py-12 rounded-xl shadow-md border border-amber-100 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="font-medium text-gray-800 mb-4 text-lg">Please log in to view your orders</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
            >
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
          </div>
        </div>
      
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-light text-gray-900 sm:text-5xl mb-2">My Orders</h2>
            <p className="mt-3 text-gray-600 font-light">Your order history and tracking details</p>
            {orders.length > 0 && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-amber-200">
                <span className="text-sm font-medium text-gray-700">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </span>
              </div>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <h3 className="text-2xl font-light text-gray-900 mb-3">No orders yet</h3>
              <p className="text-gray-600 font-light mb-6">Your purchases will appear here once you place an order.</p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, idx) => (
                <div
                  key={order.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 p-6 sm:p-8 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium text-gray-800 mb-2">Order #{order.id}</p>
                      <p className="text-sm text-gray-600 mb-1">Status: <span className="font-semibold text-amber-600">{order.status}</span></p>
                      <p className="text-sm text-gray-600 mb-1">Payment: {order.payment_method}</p>
                      <p className="text-xs text-gray-500">Placed on: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">₹{order.total}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 pb-3 last:pb-0">
                        <img
                          src={imageErrors[item.id] ? "/placeholder.png" : getImageUrl(item.image)}
                          onError={() => handleImageError(item.id)}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.title}</p>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>Qty: {item.quantity}</span>
                            <span>₹{item.price} each</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
     
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.6s ease-out; }
            .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
          `,
        }}
      />
    </>
  );
};

export default MyOrders;