



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const BASE_URL = "http://127.0.0.1:8000/api/";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user || !token) {
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(`${BASE_URL}orders/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user, token]);

//   if (!user)
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
//           <div className="text-center bg-white/90 backdrop-blur-sm px-10 py-12 rounded-xl shadow-md border border-amber-100">
//             <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//             </div>
//             <p className="font-medium text-gray-800">
//               Please log in to view your orders.
//             </p>
//           </div>
//         </div>
//       </>
//     );

//   if (isLoading)
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
//           <div className="h-16 w-16 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin"></div>
//         </div>
//       </>
//     );

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-[80vh] bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         <div className="max-w-4xl mx-auto relative z-10">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-light text-gray-900 sm:text-5xl">
//               My Orders
//             </h2>
//             <p className="mt-3 text-gray-600 font-light">
//               Your order history and tracking details
//             </p>
//           </div>

//           {orders.length === 0 ? (
//             <div className="text-center py-20">
//               <h3 className="text-xl font-light text-gray-900 mb-3">
//                 No orders yet
//               </h3>
//               <p className="text-gray-600 font-light">
//                 Your purchases will appear here once you place an order.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {orders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 transition-all duration-300 p-6 sm:p-8"
//                 >
//                   <div className="flex flex-col sm:flex-row sm:justify-between mb-6">
//                     <h3 className="text-lg font-medium text-gray-900">
//                       Order #{order.id}
//                     </h3>
//                     <span className="text-sm text-gray-600">
//                       {new Date(order.created_at).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>

//                   <div className="mb-6">
//                     <p className="text-sm text-gray-700 mb-1">
//                       <strong>Address:</strong> {order.address}
//                     </p>
//                     <p className="text-sm text-gray-700 mb-1 capitalize">
//                       <strong>Payment:</strong> {order.payment_method}
//                     </p>
//                   </div>

//                   {order.items && order.items.length > 0 && (
//                     <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
//                       {order.items.map((item, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <img
//                               src={item.product.image}
//                               alt={item.product.title}
//                               className="w-14 h-14 object-cover rounded-md"
//                             />
//                             <div>
//                               <p className="text-gray-800 text-sm font-medium">
//                                 {item.product.title}
//                               </p>
//                               <p className="text-gray-500 text-xs">
//                                 Qty: {item.quantity}
//                               </p>
//                             </div>
//                           </div>
//                           <p className="text-gray-800 font-medium">
//                             ₹{item.product.price}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="text-right mt-4">
//                     <p className="text-sm text-gray-500">Total</p>
//                     <p className="text-2xl font-light text-gray-900">
//                       ₹{order.total}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyOrders;



import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");

useEffect(() => {
  const fetchOrders = async () => {
    if (!user || !token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get("orders/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // <-- empty array ensures it runs only once


  if (!user)
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
          <div className="text-center bg-white/90 backdrop-blur-sm px-10 py-12 rounded-xl shadow-md border border-amber-100">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-800">
              Please log in to view your orders.
            </p>
          </div>
        </div>
      </>
    );

  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
          <div className="h-16 w-16 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin"></div>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 sm:text-5xl">
              My Orders
            </h2>
            <p className="mt-3 text-gray-600 font-light">
              Your order history and tracking details
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-light text-gray-900 mb-3">
                No orders yet
              </h3>
              <p className="text-gray-600 font-light">
                Your purchases will appear here once you place an order.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 transition-all duration-300 p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{order.id}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Address:</strong> {order.address}
                    </p>
                    <p className="text-sm text-gray-700 mb-1 capitalize">
                      <strong>Payment:</strong> {order.payment_method}
                    </p>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-14 object-cover rounded-md"
                            />
                            <div>
                              <p className="text-gray-800 text-sm font-medium">
                                {item.title}
                              </p>
                              <p className="text-gray-500 text-xs">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-800 font-medium">₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-right mt-4">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-light text-gray-900">
                      ₹{order.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
