import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`http://localhost:3000/orders?user=${user.email}`);
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sorted);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return (
    <>
      <Navbar />
      <p className="text-center mt-8">Please log in to view your orders.</p>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center">You have no past orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border rounded p-4 mb-4">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <h4 className="mt-2 font-semibold">Items:</h4>
              <ul className="mt-1 space-y-2">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p>{item.title}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
   
    </>
  );
};

export default MyOrders;

