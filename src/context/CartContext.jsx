



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




import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/cart?userId=${user.id}`)
        .then((res) => setCart(res.data))
        .catch((err) => console.error("Cart fetch failed:", err));
    }
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast("Please login to add items to cart", { icon: "⚠️", duration: 3000 });
      return;
    }

    const exists = cart.find((item) => item.productId === product.id);

    if (exists) {
      toast("Already in cart", { icon: "ℹ️", duration: 3000 });
      return;
    } else {
      const newItem = {
        productId: product.id,
        title: product.title,
        image: product.image,
        price: Number(product.price),
        quantity: Number(quantity),
        userId: user.id,
      };

      const res = await axios.post("http://localhost:3000/cart", newItem);
      setCart((prev) => [...prev, res.data]);

      toast.success("Added to cart!", { duration: 1000 });
    }
  };

  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:3000/cart/${id}`);
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart", { duration: 1000 });
  };

  const clearCart = async () => {
    for (let item of cart) {
      await axios.delete(`http://localhost:3000/cart/${item.id}`);
    }
    setCart([]);
    toast("Order successfully", { icon: "✅", duration: 1000 });
  };

  const updateQty = async (id, delta) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;

    const newQty = Number(item.quantity) + delta;
    if (newQty < 1) return;

    await axios.patch(`http://localhost:3000/cart/${id}`, {
      quantity: newQty,
    });

    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: newQty } : c))
    );
  };

  const total = cart.reduce((acc, item) => {
    const price = Number(item.price);
    const qty = Number(item.quantity);
    return acc + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
  }, 0);

  const cartCount = cart.reduce((sum, item) => {
    const qty = Number(item.quantity);
    return sum + (isNaN(qty) ? 0 : qty);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

