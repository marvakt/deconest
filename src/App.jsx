




import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    !!localStorage.getItem('loggedInUser')
  );

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const isAdmin = isLoggedIn && user?.role === 'admin';

  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('loggedInUser'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      <Routes>
        {/* ---------------- User Routes ---------------- */}
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/wishlist"
          element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />}
        />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route
          path="/my-orders"
          element={isLoggedIn ? <MyOrders /> : <Navigate to="/login" />}
        />

        {/* ---------------- Admin Routes ---------------- */}
        {isAdmin && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="view-user/:id" element={<ViewUser />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        )}

        {/* ---------------- Fallback Route ---------------- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ✅ Only show footer if NOT on admin route */}
      {!isAdminRoute && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;





// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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
// import ChangePassword from "./pages/ChangePassword";

// // Admin Pages
// import AdminLayout from './admin/AdminLayout';
// import AdminDashboard from './admin/AdminDashboard';
// import AddProduct from './admin/AddProduct';
// import ManageProducts from './admin/ManageProducts';
// import UpdateProduct from './admin/UpdateProduct';
// import ManageUsers from './admin/ManageUsers';
// import AdminOrders from './admin/AdminOrders';
// import ViewUser from './admin/ViewUser';

// // Admin Route Protection
// import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(() =>
//     !!localStorage.getItem('loggedInUser')
//   );

//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));
//   const isAdminRoute = location.pathname.startsWith('/admin');

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem('loggedInUser'));
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <>
//       <Routes>
//         {/* ---------------- User Routes ---------------- */}
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/signup"
//           element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/login"
//           element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
//         />
//         <Route path="/products" element={<Products />} />
//         <Route path="/productDetails/:id" element={<ProductDetails />} />
//         <Route
//           path="/cart"
//           element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/checkout"
//           element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/profile"
//           element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/wishlist"
//           element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />}
//         />
//         <Route path="/order-summary" element={<OrderSummary />} />
//         <Route
//           path="/my-orders"
//           element={isLoggedIn ? <MyOrders /> : <Navigate to="/login" />}
//         />
//         <Route path="/change-password" element={<ChangePassword user={loggedInUser} />} />

//         {/* ---------------- Admin Routes (Protected) ---------------- */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedAdminRoute>
//               <AdminLayout />
//             </ProtectedAdminRoute>
//           }
//         >
//           <Route index element={<Navigate to="dashboard" />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="add-product" element={<AddProduct />} />
//           <Route path="manage-products" element={<ManageProducts />} />
//           <Route path="update-product/:id" element={<UpdateProduct />} />
//           <Route path="manage-users" element={<ManageUsers />} />
//           <Route path="view-user/:id" element={<ViewUser />} />
//           <Route path="orders" element={<AdminOrders />} />
//         </Route>

//         {/* ---------------- Fallback Route ---------------- */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {/* ✅ Show footer only on user pages */}
//       {!isAdminRoute && <Footer />}

//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </>
//   );
// }

// export default App;


// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // ✅ User Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import SignUp from './pages/Signup';
// import Products from './pages/Products';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import Wishlist from './pages/Wishlist';
// import Checkout from './pages/Checkout';
// import OrderSummary from './pages/OrderSummary';
// import Profile from './pages/Profile';
// import ChangePassword from './pages/ChangePassword';

// // ✅ Admin Pages
// import AdminDashboard from './admin/AdminDashboard';
// import AddProduct from './admin/AddProduct';
// import EditProduct from './admin/EditProduct';
// import ViewUsers from './admin/ViewUsers';
// import ViewOrders from './admin/ViewOrders';

// // ✅ Components
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// const App = () => {
//   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//   const isAdmin = loggedInUser?.role === 'admin';
//   const isUser = loggedInUser?.role === 'user';

//   return (
//     <>
//       {/* Show Navbar and Footer only for users */}
//       {!isAdmin && <Navbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         {/* User Routes */}
//         {isUser && (
//           <>
//             <Route path="/products" element={<Products />} />
//             <Route path="/productDetails/:id" element={<ProductDetails />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/wishlist" element={<Wishlist />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/order-summary" element={<OrderSummary />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/change-password" element={<ChangePassword />} />
//           </>
//         )}

//         {/* Admin Routes */}
//         {isAdmin && (
//           <>
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//             <Route path="/admin/add-product" element={<AddProduct />} />
//             <Route path="/admin/edit-product/:id" element={<EditProduct />} />
//             <Route path="/admin/users" element={<ViewUsers />} />
//             <Route path="/admin/orders" element={<ViewOrders />} />
//           </>
//         )}

//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {!isAdmin && <Footer />}
//       <ToastContainer />
//     </>
//   );
// };

// export default App;
