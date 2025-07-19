

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = () => {
//     axios.get('http://localhost:3000/orders')
//       .then(res => setOrders(res.data))
//       .catch(err => console.error(err));
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:3000/orders/${id}`)
//       .then(fetchOrders)
//       .catch(console.error);
//   };

//   const handleStatusChange = (id, newStatus) => {
//     axios.patch(`http://localhost:3000/orders/${id}`, { status: newStatus })
//       .then(fetchOrders)
//       .catch(console.error);
//   };

//   const filteredOrders = filterStatus === 'All'
//     ? orders
//     : orders.filter(order => order.status === filterStatus);

//   const statusCounts = ['Delivered', 'Shipped', 'Cancelled'].map(status => ({
//     status,
//     count: orders.filter(o => o.status === status).length
//   }));

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>

//       {/* Filter */}
//       <div className="mb-4 flex items-center gap-3">
//         <label className="font-medium">Filter by Status:</label>
//         <select
//           className="border px-3 py-1 rounded"
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Graph */}
//       <div className="mb-6 w-full h-64 bg-white rounded-lg shadow p-4">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={statusCounts}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="status" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#38bdf8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow rounded border">
//           <thead className="bg-gray-100">
//             <tr className="text-left">
//               <th className="px-4 py-2 border">Order ID</th>
//               <th className="px-4 py-2 border">User</th>
//               <th className="px-4 py-2 border">Total</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order) => (
//               <tr key={order.id}>
//                 <td className="px-4 py-2 border">{order.id}</td>
//                 <td className="px-4 py-2 border">{order.user?.name || 'N/A'}</td>
//                 <td className="px-4 py-2 border">₹{order.total}</td>
//                 <td className="px-4 py-2 border">
//                   <select
//                     value={order.status}
//                     onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                     className="border px-2 py-1 rounded"
//                   >
//                     <option value="Delivered">Delivered</option>
//                       <option value="Pending">Pending</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </td>
//                 <td className="px-4 py-2 border space-x-2">
//                   <button
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setShowModal(true);
//                     }}
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={() => handleDelete(order.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredOrders.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-500">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* View Modal */}
//       {showModal && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
//             <h3 className="text-xl font-semibold mb-4">Order Details</h3>
//             <p><strong>Order ID:</strong> {selectedOrder.id}</p>
//             <p><strong>User:</strong> {selectedOrder.user?.name || 'N/A'}</p>
//             <p><strong>Email:</strong> {selectedOrder.user?.email || 'N/A'}</p>
//             <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
//             <p><strong>Status:</strong> {selectedOrder.status}</p>
//             <p><strong>Items:</strong></p>
//             <ul className="list-disc list-inside mb-4">
//               {selectedOrder.items?.map((item, i) => (
//                 <li key={i}>{item.title} × {item.quantity}</li>
//               ))}
//             </ul>
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaTrash } from 'react-icons/fa';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(null); // Track selected order

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
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="border-t hover:bg-pink-50 transition">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.user?.name || 'N/A'}</td>
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

                  {/* 👁️ Detail view section */}
                  {viewDetails === order.id && (
                    <tr className="bg-pink-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="border border-pink-200 p-4 rounded-lg bg-pink-100 text-sm text-pink-900 space-y-2">
                          <p><strong>User:</strong> {order.user?.name}</p>
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
    </div>
  );
};

export default AdminOrders;
