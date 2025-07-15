// // context/WishlistContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const WishlistContext = createContext();
// export const useWishlist = () => useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:3000/wishlist?userId=${user.id}`)
//         .then((res) => setWishlist(res.data))
//         .catch((err) => console.error("Wishlist fetch error:", err));
//     }
//   }, [user]);

//   const addToWishlist = async (product) => {
//     if (!user) return alert("Please login to add to wishlist");

//     const exists = wishlist.find((item) => item.id === product.id);
//     if (exists) {
//       alert("Already in wishlist");
//       return;
//     }

//     const newItem = { ...product, userId: user.id, wid: Date.now() }; // wid = unique id for wishlist item
//     const res = await axios.post("http://localhost:3000/wishlist", newItem);
//     setWishlist((prev) => [...prev, res.data]);
//   };

//   const removeFromWishlist = async (wid) => {
//     await axios.delete(`http://localhost:3000/wishlist/${wid}`);
//     setWishlist((prev) => prev.filter((item) => item.wid !== wid));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const WishlistContext = createContext();

// Custom hook
export const useWishlist = () => useContext(WishlistContext);

// Provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Load wishlist items on user login
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/wishlist?userId=${user.id}`)
        .then((res) => setWishlist(res.data))
        .catch((err) => console.error("Wishlist fetch error:", err));
    }
  }, [user]);

  // ✅ Add to Wishlist
  const addToWishlist = async (product) => {
    if (!user) return alert("Please login to add to wishlist");

    // Check if already in wishlist using productId
    const exists = wishlist.find((item) => item.productId === product.id);
    if (exists) {
      alert("Already in wishlist");
      return;
    }

    const newItem = {
      ...product,
      userId: user.id,
      productId: product.id, // ✅ Needed for cart integration
      wid: Date.now(),       // ✅ Unique ID for wishlist item
    };

    const res = await axios.post("http://localhost:3000/wishlist", newItem);
    setWishlist((prev) => [...prev, res.data]);
  };

  // ✅ Remove from Wishlist
  const removeFromWishlist = async (wid) => {
    await axios.delete(`http://localhost:3000/wishlist/${wid}`);
    setWishlist((prev) => prev.filter((item) => item.wid !== wid));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
