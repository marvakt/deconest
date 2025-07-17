import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
     
        <div>
          <h1 className="text-2xl font-bold tracking-wider mb-3">DecoNest</h1>
          <p className="text-sm text-gray-300">
            Curating elegance for your space. Find aesthetic and timeless decor that reflects your style.
          </p>
        </div>

       
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Shop</a></li>
            <li><a href="/wishlist" className="hover:text-white transition">Wishlist</a></li>
            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
          </ul>
        </div>

       
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>

    
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} DecoNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


