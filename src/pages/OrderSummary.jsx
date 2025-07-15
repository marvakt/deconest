import React, { useEffect, useState } from "react";

const OrderSummary = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
    setOrder(latestOrder);
  }, []);

  if (!order) {
    return <p className="text-center mt-10">No recent order found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Total:</strong> ₹{order.total}</p>
      <p><strong>Payment:</strong> {order.paymentMethod || 'N/A'}</p>
      <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Items:</h3>
      <ul className="space-y-2">
        {order.items.map((item, index) => (
          <li key={index} className="border p-2 rounded-md flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummary;
