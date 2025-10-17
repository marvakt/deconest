
import React from "react";
import Navbar from "../components/Navbar";
import AnimationStyles from "./home/AnimationStyles";
import HeroSection from "./home/HeroSection";
import ShopByRoom from "./home/ShopByRoom";
import InspireYourSpace from "./home/InspireYourSpace";
import TrendingNow from "./home/TrendingNow";

const Home = () => {
  return (
    <>
      <Navbar />
      <AnimationStyles />
      
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden relative">
        {/* Floating Background Elements - Hidden on mobile for performance */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block">
          <div className="absolute top-20 left-10 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-gray-200/20 to-gray-300/10 rounded-full" 
               style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 right-20 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-bl from-gray-300/15 to-gray-200/5" 
               style={{ animation: 'floatReverse 8s ease-in-out infinite', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute bottom-40 left-1/4 w-24 md:w-40 h-24 md:h-40 bg-gradient-to-tr from-gray-200/10 to-transparent" 
               style={{ animation: 'morphShape 12s ease-in-out infinite' }}></div>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Shop by Room Section */}
        <ShopByRoom />

        {/* Inspire Your Space Section */}
        <InspireYourSpace />

        {/* Trending Now Section */}
        <TrendingNow />

        {/* Footer Spacer with Gradient - Responsive */}
        <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-t from-gray-200/50 to-white"></div>
      </div>
    </>
  );
};

export default Home;