



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderSummary = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
    setOrder(latestOrder);
  }, []);

  if (!order) {
    return <p className="text-center mt-10">No recent order found.</p>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Order Summary</h2>

        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
         
          <p><strong>Address:</strong> {order.address}</p>
       

          <h3 className="text-xl font-semibold mt-6 mb-4">Ordered Items</h3>
          {order.items.map((item, index) => (
            <div key={index} className="mb-6 flex items-start gap-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            </div>
          ))}

          <h3 className="text-lg font-semibold mt-6">Total: {order.total}</h3>
        </div>

        {/* ✅ OK Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            OK
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSummary;
