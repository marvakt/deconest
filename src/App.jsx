
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    !!localStorage.getItem("loggedInUser")
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("loggedInUser"));
    };
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/my-orders" element={isLoggedIn ? <MyOrders /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
<Footer/>
  
     <ToastContainer
  position="top-right"
  autoClose= "2000"

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
