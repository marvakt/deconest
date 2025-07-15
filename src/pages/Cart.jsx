import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedTotal = cart.reduce((sum, item) => {
      const price = Number(item.price);
      const qty = Number(item.quantity);
      return sum + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="max-w-5xl mx-auto space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-6 border border-gray-200 rounded-xl p-4 shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-md"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-gray-400 hover:text-red-600"
                      >
                        ✕ Remove
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="text-sm">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, +1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-5xl mx-auto mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <h4 className="text-xl font-semibold">
                Total: ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </h4>
              <button
                onClick={handleCheckout}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
