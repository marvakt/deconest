import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden perspective-card">
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 md:from-black/50 md:via-black/20 md:to-black/50 z-10"></div>
      
      {/* Geometric Elements - Responsive and Hidden on Mobile */}
      <div className="hidden md:block absolute top-32 left-4 md:left-16 w-12 md:w-20 h-12 md:h-20 border-2 border-white/30 z-20" 
           style={{ 
             animation: 'pulse3d 4s ease-in-out infinite', 
             transform: 'rotate(45deg)',
             clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
           }}></div>
      <div className="hidden md:block absolute top-48 right-8 md:right-24 w-12 md:w-16 h-12 md:h-16 glass-morphism rounded-full z-20" 
           style={{ animation: 'float 5s ease-in-out infinite' }}></div>
      <div className="hidden lg:block absolute bottom-32 left-32 w-28 h-1 bg-gradient-to-r from-white/40 to-transparent z-20" 
           style={{ animation: 'shimmer 3s ease-in-out infinite' }}></div>

      {/* Enhanced Slides */}
      <div 
        className="absolute inset-0 flex transition-all duration-[2000ms] ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroImages.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative overflow-hidden">
            <img
              src={`${image}?auto=format&fit=crop&w=1920&h=1080`}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-105 md:hover:scale-110"
              style={{ 
                filter: 'brightness(0.85) contrast(1.1)',
                transform: currentSlide === index ? 'scale(1.02) md:scale(1.05)' : 'scale(1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Hero Content - Fully Responsive */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 sm:px-6">
        <div style={{ animation: 'slideInUp 1.2s cubic-bezier(0.23, 1, 0.320, 1)' }}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extralight mb-4 sm:mb-6 md:mb-8 text-white tracking-wider leading-tight text-glow">
            Discover
            <span className="block font-thin italic text-2xl sm:text-3xl md:text-5xl lg:text-7xl mt-2 md:mt-4 opacity-95 transform hover:scale-105 transition-transform duration-700">
              Minimal Elegance
            </span>
          </h1>
          <div className="w-20 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4 sm:mb-6 md:mb-8" 
               style={{ animation: 'shimmer 2s ease-in-out infinite' }}></div>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 md:mb-12 max-w-4xl leading-relaxed font-light opacity-90 px-4">
            Timeless pieces for your favorite spaces
          </p>
          <button
            onClick={() => navigate("/products")}
            className="group relative bg-white/10 backdrop-blur-sm text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 border border-white/30 font-light transition-all duration-700 hover:bg-white hover:text-black transform hover:scale-105 hover:shadow-2xl overflow-hidden active:scale-95 md:active:scale-100"
            style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)' }}
          >
            <span className="relative z-10 tracking-widest uppercase text-xs sm:text-sm">Shop Now</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      {/* Responsive Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center space-x-2 sm:space-x-3 md:space-x-4 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-700 transform hover:scale-125 active:scale-110 ${
              currentSlide === index 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            style={{
              boxShadow: currentSlide === index ? '0 0 20px rgba(255,255,255,0.6)' : 'none',
              animation: currentSlide === index ? 'pulse3d 2s ease-in-out infinite' : 'none'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;