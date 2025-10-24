



// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:3000/cart?userId=${user.id}`)
//         .then((res) => setCart(res.data))
//         .catch((err) => console.error("Cart fetch failed:", err));
//     }
//   }, [user]);

//   const addToCart = async (product, quantity = 1) => {
//     if (!user) {
//       toast.warn("Please login to add items to cart", { autoClose: 3000 });
//       return;
//     }

//     const exists = cart.find((item) => item.productId === product.id);

//     if (exists) {
//       // ❌ No longer increases quantity
//       toast.info("Already in cart", { autoClose: 3000 });
//       return;
//     } else {
//       const newItem = {
//         productId: product.id,
//         title: product.title,
//         image: product.image,
//         price: Number(product.price),
//         quantity: Number(quantity),
//         userId: user.id,
//       };

//       const res = await axios.post("http://localhost:3000/cart", newItem);
//       setCart((prev) => [...prev, res.data]);

//       toast.success("Added to cart!", { autoClose: 1000 });
//     }
//   };

//   const removeFromCart = async (id) => {
//     await axios.delete(`http://localhost:3000/cart/${id}`);
//     setCart((prev) => prev.filter((item) => item.id !== id));
//     toast.error("Item removed from cart", { autoClose: 1000 });
//   };

//   const clearCart = async () => {
//     for (let item of cart) {
//       await axios.delete(`http://localhost:3000/cart/${item.id}`);
//     }
//     setCart([]);
//     toast.info("order successfully", { autoClose: 1000 });
//   };

//   const updateQty = async (id, delta) => {
//     const item = cart.find((c) => c.id === id);
//     if (!item) return;

//     const newQty = Number(item.quantity) + delta;
//     if (newQty < 1) return;

//     await axios.patch(`http://localhost:3000/cart/${id}`, {
//       quantity: newQty,
//     });

//     setCart((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, quantity: newQty } : c))
//     );
//   };

//   const total = cart.reduce((acc, item) => {
//     const price = Number(item.price);
//     const qty = Number(item.quantity);
//     return acc + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
//   }, 0);

//   const cartCount = cart.reduce((sum, item) => {
//     const qty = Number(item.quantity);
//     return sum + (isNaN(qty) ? 0 : qty);
//   }, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQty,
//         removeFromCart,
//         clearCart,
//         total,
//         cartCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };




// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast"; 

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:3000/cart?userId=${user.id}`)
//         .then((res) => setCart(res.data))
//         .catch((err) => console.error("Cart fetch failed:", err));
//     }
//   }, [user]);

//   const addToCart = async (product, quantity = 1) => {
//     if (!user) {
//       toast("Please login to add items to cart", { icon: "⚠️", duration: 3000 });
//       return;
//     }

//     const exists = cart.find((item) => item.productId === product.id);

//     if (exists) {
//       toast("Already in cart", { icon: "ℹ️", duration: 3000 });
//       return;
//     } else {
//       const newItem = {
//         productId: product.id,
//         title: product.title,
//         image: product.image,
//         price: Number(product.price),
//         quantity: Number(quantity),
//         userId: user.id,
//       };

//       const res = await axios.post("http://localhost:3000/cart", newItem);
//       setCart((prev) => [...prev, res.data]);

//       toast.success("Added to cart!", { duration: 1000 });
//     }
//   };

//   const removeFromCart = async (id) => {
//     await axios.delete(`http://localhost:3000/cart/${id}`);
//     setCart((prev) => prev.filter((item) => item.id !== id));
//     toast.error("Item removed from cart", { duration: 1000 });
//   };

//   const clearCart = async () => {
//     for (let item of cart) {
//       await axios.delete(`http://localhost:3000/cart/${item.id}`);
//     }
//     setCart([]);
//     toast("Order successfully", { icon: "✅", duration: 1000 });
//   };

//   const updateQty = async (id, delta) => {
//     const item = cart.find((c) => c.id === id);
//     if (!item) return;

//     const newQty = Number(item.quantity) + delta;
//     if (newQty < 1) return;

//     await axios.patch(`http://localhost:3000/cart/${id}`, {
//       quantity: newQty,
//     });

//     setCart((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, quantity: newQty } : c))
//     );
//   };

//   const total = cart.reduce((acc, item) => {
//     const price = Number(item.price);
//     const qty = Number(item.quantity);
//     return acc + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
//   }, 0);

//   const cartCount = cart.reduce((sum, item) => {
//     const qty = Number(item.quantity);
//     return sum + (isNaN(qty) ? 0 : qty);
//   }, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQty,
//         removeFromCart,
//         clearCart,
//         total,
//         cartCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://127.0.0.1:8000/api/";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("loggedInUser")));
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [cart, setCart] = useState([]);

  const axiosConfig = { headers: { Authorization: token ? `Bearer ${token}` : "" } };

  // Fetch cart
  const fetchCart = async () => {
    if (!user || !token) return;
    try {
      const res = await axios.get(`${BASE_URL}cart/`, axiosConfig);
      setCart(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => { fetchCart(); }, [user, token]);

  // Add to cart (prevent duplicate)
  const addToCart = async (product, quantity = 1) => {
    if (!user || !token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const existingItem = cart.find((item) => item.product?.id === product.id);

      if (existingItem) {
        toast.error("Item already in cart. You can update quantity in your cart.");
        return; // Stop adding
      }

      await axios.post(
        `${BASE_URL}cart/`,
        { product_id: product.id, quantity },
        axiosConfig
      );

      toast.success("Added to cart!");
      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.error || "Failed to add item");
    }
  };

  // Remove item
  const removeFromCart = async (itemId) => {
    const original = [...cart];
    setCart(cart.filter(c => c.id !== itemId));
    try { await axios.delete(`${BASE_URL}cart/${itemId}/`, axiosConfig); } 
    catch (err) { setCart(original); toast.error("Failed to remove item"); }
  };

  // Update quantity (only in cart page)
  const updateQty = async (itemId, delta) => {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    const original = [...cart];
    setCart(cart.map(c => (c.id === itemId ? { ...c, quantity: newQty } : c)));
    try { await axios.put(`${BASE_URL}cart/${itemId}/`, { quantity: newQty }, axiosConfig); } 
    catch (err) { setCart(original); toast.error("Failed to update quantity"); }
  };

  // Clear cart
  const clearCart = async () => {
    try { await axios.delete(`${BASE_URL}cart/clear/`, axiosConfig); setCart([]); toast.success("Cart cleared"); } 
    catch (err) { toast.error("Failed to clear cart"); }
  };

  const total = cart.reduce((acc, item) => acc + Number(item.product?.price || 0) * Number(item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
