// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [roomFilter, setRoomFilter] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   // Filter + Sort logic
//   const filtered = products
//     .filter((item) =>
//       item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((item) =>
//       categoryFilter ? item.category === categoryFilter : true
//     )
//     .filter((item) => (roomFilter ? item.room === roomFilter : true))
//     .sort((a, b) => {
//       if (sortOption === "lowToHigh") return a.price - b.price;
//       if (sortOption === "highToLow") return b.price - a.price;
//       if (sortOption === "newest")
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       return 0;
//     });

//   return (
//     <div className="p-6 text-black min-h-screen bg-white">
//       <h2 className="text-3xl font-bold text-center mb-6">🛍️ All Products</h2>

//       {/* Search + Filters */}
//       <div className="flex flex-wrap justify-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-4 py-2 rounded w-64"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">All Categories</option>
//           <option value="Wall Decor">Wall Decor</option>
//           <option value="Vases">Vases</option>
//           <option value="Lamps">Lamps</option>
//           <option value="Kitchen">Kitchen</option>
//         </select>

//         <select
//           value={roomFilter}
//           onChange={(e) => setRoomFilter(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">All Rooms</option>
//           <option value="Living">Living</option>
//           <option value="Bedroom">Bedroom</option>
//           <option value="Kitchen">Kitchen</option>
//         </select>

//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">Sort</option>
//           <option value="lowToHigh">Price: Low → High</option>
//           <option value="highToLow">Price: High → Low</option>
//           <option value="newest">Newest</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filtered.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ Add Navbar import

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomFromURL = queryParams.get("room");

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    if (roomFromURL) {
      // Support values like "living room"
      const formatted = roomFromURL
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setRoomFilter(formatted); // → "Living Room"
    }
  }, [roomFromURL]);

  const filtered = products
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      categoryFilter ? item.category === categoryFilter : true
    )
    .filter((item) => (roomFilter ? item.room === roomFilter : true))
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      if (sortOption === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="p-6 text-black min-h-screen bg-white">
      <Navbar /> {/* ✅ Render Navbar */}

      <h2 className="text-3xl font-bold text-center mb-6">🛍️ All Products</h2>

      {/* Search + Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Wall Decor">Wall Decor</option>
          <option value="Vases">Vases</option>
          <option value="Lamps">Lamps</option>
          <option value="Kitchen">Kitchen</option>
        </select>

        <select
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Rooms</option>
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Kitchen">Kitchen</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
