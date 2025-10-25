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
          theme: { color: "#4B66E3" },
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1">
        <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Checkout</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Address & Payment */}
          <div className="md:col-span-2 bg-white p-8 border border-gray-100 shadow-sm rounded-xl">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <label className="block text-gray-700 font-medium mb-2">Shipping Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-900 mb-6"
              placeholder="Enter your full shipping address"
            />

            <h3 className="text-gray-900 font-medium mb-2">Payment Method</h3>
            <div className="space-y-4 mb-6">
              <label className="flex items-center p-4 border rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="mr-3"
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center p-4 border rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={() => setPaymentMethod("Razorpay")}
                  className="mr-3"
                />
                <span>Online Payment (Razorpay)</span>
              </label>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing || (paymentMethod === "Razorpay" && !razorpayLoaded)}
              className={`w-full py-3 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing
                ? "Processing..."
                : paymentMethod === "COD"
                ? "Confirm Order"
                : "Pay Online"}
            </button>
          </div>

          {/* Right: Order Summary */}
          <div className="md:col-span-1 bg-white p-8 border border-gray-100 shadow-sm rounded-xl">
            <h3 className="text-gray-900 font-medium mb-4">Order Summary</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img
                    src={item.product?.image || "/placeholder.png"}
                    alt={item.product?.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium">{item.product?.title}</p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity} | Price: ₹{item.product?.price}
                    </p>
                  </div>
                  <div className="text-gray-900 font-bold">
                    ₹{(Number(item.product?.price || 0) * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
