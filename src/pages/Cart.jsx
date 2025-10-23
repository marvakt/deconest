// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import Navbar from "../components/Navbar";
// import { FaTrash } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { cart, updateQty, removeFromCart, total } = useCart();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setIsLoaded(true), 100);
//   }, []);

//   const handleCheckout = () => {
//     if (!cart.length) {
//       toast.error("Your cart is empty!");
//       return;
//     }
//     navigate("/checkout");
//   };

//   if (!isLoaded) {
//     return <div className="p-6">Loading...</div>;
//   }

//   if (!cart.length) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center text-gray-500">
//           Your cart is empty.
//         </div>
//       </>
//     );
//   }


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
//       <Navbar />

//       <div className="px-6 py-16">
       
//         <div className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
//           isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//         }`}>
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-stone-700 to-stone-900 rounded-full mb-6 shadow-lg">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">Shopping Cart</h1>
//           <p className="text-stone-600 font-light">
//             {cart.length === 0 ? "Your cart is waiting to be filled" : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
//           </p>
//           <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mt-6"></div>
//         </div>

//         {cart.length === 0 ? (
//           <div className={`max-w-md mx-auto text-center transition-all duration-1000 delay-300 ease-out transform ${
//             isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//           }`}>
//             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-sm border border-stone-100">
//               <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
//                 <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-light text-stone-700 mb-3">Your cart is empty</h3>
//               <p className="text-stone-500 font-light mb-8">Start exploring our collections to find something you love</p>
//               <button
//                 onClick={() => navigate("/")}
//                 className="group inline-flex items-center gap-3 bg-stone-800 text-white px-8 py-3 rounded-full font-light tracking-wide hover:bg-stone-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
//               >
//                 <span>Start Shopping</span>
//                 <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
          
//             <div className="max-w-6xl mx-auto space-y-6 mb-12">
//               {cart.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 transform ${
//                     isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
//                   }`}
//                   style={{ transitionDelay: `${300 + index * 100}ms` }}
//                 >
//                   <div className="flex flex-col lg:flex-row items-center gap-8">
                    
//                     <div className="relative group/image">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-32 h-32 object-cover rounded-xl shadow-sm group-hover/image:shadow-md transition-shadow duration-300"
//                       />
//                       <div className="absolute inset-0 bg-stone-900/0 group-hover/image:bg-stone-900/5 rounded-xl transition-colors duration-300"></div>
//                     </div>

                    
//                     <div className="flex-1 w-full space-y-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="text-xl font-medium text-stone-800 tracking-wide mb-2">{item.title}</h3>
//                           <p className="text-stone-600 font-light">
//                             ₹{Number(item.price).toLocaleString("en-IN")} each
//                           </p>
//                         </div>
                        
                        
//                         <button
//                           type="button"
//                           onClick={() => removeFromCart(item.id)}
//                           className="group/remove p-2 rounded-full hover:bg-red-50 transition-colors duration-300"
//                         >
//                           <svg className="w-5 h-5 text-stone-400 group-hover/remove:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       </div>

                     
//                       <div className="flex items-center gap-6">
//                         <span className="text-stone-600 font-light">Quantity:</span>
//                         <div className="flex items-center bg-stone-50 rounded-full overflow-hidden shadow-inner">
//                           <button
//                             onClick={() => updateQty(item.id, -1)}
//                             className="px-4 py-2 hover:bg-stone-100 transition-colors duration-200 text-stone-600"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
//                             </svg>
//                           </button>
//                           <span className="px-6 py-2 font-medium text-stone-800 bg-white min-w-[3rem] text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => updateQty(item.id, +1)}
//                             className="px-4 py-2 hover:bg-stone-100 transition-colors duration-200 text-stone-600"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//                             </svg>
//                           </button>
//                         </div>
                        
                       
//                         <div className="ml-auto">
//                           <span className="text-lg font-medium text-stone-800">
//                             ₹{(Number(item.price) * Number(item.quantity)).toLocaleString("en-IN")}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

            
//             <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-700 ease-out transform ${
//               isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`}>
//               <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-stone-100">
//                 <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                  
//                   <div className="space-y-2">
//                     <h4 className="text-2xl font-light text-stone-800 tracking-wide">
//                       Total: ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                     </h4>
//                     <p className="text-stone-500 font-light text-sm">Including all applicable taxes</p>
//                   </div>

                  
//                   <button
//                     onClick={handleCheckout}
//                     className="group relative inline-flex items-center gap-3 bg-stone-800 text-white px-12 py-4 rounded-full font-light tracking-wide hover:bg-stone-900 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
//                   >
//                     <span className="relative z-10">Proceed to Checkout</span>
//                     <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                     </svg>
                    
                   
//                     <div className="absolute inset-0 bg-gradient-to-r from-stone-700 to-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

      
//         <div className="fixed top-20 right-10 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-stone-100/30 rounded-full blur-3xl -z-10"></div>
//         <div className="fixed bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-stone-100/40 to-amber-50/40 rounded-full blur-3xl -z-10"></div>
//       </div>
//     </div>
//   );
// };

// export default Cart;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, total } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect
(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleCheckout = () => {
    if (!cart.length) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  if (!isLoaded) return <div className="p-6">Loading...</div>;

  if (!cart.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Your cart is empty.
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
      <Navbar />

      <div className="px-6 py-16">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-stone-700 to-stone-900 rounded-full mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">
            Shopping Cart
          </h1>
          <p className="text-stone-600 font-light">
            {cart.length} item{cart.length > 1 ? "s" : ""} in your cart
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mt-6"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6 mb-12">
          {cart.map((item, index) => (
            <div
              key={item.id}
              className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 transform ${
                isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="relative group/image">
                  <img
                    src={item.product?.image || ""}
                    alt={item.product?.title || "Product"}
                    className="w-32 h-32 object-cover rounded-xl shadow-sm group-hover/image:shadow-md transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover/image:bg-stone-900/5 rounded-xl transition-colors duration-300"></div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium text-stone-800 tracking-wide mb-2">
                        {item.product?.title || "Product"}
                      </h3>
                      <p className="text-stone-600 font-light">
                        ₹{Number(item.product?.price || 0).toLocaleString("en-IN")} each
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="group/remove p-2 rounded-full hover:bg-red-50 transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-stone-400 group-hover/remove:text-red-500 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-stone-600 font-light">Quantity:</span>
                    <div className="flex items-center bg-stone-50 rounded-full overflow-hidden shadow-inner">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="px-4 py-2 hover:bg-stone-100 transition-colors duration-200 text-stone-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="px-6 py-2 font-medium text-stone-800 bg-white min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, +1)}
                        className="px-4 py-2 hover:bg-stone-100 transition-colors duration-200 text-stone-600"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="ml-auto">
                      <span className="text-lg font-medium text-stone-800">
                        ₹{(
                          Number(item.product?.price || 0) *
                          Number(item.quantity)
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 delay-700 ease-out transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-stone-100">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <h4 className="text-2xl font-light text-stone-800 tracking-wide">
                  Total: ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </h4>
                <p className="text-stone-500 font-light text-sm">Including all applicable taxes</p>
              </div>

              <button
                onClick={handleCheckout}
                className="group relative inline-flex items-center gap-3 bg-stone-800 text-white px-12 py-4 rounded-full font-light tracking-wide hover:bg-stone-900 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>

                <div className="absolute inset-0 bg-gradient-to-r from-stone-700 to-stone-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="fixed top-20 right-10 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-stone-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="fixed bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-stone-100/40 to-amber-50/40 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Cart;
