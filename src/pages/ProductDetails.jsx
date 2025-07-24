


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { toast } from "react-hot-toast"; 
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import Navbar from "../components/Navbar";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   const { addToCart } = useCart();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/products/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch(() => toast.error("Failed to load product", { duration: 2000 }));
//   }, [id]);

//   const handleAddToCart = async () => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!user) {
//       toast("Please login first.", { icon: "⚠️", duration: 1000 });
//       setTimeout(() => navigate("/login"), 2000);
//       return;
//     }

//     if (quantity > product.stock) {
//       toast.error("Quantity exceeds available stock!", { duration: 1500 });
//       return;
//     }

//     await addToCart(product, quantity);

//     setTimeout(() => {
//       navigate("/cart");
//     }, 2000);
//   };

//   if (!product) return <div className="p-6">Loading...</div>;

//   const isOutOfStock = product.stock === 0;
//   const isInWishlist = wishlist.some((item) => item.productId === product.id);

//   const toggleWishlist = () => {
//     if (isInWishlist) {
//       const item = wishlist.find((item) => item.productId === product.id);
//       if (item) {
//         removeFromWishlist(item.id);
//       }
//     } else {
//       addToWishlist(product);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start bg-white p-6 rounded-2xl shadow-lg">
//           {/* IMAGE with Wishlist Icon */}
//           <div className="relative w-full">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="rounded-xl w-full h-auto object-cover shadow-md"
//             />

//             {/* Wishlist Heart Icon */}
//             <button
//               onClick={toggleWishlist}
//               className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
//               title="Add to Wishlist"
//             >
//               {isInWishlist ? (
//                 <FaHeart className="text-red-500 text-lg transition-all duration-300" />
//               ) : (
//                 <FaRegHeart className="text-gray-400 text-lg transition-all duration-300 hover:text-red-400" />
//               )}
//             </button>
//           </div>

//           {/* DETAILS */}
//           <div className="space-y-6">
//             <h2 className="text-4xl font-bold text-gray-800">{product.title}</h2>
//             <p className="text-gray-600 text-lg">
//               Room: <span className="italic">{product.room}</span>
//             </p>
//             <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             <p className="text-2xl text-pink-600 font-semibold">₹ {product.price}</p>

//             <p
//               className={`text-sm font-medium ${
//                 isOutOfStock ? "text-red-500" : "text-green-600"
//               }`}
//             >
//               {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
//             </p>

//             {/* QUANTITY */}
//             <div className="flex items-center space-x-4">
//               <label className="text-gray-700 font-medium">Quantity:</label>
//               <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
//                 <button
//                   type="button"
//                   onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                   disabled={isOutOfStock || quantity <= 1}
//                   className="px-3 py-1 text-lg font-bold text-gray-700 hover:text-black disabled:text-gray-300"
//                 >
//                   −
//                 </button>
//                 <input
//                   type="number"
//                   min="1"
//                   max={product.stock}
//                   value={quantity}
//                   onChange={(e) => {
//                     const val = Number(e.target.value);
//                     setQuantity(val > product.stock ? product.stock : Math.max(1, val));
//                   }}
//                   disabled={isOutOfStock}
//                   className="w-16 text-center px-2 py-1 border-l border-r border-gray-200 focus:outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
//                   disabled={isOutOfStock || quantity >= product.stock}
//                   className="px-3 py-1 text-lg font-bold text-gray-700 hover:text-black disabled:text-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* BUTTON */}
//             <button
//               onClick={handleAddToCart}
//               disabled={isOutOfStock}
//               className={`${
//                 isOutOfStock
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-black hover:bg-gray-800"
//               } text-white font-semibold px-6 py-2 rounded-xl shadow transition duration-300`}
//             >
//               {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-hot-toast"; 
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product", { duration: 2000 }));
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      toast("Please login first.", { icon: "⚠️", duration: 1000 });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (quantity > product.stock) {
      toast.error("Quantity exceeds available stock!", { duration: 1500 });
      return;
    }

    await addToCart(product, quantity);

    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  if (!product) return <div className="p-6">Loading...</div>;

  const isOutOfStock = product.stock === 0;
  const isInWishlist = wishlist.some((item) => item.productId === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      const item = wishlist.find((item) => item.productId === product.id);
      if (item) {
        removeFromWishlist(item.id);
      }
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start bg-white p-6 rounded-2xl shadow-lg">
          {/* IMAGE with Wishlist Icon */}
          <div className="relative w-full h-[80vh]"> {/* ⬅️ Height is set here */}
            <img
              src={product.image}
              alt={product.title}
              className="rounded-xl w-full h-full object-cover shadow-md" // ⬅️ Fill parent height
            />

            {/* Wishlist Heart Icon */}
            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              title="Add to Wishlist"
            >
              {isInWishlist ? (
                <FaHeart className="text-red-500 text-lg transition-all duration-300" />
              ) : (
                <FaRegHeart className="text-gray-400 text-lg transition-all duration-300 hover:text-red-400" />
              )}
            </button>
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-lg">
              Room: <span className="italic">{product.room}</span>
            </p>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            <p className="text-2xl text-pink-600 font-semibold">₹ {product.price}</p>

            <p
              className={`text-sm font-medium ${
                isOutOfStock ? "text-red-500" : "text-green-600"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={isOutOfStock || quantity <= 1}
                  className="px-3 py-1 text-lg font-bold text-gray-700 hover:text-black disabled:text-gray-300"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQuantity(val > product.stock ? product.stock : Math.max(1, val));
                  }}
                  disabled={isOutOfStock}
                  className="w-16 text-center px-2 py-1 border-l border-r border-gray-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                  disabled={isOutOfStock || quantity >= product.stock}
                  className="px-3 py-1 text-lg font-bold text-gray-700 hover:text-black disabled:text-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              } text-white font-semibold px-6 py-2 rounded-xl shadow transition duration-300`}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
