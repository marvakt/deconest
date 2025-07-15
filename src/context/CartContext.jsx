// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   // Fetch cart from server for logged in user
//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:3000/cart?userId=${user.id}`)
//         .then((res) => setCart(res.data))
//         .catch((err) => console.error("Cart fetch failed:", err));
//     }
//   }, [user]);

//   // ✅ ADD TO CART
//   const addToCart = async (product, quantity = 1) => {
//     if (!user) return alert("Please login to add items to cart");

//     const exists = cart.find((item) => item.productId === product.id);

//     if (exists) {
//       const updatedQty = exists.quantity + quantity;
//       await axios.patch(`http://localhost:3000/cart/${exists.id}`, {
//         quantity: updatedQty,
//       });

//       setCart((prev) =>
//         prev.map((item) =>
//           item.id === exists.id ? { ...item, quantity: updatedQty } : item
//         )
//       );
//     } else {
//       const newItem = {
//         productId: product.id,
//         title: product.title,
//         image: product.image,
//         price: product.price,
//         quantity,
//         userId: user.id,
//       };

//       const res = await axios.post("http://localhost:3000/cart", newItem);
//       setCart((prev) => [...prev, res.data]);
//     }
//   };

//   // ✅ UPDATE QTY
//   const updateQty = async (id, delta) => {
//     const item = cart.find((c) => c.id === id);
//     if (!item) return;

//     const newQty = item.quantity + delta;
//     if (newQty < 1) return;

//     await axios.patch(`http://localhost:3000/cart/${id}`, {
//       quantity: newQty,
//     });

//     setCart((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, quantity: newQty } : c))
//     );
//   };

//   // ✅ REMOVE ITEM
//   const removeFromCart = async (id) => {
//     await axios.delete(`http://localhost:3000/cart/${id}`);
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   // ✅ CLEAR CART after order confirmation
//   const clearCart = async () => {
//     for (let item of cart) {
//       await axios.delete(`http://localhost:3000/cart/${item.id}`);
//     }
//     setCart([]);
//   };

//   // ✅ TOTAL CALCULATION
//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, updateQty, removeFromCart, clearCart, total }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Fetch cart from server for logged in user
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/cart?userId=${user.id}`)
        .then((res) => setCart(res.data))
        .catch((err) => console.error("Cart fetch failed:", err));
    }
  }, [user]);

  // ✅ ADD TO CART
  const addToCart = async (product, quantity = 1) => {
    if (!user) return alert("Please login to add items to cart");

    const exists = cart.find((item) => item.productId === product.id);

    if (exists) {
      const updatedQty = exists.quantity + quantity;
      await axios.patch(`http://localhost:3000/cart/${exists.id}`, {
        quantity: updatedQty,
      });

      setCart((prev) =>
        prev.map((item) =>
          item.id === exists.id ? { ...item, quantity: updatedQty } : item
        )
      );
    } else {
      const newItem = {
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity,
        userId: user.id,
      };

      const res = await axios.post("http://localhost:3000/cart", newItem);
      setCart((prev) => [...prev, res.data]);
    }
  };

  // ✅ UPDATE QTY
  const updateQty = async (id, delta) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    await axios.patch(`http://localhost:3000/cart/${id}`, {
      quantity: newQty,
    });

    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: newQty } : c))
    );
  };

  // ✅ REMOVE ITEM
  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:3000/cart/${id}`);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ CLEAR CART after order confirmation
  const clearCart = async () => {
    for (let item of cart) {
      await axios.delete(`http://localhost:3000/cart/${item.id}`);
    }
    setCart([]);
  };

  // ✅ TOTAL CALCULATION
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // ✅ CART COUNT
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, total, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
