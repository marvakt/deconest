



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; 

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => toast.error('Failed to load product'));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/products/${id}`, product)
      .then(() => {
        toast.success("Product updated");
        navigate("/admin/manage-products");
      })
      .catch(() => toast.error("Update failed"));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Enter product title"
          className="w-full border p-2"
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter price (e.g., 999)"
          className="w-full border p-2"
        />
        <input
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          className="w-full border p-2"
        />
        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="w-full border p-2"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
