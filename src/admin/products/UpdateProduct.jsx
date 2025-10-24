



// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast'; 

// const UpdateProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:3000/products/${id}`)
//       .then(res => setProduct(res.data))
//       .catch(() => toast.error('Failed to load product'));
//   }, [id]);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     axios.put(`http://localhost:3000/products/${id}`, product)
//       .then(() => {
//         toast.success("Product updated");
//         navigate("/admin/manage-products");
//       })
//       .catch(() => toast.error("Update failed"));
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Update Product</h2>
//       <form onSubmit={handleUpdate} className="space-y-3">
//         <input
//           name="title"
//           value={product.title}
//           onChange={handleChange}
//           placeholder="Enter product title"
//           className="w-full border p-2"
//         />
//         <input
//           name="price"
//           value={product.price}
//           onChange={handleChange}
//           placeholder="Enter price (e.g., 999)"
//           className="w-full border p-2"
//         />
//         <input
//           name="stock"
//           value={product.stock}
//           onChange={handleChange}
//           placeholder="Enter stock quantity"
//           className="w-full border p-2"
//         />
//         <input
//           name="image"
//           value={product.image}
//           onChange={handleChange}
//           placeholder="Enter image URL"
//           className="w-full border p-2"
//         />
//         <textarea
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//           placeholder="Enter product description"
//           className="w-full border p-2"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance"; // Axios with JWT

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`adminpanel/products/${id}/`);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`adminpanel/products/${id}/`, product);
      toast.success("Product updated successfully");
      navigate("/admin/manage-products");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Update Product
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Price ₹"
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          name="room"
          value={product.room}
          onChange={handleChange}
          placeholder="Room (e.g., Living Room)"
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows="4"
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-2xl shadow-md transition duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
