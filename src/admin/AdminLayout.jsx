



import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiBox, FiPlus, FiUsers, FiClipboard, FiHome, FiLogOut } from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-100 to-white text-gray-800">
      
      
      <aside className="w-64 h-screen fixed top-0 left-0 bg-white shadow-md border-r border-gray-200 z-10">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-700">DecoNest Admin</h1>
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FiHome />
            Dashboard
          </NavLink>

          <NavLink
            to="add-product"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FiPlus />
            Add Product
          </NavLink>

          <NavLink
            to="manage-products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FiBox />
            Manage Products
          </NavLink>

          <NavLink
            to="manage-users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FiUsers />
            Manage Users
          </NavLink>

          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <FiClipboard />
            Orders
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg mt-4"
          >
            <FiLogOut />
            Logout
          </button>
        </nav>
      </aside>

    
      <main className="ml-64 w-full h-screen overflow-y-auto p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
