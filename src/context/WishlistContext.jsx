
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));


  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/wishlist?userId=${user.id}`)
        .then((res) => setWishlist(res.data))
        .catch((err) => console.error("Wishlist fetch error:", err));
    }
  }, [user]);


  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }

    const exists = wishlist.find((item) => item.productId === product.id);
    if (exists) {
      alert("Already in wishlist");
      return;
    }

    const newItem = {
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      userId: user.id,
    };

    try {
      const res = await axios.post("http://localhost:3000/wishlist", newItem);
      setWishlist((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

 
  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
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





