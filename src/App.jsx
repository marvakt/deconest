




import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

// User Pages
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import OrderSummary from './pages/OrderSummary';
import MyOrders from './pages/MyOrders';
import Footer from './components/Footer';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import ManageUsers from './admin/ManageUsers';
import AdminOrders from './admin/AdminOrders';
import ViewUser from './admin/ViewUser';

// Route Guards
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Context
import { useAuth } from './context/AuthContext';


function App() {
  const location = useLocation();
  const { user } = useAuth();

  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn && user?.role === 'admin';
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!isLoggedIn ? <SignUp /> : <Navigate to="/" replace />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
        />

        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/order-summary" element={<OrderSummary />} />

        {/* * ---------- Protected User Routes ----------  */}
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/wishlist"
          element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-orders"
          element={isLoggedIn ? <MyOrders /> : <Navigate to="/login" replace />}
        />

        {/* ---------- Admin Routes (Protected & Nested) ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="view-user/:id" element={<ViewUser />} />
          <Route path="orders" element={<AdminOrders />} />
        
        </Route>

      
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      
      {!isAdminRoute && <Footer />}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
