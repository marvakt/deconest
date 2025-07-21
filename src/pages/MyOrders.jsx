// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";


// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;

//       try {
//         const res = await axios.get(`http://localhost:3000/orders?user=${user.email}`);
//         const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//         setOrders(sorted);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   if (!user) return (
//     <>
//       <Navbar />
//       <p className="text-center mt-8">Please log in to view your orders.</p>
//     </>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">
//         <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
//         {orders.length === 0 ? (
//           <p className="text-center">You have no past orders.</p>
//         ) : (
//           orders.map((order) => (
//             <div key={order.id} className="border rounded p-4 mb-4">
//               <p><strong>Order ID:</strong> {order.id}</p>
//               <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
//               <p><strong>Total:</strong> ₹{order.total}</p>
//               <p><strong>Address:</strong> {order.address}</p>
//               <p><strong>Payment:</strong> {order.paymentMethod}</p>
//               <h4 className="mt-2 font-semibold">Items:</h4>
//               <ul className="mt-1 space-y-2">
//                 {order.items.map((item, idx) => (
//                   <li key={idx} className="flex gap-4 items-center">
//                     <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
//                     <div>
//                       <p>{item.title}</p>
//                       <p>Quantity: {item.quantity}</p>
//                       <p>Price: ₹{item.price}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}
//       </div>
   
//     </>
//   );
// };

// export default MyOrders;



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
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-center text-gray-600 text-lg px-4 py-8 max-w-md mx-auto bg-white rounded-xl shadow-sm">
          Please log in to view your orders.
        </p>
      </div>
    </>
  );

  if (isLoading) return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 sm:text-4xl">
              My Orders
            </h2>
            <div className="mt-2 h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-gray-500">Your order history will appear here.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="h-5 w-5 text-indigo-500"
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
                        <h3 className="text-lg font-medium text-gray-900">
                          Order #{order.id}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Delivery Address</p>
                        <p className="mt-1 text-gray-900">{order.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="mt-1 text-gray-900 capitalize">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Ordered Items
                      </h4>
                      <ul className="divide-y divide-gray-200">
                        {order.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="py-4 flex items-start space-x-4 transition-colors duration-150 hover:bg-gray-50 px-2 rounded"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="flex-shrink-0 w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                ₹{item.price}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₹{(item.price / item.quantity).toFixed(2)} each
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Order Total</p>
                        <p className="text-xl font-medium text-indigo-600">
                          ₹{order.total}
                        </p>
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