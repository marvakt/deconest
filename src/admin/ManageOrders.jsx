import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar'; // Ensure AdminNavbar is already created

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch orders from db.json
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [ordersRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3000/orders'),
          axios.get('http://localhost:3000/users'),
        ]);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: 'Delivered',
      });

      // Update locally
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: 'Delivered' } : order
        )
      );
    } catch (err) {
      console.error('Failed to mark as delivered:', err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-4">Manage Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border">User</th>
                <th className="py-2 px-4 border">Products</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{getUserName(order.userId)}</td>
                  <td className="py-2 px-4 border">
                    <ul className="list-disc pl-4">
                      {order.products.map((p, index) => (
                        <li key={index}>
                          {p.title} - ₹{p.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border">₹{order.total}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === 'Delivered'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    {order.status !== 'Delivered' && (
                      <button
                        onClick={() => handleMarkDelivered(order.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
