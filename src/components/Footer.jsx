// import React from "react";
// import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white px-6 py-10 mt-12">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
     
//         <div>
//           <h1 className="text-2xl font-bold tracking-wider mb-3">DecoNest</h1>
//           <p className="text-sm text-gray-300">
//             Curating elegance for your space. Find aesthetic and timeless decor that reflects your style.
//           </p>
//         </div>

       
//         <div className="space-y-2">
//           <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
//           <ul className="space-y-1 text-sm text-gray-300">
//             <li><a href="/" className="hover:text-white transition">Home</a></li>
//             <li><a href="/products" className="hover:text-white transition">Shop</a></li>
//             <li><a href="/wishlist" className="hover:text-white transition">Wishlist</a></li>
//             <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
//           </ul>
//         </div>

       
//         <div className="space-y-3">
//           <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
//           <div className="flex gap-4 text-xl">
//             <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
//             <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
//             <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
//           </div>
//         </div>
//       </div>

    
//       <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
//         &copy; {new Date().getFullYear()} DecoNest. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white pt-12 pb-8 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold text-amber-400 mb-4">DecoNest</h2>
          <p className="text-sm text-stone-400 leading-relaxed">
            Curating beautiful home decor pieces to make your space feel like you.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400 transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Trending</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Room Styles</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Order Tracking</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Pinterest</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-700 mt-10 pt-6 text-center text-sm text-stone-500">
        <div className="inline-block group relative cursor-pointer transition-colors duration-300">
          <span className="text-white">© 2025 DecoNest. All rights reserved.</span>
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-hover:w-full"></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
