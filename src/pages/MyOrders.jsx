


// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-hot-toast";

// const BASE_URL = "http://127.0.0.1:8000";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageErrors, setImageErrors] = useState({});
  
//   // ✅ FIXED: Use consistent localStorage keys with AuthContext
//   const [user] = useState(() => JSON.parse(localStorage.getItem("loggedInUser")));
//   const [token] = useState(() => localStorage.getItem("access_token"));

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Helper to build image URL
//   const getImageUrl = (imageUrl) => {
//     if (!imageUrl) return "/placeholder.png";
//     if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
//     if (imageUrl.startsWith("/media/")) return `${BASE_URL}${imageUrl}`;
//     if (imageUrl.startsWith("media/")) return `${BASE_URL}/${imageUrl}`;
//     return `${BASE_URL}/media/${imageUrl}`;
//   };

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
//         // ✅ This will now send the correct authentication token
//         const res = await axiosInstance.get("orders/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
        
//         console.log("Fetched orders:", res.data); // Debug log
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
        
//         // ✅ Better error handling
//         if (err.response?.status === 401) {
//           toast.error("Session expired. Please login again.");
//           localStorage.clear();
//           navigate("/login");
//         } else {
//           toast.error("Failed to fetch orders. Please try again.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();

//     // Refresh if coming from checkout
//     if (new URLSearchParams(location.search).get("refresh")) {
//       fetchOrders();
//     }
//   }, [user, token, location.search, navigate]);

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
      
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-[80vh] bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         {/* Background */}
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-5xl mx-auto relative z-10">
//           {/* Header */}
//           <div className="text-center mb-12 animate-fade-in">
//             <h2 className="text-4xl font-light text-gray-900 sm:text-5xl mb-2">My Orders</h2>
//             <p className="mt-3 text-gray-600 font-light">Your order history and tracking details</p>
//             {orders.length > 0 && (
//               <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-amber-200">
//                 <span className="text-sm font-medium text-gray-700">
//                   {orders.length} {orders.length === 1 ? "Order" : "Orders"}
//                 </span>
//               </div>
//             )}
//           </div>

//           {orders.length === 0 ? (
//             <div className="text-center py-20 animate-fade-in">
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
//               {orders.map((order, idx) => (
//                 <div
//                   key={order.id}
//                   className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 p-6 sm:p-8 animate-slide-up"
//                   style={{ animationDelay: `${idx * 0.1}s` }}
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <p className="font-medium text-gray-800 mb-2">Order #{order.id}</p>
//                       <p className="text-sm text-gray-600 mb-1">Status: <span className="font-semibold text-amber-600">{order.status}</span></p>
//                       <p className="text-sm text-gray-600 mb-1">Payment: {order.payment_method}</p>
//                       <p className="text-xs text-gray-500">Placed on: {new Date(order.date).toLocaleDateString()}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-2xl font-bold text-gray-900">₹{order.total}</p>
//                     </div>
//                   </div>
                  
//                   <div className="border-t pt-4 space-y-3">
//                     {order.items.map((item) => (
//                       <div key={item.id} className="flex items-center gap-4 pb-3 last:pb-0">
//                         <img
//                           src={imageErrors[item.id] ? "/placeholder.png" : getImageUrl(item.image)}
//                           onError={() => handleImageError(item.id)}
//                           alt={item.title}
//                           className="w-16 h-16 object-cover rounded-lg border border-gray-200"
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800">{item.title}</p>
//                           <div className="flex gap-4 text-sm text-gray-600 mt-1">
//                             <span>Qty: {item.quantity}</span>
//                             <span>₹{item.price} each</span>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
     
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//             @keyframes fade-in {
//               from { opacity: 0; transform: translateY(20px); }
//               to { opacity: 1; transform: translateY(0); }
//             }
//             @keyframes slide-up {
//               from { opacity: 0; transform: translateY(30px); }
//               to { opacity: 1; transform: translateY(0); }
//             }
//             .animate-fade-in { animation: fade-in 0.6s ease-out; }
//             .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
//           `,
//         }}
//       />
//     </>
//   );
// };

// export default MyOrders;






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
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="text-center bg-white px-10 py-12 rounded-2xl shadow-xl border border-gray-200 animate-fade-in">
            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-800 mb-4 text-lg">Please log in to view your orders</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-black animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-2">My Orders</h2>
            <p className="mt-3 text-gray-600">Your order history and tracking details</p>
            {orders.length > 0 && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-white backdrop-blur-sm rounded-full border border-gray-300 shadow-sm">
                <span className="text-sm font-medium text-gray-700">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </span>
              </div>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h3>
              <p className="text-gray-600 mb-6">Your purchases will appear here once you place an order.</p>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, idx) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300 p-6 sm:p-8 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <p className="text-lg font-bold text-gray-900">Order #{order.id}</p>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium text-gray-700">Payment:</span> {order.payment_method}</p>
                        <p><span className="font-medium text-gray-700">Placed on:</span> {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-gray-900">₹{order.total}</p>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item, itemIdx) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center gap-4 pb-4 ${itemIdx !== order.items.length - 1 ? 'border-b border-gray-100' : ''}`}
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={imageErrors[item.id] ? "/placeholder.png" : getImageUrl(item.image)}
                            onError={() => handleImageError(item.id)}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 mb-1 truncate">{item.title}</p>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <span className="font-medium text-gray-700">Qty:</span> 
                              <span className="ml-1">{item.quantity}</span>
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium text-gray-700">Price:</span> 
                              <span className="ml-1">₹{item.price}</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                          <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
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
      <Footer />
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