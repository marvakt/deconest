




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import { FaEye, FaTrash } from 'react-icons/fa';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}`, { status: newStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:3000/orders/${id}`);
        toast.success('Order deleted');
        fetchOrders();
      } catch (err) {
        toast.error('Failed to delete order');
      }
    }
  };

 
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  if (loading) {
    return (
      <div className="text-center mt-10 text-pink-600 font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-pink-50">
      <h2 className="text-3xl font-bold text-pink-700 mb-6">🧾 Manage Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="border-t hover:bg-pink-50 transition">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.user || 'N/A'}</td>
                    <td className="px-4 py-3">{order.date || 'N/A'}</td>
                    <td className="px-4 py-3 font-semibold text-pink-700">₹{order.total}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 flex gap-2 items-center">
                      <button
                        onClick={() => setViewDetails(order.id)}
                        className="flex items-center gap-1 bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1 text-sm rounded-full transition"
                      >
                        <FaEye className="text-xs" /> View
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1 text-sm rounded-full transition"
                      >
                        <FaTrash className="text-xs" /> Delete
                      </button>
                    </td>
                  </tr>

                  {viewDetails === order.id && (
                    <tr className="bg-pink-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="border border-pink-200 p-4 rounded-lg bg-pink-100 text-sm text-pink-900 space-y-2">
                          <p><strong>User:</strong> {order.user?.user}</p>
                          <p><strong>Email:</strong> {order.user?.email}</p>
                          <p><strong>Order Date:</strong> {order.date || 'N/A'}</p>
                          <p><strong>Status:</strong> {order.status}</p>
                          <p><strong>Total:</strong> ₹{order.total}</p>
                          <p><strong>Items:</strong></p>
                          <ul className="list-disc ml-6">
                            {order.items?.map((item, idx) => (
                              <li key={idx}>
                                {item.title} × {item.quantity} — ₹{item.price}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-2">
                            <button
                              onClick={() => setViewDetails(null)}
                              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-full text-sm"
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      {orders.length > ordersPerPage && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-pink-200 text-pink-800 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-pink-600 text-white'
                  : 'bg-pink-100 text-pink-800'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-pink-200 text-pink-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;


