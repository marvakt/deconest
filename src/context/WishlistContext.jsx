
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast"; 

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
//     if (!user) {
//       toast.error("Please login to add to wishlist");
//       return;
//     }

//     const exists = wishlist.find((item) => item.productId === product.id);
//     if (exists) {
//       alert("Already in wishlist");
//       return;
//     }

//     const newItem = {
//       productId: product.id,
//       title: product.title,
//       image: product.image,
//       price: product.price,
//       userId: user.id,
//     };

//     try {
//       const res = await axios.post("http://localhost:3000/wishlist", newItem);
//       setWishlist((prev) => [...prev, res.data]);
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//     }
//   };

 
//   const removeFromWishlist = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/wishlist/${id}`);
//       setWishlist((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error("Error removing from wishlist:", error);
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, addToWishlist, removeFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://127.0.0.1:8000/api/";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");

  // ✅ Fetch wishlist only once when token available
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user || !token) return;

      try {
        const res = await axios.get(`${BASE_URL}wishlist/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      }
    };

    fetchWishlist();
  }, [token]); // ✅ only when token changes

  // ✅ Add product to wishlist
  const addToWishlist = async (productId) => {
    if (!user || !token) {
      toast.error("Please login to add to wishlist");
      return;
    }

    if (wishlist.some((item) => item.product.id === productId)) {
      toast("Already in wishlist");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}wishlist/`,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist((prev) => [...prev, res.data]);
      toast.success("Added to wishlist!");
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error(err.response?.data?.error || "Failed to add to wishlist");
    }
  };

  // ✅ Remove product from wishlist
  const removeFromWishlist = async (wishlistItemId) => {
    if (!token) return;

    try {
      await axios.delete(`${BASE_URL}wishlist/${wishlistItemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId));
      toast("Removed from wishlist", { icon: "❌" });
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
