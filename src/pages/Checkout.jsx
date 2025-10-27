// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../utils/axiosInstance";

// const Checkout = () => {
//   const { cart, clearCart } = useCart();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   const [address, setAddress] = useState("");
//   const [error, setError] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   useEffect(() => {
//     if (!user) navigate("/login");

//     // Load Razorpay SDK
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => setRazorpayLoaded(true);
//     document.body.appendChild(script);

//     return () => document.body.removeChild(script);
//   }, [user, navigate]);

//   const total = cart.reduce(
//     (sum, item) => sum + Number(item.product?.price || 0) * Number(item.quantity),
//     0
//   );

//   const handlePayment = async () => {
//     if (!address.trim()) {
//       setError("Please enter a valid shipping address.");
//       return;
//     }
//     if (!cart.length) {
//       toast.error("Your cart is empty!");
//       return;
//     }
//     if (total <= 0) {
//       setError("Cart total is zero. Add items to checkout.");
//       return;
//     }

//     setError("");
//     setIsProcessing(true);

//     try {
//       if (paymentMethod === "COD") {
//         // ✅ Correct URL for COD orders
//         const res = await axiosInstance.post("/orders/", {
//           address,
//           payment_method: "COD",
//         });

//         localStorage.setItem("latestOrder", JSON.stringify(res.data.order));
//         clearCart();
//         toast.success("Order placed successfully!");
//         navigate("/order-summary");

//       } else if (paymentMethod === "Razorpay") {
//         if (!razorpayLoaded || !window.Razorpay) {
//           setError("Razorpay SDK not loaded. Please refresh the page.");
//           setIsProcessing(false);
//           return;
//         }

//         // ✅ Correct URL for creating Razorpay order
//         const { data: order } = await axiosInstance.post("/orders/payments/create-order/");

//         const options = {
//           key: order.key,
//           amount: order.amount,
//           currency: order.currency,
//           name: "Aurachef Shop",
//           description: "Order Payment",
//           order_id: order.order_id,
//           handler: async function (response) {
//             try {
//               const payload = {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 address,
//               };

//               // ✅ Correct URL for verifying Razorpay payment
//               const verifyRes = await axiosInstance.post("/orders/payments/verify/", payload);

//               if (verifyRes.data.status === "success") {
//                 clearCart();
//                 localStorage.setItem("latestOrder", JSON.stringify(verifyRes.data.order));
//                 toast.success("Payment successful!");
//                 navigate("/order-summary");
//               } else {
//                 setError(verifyRes.data.error || "Payment verification failed.");
//               }
//             } catch (err) {
//               console.error("Payment verification error:", err);
//               setError("Payment verification failed. Please try again.");
//             }
//           },
//           prefill: {
//             name: user?.username || "Customer",
//             email: user?.email || "customer@example.com",
//           },
//           theme: { color: "#4B66E3" },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       setError(err.response?.data?.error || "Something went wrong during payment.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Navbar />
//       <main className="max-w-6xl mx-auto px-6 py-12 flex-1">
//         <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Checkout</h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Left: Address & Payment */}
//           <div className="md:col-span-2 bg-white p-8 border border-gray-100 shadow-sm rounded-xl">
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <label className="block text-gray-700 font-medium mb-2">Shipping Address</label>
//             <textarea
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-900 mb-6"
//               placeholder="Enter your full shipping address"
//             />

//             <h3 className="text-gray-900 font-medium mb-2">Payment Method</h3>
//             <div className="space-y-4 mb-6">
//               <label className="flex items-center p-4 border rounded-md cursor-pointer">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="COD"
//                   checked={paymentMethod === "COD"}
//                   onChange={() => setPaymentMethod("COD")}
//                   className="mr-3"
//                 />
//                 <span>Cash on Delivery</span>
//               </label>
//               <label className="flex items-center p-4 border rounded-md cursor-pointer">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="Razorpay"
//                   checked={paymentMethod === "Razorpay"}
//                   onChange={() => setPaymentMethod("Razorpay")}
//                   className="mr-3"
//                 />
//                 <span>Online Payment (Razorpay)</span>
//               </label>
//             </div>

//             <button
//               onClick={handlePayment}
//               disabled={isProcessing || (paymentMethod === "Razorpay" && !razorpayLoaded)}
//               className={`w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors ${
//                 isProcessing ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isProcessing
//                 ? "Processing..."
//                 : paymentMethod === "COD"
//                 ? "Confirm Order"
//                 : "Pay Online"}
//             </button>
//           </div>

//           {/* Right: Order Summary */}
//           <div className="md:col-span-1 bg-white p-8 border border-gray-100 shadow-sm rounded-xl">
//             <h3 className="text-gray-900 font-medium mb-4">Order Summary</h3>
//             <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex gap-4 items-center">
//                   <img
//                     src={item.product?.image || "/placeholder.png"}
//                     alt={item.product?.title}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div className="flex-1">
//                     <p className="text-gray-700 font-medium">{item.product?.title}</p>
//                     <p className="text-gray-500 text-sm">
//                       Qty: {item.quantity} | Price: ₹{item.product?.price}
//                     </p>
//                   </div>
//                   <div className="text-gray-900 font-bold">
//                     ₹{(Number(item.product?.price || 0) * item.quantity).toLocaleString("en-IN")}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-200 pt-4">
//               <div className="flex justify-between font-medium">
//                 <span>Total</span>
//                 <span>₹{total.toLocaleString("en-IN")}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Checkout;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");

    // Load Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, [user, navigate]);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product?.price || 0) * Number(item.quantity),
    0
  );

  const handlePayment = async () => {
    if (!address.trim()) {
      setError("Please enter a valid shipping address.");
      return;
    }
    if (!cart.length) {
      toast.error("Your cart is empty!");
      return;
    }
    if (total <= 0) {
      setError("Cart total is zero. Add items to checkout.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      if (paymentMethod === "COD") {
        // ✅ Correct URL for COD orders
        const res = await axiosInstance.post("/orders/", {
          address,
          payment_method: "COD",
        });

        localStorage.setItem("latestOrder", JSON.stringify(res.data.order));
        clearCart();
        toast.success("Order placed successfully!");
        navigate("/order-summary");

      } else if (paymentMethod === "Razorpay") {
        if (!razorpayLoaded || !window.Razorpay) {
          setError("Razorpay SDK not loaded. Please refresh the page.");
          setIsProcessing(false);
          return;
        }

        // ✅ Correct URL for creating Razorpay order
        const { data: order } = await axiosInstance.post("/orders/payments/create-order/");

        const options = {
          key: order.key,
          amount: order.amount,
          currency: order.currency,
          name: "Aurachef Shop",
          description: "Order Payment",
          order_id: order.order_id,
          handler: async function (response) {
            try {
              const payload = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                address,
              };

              // ✅ Correct URL for verifying Razorpay payment
              const verifyRes = await axiosInstance.post("/orders/payments/verify/", payload);

              if (verifyRes.data.status === "success") {
                clearCart();
                localStorage.setItem("latestOrder", JSON.stringify(verifyRes.data.order));
                toast.success("Payment successful!");
                navigate("/order-summary");
              } else {
                setError(verifyRes.data.error || "Payment verification failed.");
              }
            } catch (err) {
              console.error("Payment verification error:", err);
              setError("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: user?.username || "Customer",
            email: user?.email || "customer@example.com",
          },
          theme: { color: "#000000" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.error || "Something went wrong during payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-black rounded-2xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h2>
            <p className="text-gray-600">Complete your order</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Address & Payment */}
            <div className="md:col-span-2 bg-white p-8 border border-gray-200 shadow-lg rounded-2xl">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              <div className="mb-8">
                <label className="block text-gray-900 font-semibold mb-3 text-lg">
                  Shipping Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200 bg-gray-50"
                  placeholder="Enter your full shipping address"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-gray-900 font-semibold mb-4 text-lg">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-gray-900 transition-all duration-200 bg-gray-50 hover:bg-white">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="mr-3 w-5 h-5 accent-black"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">Cash on Delivery</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-gray-900 transition-all duration-200 bg-gray-50 hover:bg-white">
                    <input
                      type="radio"
                      name="payment"
                      value="Razorpay"
                      checked={paymentMethod === "Razorpay"}
                      onChange={() => setPaymentMethod("Razorpay")}
                      className="mr-3 w-5 h-5 accent-black"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">Online Payment (Razorpay)</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === "Razorpay" && !razorpayLoaded)}
                className={`w-full py-4 px-6 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 ${
                  isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{paymentMethod === "COD" ? "Confirm Order" : "Pay Online"}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Right: Order Summary */}
            <div className="md:col-span-1 bg-white p-8 border border-gray-200 shadow-lg rounded-2xl h-fit sticky top-8">
              <h3 className="text-gray-900 font-bold text-xl mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto mb-6 pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center pb-4 border-b border-gray-100 last:border-0">
                    <img
                      src={item.product?.image || "/placeholder.png"}
                      alt={item.product?.title}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-semibold text-sm mb-1 truncate">{item.product?.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded">Qty: {item.quantity}</span>
                        <span>₹{item.product?.price}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-900 font-bold text-sm">
                        ₹{(Number(item.product?.price || 0) * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold text-lg">Total</span>
                  <span className="text-gray-900 font-bold text-2xl">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Checkout;
