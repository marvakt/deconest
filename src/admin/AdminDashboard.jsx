


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";
import {
  Users, ShoppingCart, PackageCheck, PackageX, Truck, Ban
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const COLORS = ["#facc15", "#60a5fa", "#34d399", "#f87171"]; // yellow, blue, green, red

const StatCard = ({ title, value, bg, icon: Icon }) => (
  <div className={`flex items-center justify-between p-4 rounded-lg shadow-md ${bg}`}>
    <div>
      <h3 className="text-sm text-gray-700 font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <Icon className="w-8 h-8 text-gray-700" />
  </div>
);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then(res => setUsers(res.data));
    axios.get("http://localhost:3000/products").then(res => setProducts(res.data));
    axios.get("http://localhost:3000/orders").then(res => setOrders(res.data));
  }, []);

  // FIX: Make sure amount is a valid number
  const totalRevenue = orders.reduce((sum, o) => {
    const amount = parseFloat(o.total || 0);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const orderStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

  const statusCounts = orderStatuses.map(status => ({
    status,
    count: orders.filter(o => o.status === status).length,
  }));

  // FIX: Handle missing or invalid date
  const monthlyRevenue = Array(12).fill(0);
  orders.forEach(order => {
    const date = new Date(order.date);
    if (!isNaN(date)) {
      const month = date.getMonth();
      const amount = parseFloat(order.total || 0);
      monthlyRevenue[month] += isNaN(amount) ? 0 : amount;
    }
  });

  const monthlyRevenueData = monthlyRevenue.map((revenue, index) => ({
    month: new Date(0, index).toLocaleString("default", { month: "short" }),
    revenue,
  }));

  const blockedUsers = users.filter(u => u.isBlocked).length;

  return (
    
    <div className="p-6 bg-gradient-to-br from-white to-pink-50 min-h-screen">
      <h2 className="text-3xl font-bold text-pink-700 mb-6 ">Welcome, Admin</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={users.length} icon={Users} bg="bg-blue-100" />
        <StatCard title="Blocked Users" value={blockedUsers} icon={Ban} bg="bg-red-100" />
        <StatCard title="Total Products" value={products.length} icon={ShoppingCart} bg="bg-green-100" />
        <StatCard title="Total Orders" value={orders.length} icon={PackageCheck} bg="bg-purple-100" />
        <StatCard title="Shipped Orders" value={statusCounts[1]?.count} icon={Truck} bg="bg-yellow-100" />
        <StatCard title="Delivered Orders" value={statusCounts[2]?.count} icon={PackageCheck} bg="bg-green-100" />
        <StatCard title="Pending Orders" value={statusCounts[0]?.count} icon={PackageCheck} bg="bg-orange-100" />
        <StatCard title="Cancelled Orders" value={statusCounts[3]?.count} icon={PackageX} bg="bg-red-100" />
      </div>

      {/* Total Revenue */}
      <div className="bg-pink-100 text-right rounded-xl shadow-md p-4 text-lg font-semibold text-pink-800 mb-6">
        💰 Total Revenue: ₹{totalRevenue.toLocaleString()}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">📊 Order Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="count"
                nameKey="status"
                outerRadius={90}
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-pink-600">📈 Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
   
  );
};

export default AdminDashboard;
