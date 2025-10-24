


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast'; 

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/products');
//       setProducts(res.data);
//     } catch (error) {
//       toast.error("Failed to fetch products"); 
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`http://localhost:3000/products/${id}`);
//         toast.success("Product deleted"); 
//         fetchProducts();
//       } catch (error) {
//         toast.error("Failed to delete"); 
//       }
//     }
//   };

//   const filtered = products.filter(product =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedProducts = filtered.slice(startIndex, endIndex);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Manage Products</h1>

      
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by product title..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

     
//       {paginatedProducts.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
//           {paginatedProducts.map(product => (
//             <div
//               key={product.id}
//               className="bg-white border rounded-2xl p-4 shadow hover:shadow-md transition-all"
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-40 object-cover rounded-xl mb-3"
//               />
//               <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
//               <p className="text-sm text-gray-600">{product.category}</p>
//               <p className="text-green-600 font-semibold mt-1">₹{product.price}</p>
//               <p className="text-sm text-gray-500">Stock: {product.stock || 0}</p>

//               <div className="mt-4 flex gap-2">
//                 <button
//                   onClick={() => navigate(`/admin/update-product/${product.id}`)}
//                   className="bg-blue-200 hover:bg-blue-300 text-blue-900 text-sm font-medium px-4 py-1.5 rounded-xl transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product.id)}
//                   className="bg-red-200 hover:bg-red-300 text-red-800 text-sm font-medium px-4 py-1.5 rounded-xl transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2">
//           <button
//             onClick={() => goToPage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1.5 text-sm bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => goToPage(i + 1)}
//               className={`px-3 py-1.5 text-sm rounded-xl transition ${
//                 currentPage === i + 1
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 hover:bg-gray-300'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => goToPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1.5 text-sm bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageProducts;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance"; // Axios with JWT

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("adminpanel/products/");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosInstance.delete(`adminpanel/products/${id}/`);
        toast.success("Product deleted");
        fetchProducts();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete");
      }
    }
  };

  const handleArchiveToggle = async (product) => {
    try {
      const endpoint = product.is_archived
        ? `adminpanel/products/${product.id}/unarchive/`
        : `adminpanel/products/${product.id}/archive/`;
      await axiosInstance.post(endpoint);
      toast.success(
        `Product ${product.is_archived ? "unarchived" : "archived"} successfully`
      );
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update archive status");
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Manage Products</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by product title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {paginatedProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-2xl p-4 shadow hover:shadow-md transition-all"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.room}</p>
              <p className="text-green-600 font-semibold mt-1">₹{product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock || 0}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    product.is_archived ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {product.is_archived ? "Archived" : "Active"}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/admin/update-product/${product.id}`)}
                  className="bg-blue-200 hover:bg-blue-300 text-blue-900 text-sm font-medium px-4 py-1.5 rounded-xl transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-200 hover:bg-red-300 text-red-800 text-sm font-medium px-4 py-1.5 rounded-xl transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleArchiveToggle(product)}
                  className={`${
                    product.is_archived
                      ? "bg-green-200 hover:bg-green-300 text-green-800"
                      : "bg-yellow-200 hover:bg-yellow-300 text-yellow-800"
                  } text-sm font-medium px-4 py-1.5 rounded-xl transition`}
                >
                  {product.is_archived ? "Unarchive" : "Archive"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1.5 text-sm rounded-xl transition ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;


