


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast'; 

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     image: '',
//     price: '',
//     room: '',
//     description: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/products', formData);
//       toast.success('Product added successfully!'); 
//       navigate('/admin/manage-products');
//     } catch (error) {
//       toast.error('Failed to add product'); 
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-pink-50 to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add New Product</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             name="title"
//             placeholder="Product Title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
//             required
//           />

//           <input
//             type="text"
//             name="image"
//             placeholder="Image URL"
//             value={formData.image}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
//             required
//           />

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="room"
//               placeholder="Room (e.g. Living Room)"
//               value={formData.room}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
//             />

//             <input
//               type="number"
//               name="price"
//               placeholder="Price ₹"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
//               required
//             />
//           </div>

//           <textarea
//             name="description"
//             placeholder="Product Description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//             className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-2xl shadow-md transition duration-300"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance"; // Axios with JWT

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    room: "",
    description: "",
    stock: 0,
    is_archived: false,
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("adminpanel/products/", formData);
      toast.success(res.data.message || "Product added successfully!");
      navigate("/admin/manage-products");
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to add product. Check console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 to-purple-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />

          {/* Room and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="room"
              placeholder="Room (e.g. Living Room)"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />

            <input
              type="number"
              name="price"
              placeholder="Price ₹"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          {/* Stock */}
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
          />

          {/* Archived Checkbox */}
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="is_archived"
              checked={formData.is_archived}
              onChange={handleChange}
              className="accent-pink-500"
            />
            <span>Mark as Archived</span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-2xl shadow-md transition duration-300 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
