


import React from "react";
import { FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">DecoNest</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Curating beautiful home decor pieces to make your space feel like you.
          </p>
        </div>

        {/* Column 2: Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white transition">Trending</a></li>
            <li><a href="#" className="hover:text-white transition">Room Styles</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Order Tracking</a></li>
            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2 hover:text-white transition">
              <FaInstagram /> <a href="#">Instagram</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <FaPinterest /> <a href="#">Pinterest</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <FaFacebook /> <a href="#">Facebook</a>
            </li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        <span className="hover:text-white transition">
          © 2025 <span className="font-semibold text-white">DecoNest</span>. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
