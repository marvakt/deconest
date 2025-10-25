



// import React, { useContext, useEffect } from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast'; 

// // User Pages
// import SignUp from './pages/Signup';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Profile from './pages/Profile';
// import Wishlist from './pages/Wishlist';
// import OrderSummary from './pages/OrderSummary';
// import MyOrders from './pages/MyOrders';
// import Footer from './components/Footer';

// // Admin Pages
// import AdminLayout from './admin/AdminLayout';
// import AdminDashboard from './admin/AdminDashboard';
// import AddProduct from './admin/products/AddProduct';
// import ManageProducts from './admin/products/ManageProducts';
// import UpdateProduct from './admin/products/UpdateProduct';
// import ManageUsers from './admin/users/ManageUsers';
// import AdminOrders from './admin/orders/AdminOrders';
// import ViewUser from './admin/users/ViewUser';

// // Route Guards
// import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// // Context
// import { authContext } from './context/AuthContext';

// // ScrollToTop Component
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// function App() {
//   const location = useLocation();
//   const { user } = useContext(authContext);

//   const isLoggedIn = !!user;
//   const isAdmin = isLoggedIn && user?.role === 'admin';
//   const isAdminRoute = location.pathname.startsWith('/admin');

//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         {/* ---------- Public Routes ---------- */}
//         <Route 
//           path="/" 
//           element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Home key="home" />} 
//         />
//         <Route
//           path="/signup"
//           element={
//             isAdmin ? <Navigate to="/admin/dashboard" replace /> :
//             !isLoggedIn ? <SignUp key="signup" /> : <Navigate to="/" replace />
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             isAdmin ? <Navigate to="/admin/dashboard" replace /> :
//             !isLoggedIn ? <Login key="login" /> : <Navigate to="/" replace />
//           }
//         />

//         <Route 
//           path="/products" 
//           element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Products key={location.key} />} 
//         />
//         <Route 
//           path="/productDetails/:id" 
//           element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <ProductDetails key={location.key} />} 
//         />
//         <Route 
//           path="/order-summary" 
//           element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <OrderSummary key="order-summary" />} 
//         />

//         {/* * ---------- Protected User Routes ----------  */}
//         <Route
//           path="/cart"
//           element={
//             isAdmin ? <Navigate to="/admin/dashboard" replace /> :
//             isLoggedIn ? <Cart key="cart" /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route
//           path="/checkout"
//           element={
//             isAdmin ? <Navigate to="/admin/dashboard" replace /> :
//             isLoggedIn ? <Checkout key="checkout" /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             isAdmin ? <Navigate to="/admin/dashboard" replace /> :
//             isLoggedIn ? <Profile key="profile" /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route
//           path="/wishlist"
//           element={
//             isAdmin ? <Navigate to="/admin/dashboard" replace /> :
//             isLoggedIn ? <Wishlist key="wishlist" /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route
//           path="/my-orders"
//           element={
//             isAdmin ? <Navigate to="/admin/dashboard" replace /> :
//             isLoggedIn ? <MyOrders key="my-orders" /> : <Navigate to="/login" replace />
//           }
//         />

//         {/* ---------- Admin Routes (Protected & Nested) ---------- */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedAdminRoute>
//               <AdminLayout />
//             </ProtectedAdminRoute>
//           }
//         >
//           <Route index element={<Navigate to="dashboard" replace />} />
//           <Route path="dashboard" element={<AdminDashboard key="admin-dashboard" />} />
//           <Route path="add-product" element={<AddProduct key="add-product" />} />
//           <Route path="manage-products" element={<ManageProducts key="manage-products" />} />
//           <Route path="update-product/:id" element={<UpdateProduct key={location.key} />} />
//           <Route path="manage-users" element={<ManageUsers key="manage-users" />} />
//           <Route path="view-user/:id" element={<ViewUser key={location.key} />} />
//           <Route path="orders" element={<AdminOrders key="admin-orders" />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>

//       {!isAdminRoute && <Footer />}

//       <Toaster position="top-center" reverseOrder={false} />
//     </>
//   );
// }


// export default App;


// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import OrderSummary from "./pages/OrderSummary";
import MyOrders from "./pages/MyOrders";
import Footer from "./components/Footer";

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/products/AddProduct";
import ManageProducts from "./admin/products/ManageProducts";
import UpdateProduct from "./admin/products/UpdateProduct";
import ManageUsers from "./admin/users/ManageUsers";
import AdminOrders from "./admin/orders/AdminOrders";
import ViewUser from "./admin/users/ViewUser";

// Route Guards
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Context
import { useAuth } from "./context/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const { user } = useAuth();

  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn && user?.role === "admin";
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Home />}
        />
        <Route
          path="/signup"
          element={
            isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : !isLoggedIn ? (
              <SignUp />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : !isLoggedIn ? (
              <Login />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Products */}
        <Route path="/products" element={<Products key={location.key} />} />
        <Route path="/productDetails/:id" element={<ProductDetails key={location.key} />} />
        <Route path="/order-summary" element={<OrderSummary />} />

        {/* Protected User Routes */}
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />} />
        <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" replace />} />
        <Route path="/my-orders" element={isLoggedIn ? <MyOrders /> : <Navigate to="/login" replace />} />

        {/* Admin Routes */}
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
