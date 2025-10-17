import React from "react";
import { useNavigate } from "react-router-dom";

const ShopByRoom = () => {
  const navigate = useNavigate();

  const shopByRoom = [
    {
      name: "Bedroom",
      image: "https://i.pinimg.com/1200x/eb/0f/17/eb0f17f9f852c820f30083879943b317.jpg",
    },
    {
      name: "Living Room",
      image: "https://i.pinimg.com/736x/b8/15/a1/b815a12708039611310ca7b5effbf31c.jpg",
    },
    {
      name: "Kitchen",
      image: "https://i.pinimg.com/736x/d7/0e/19/d70e19dd7a78fdbff4753bc30cde6514.jpg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20" style={{ animation: 'slideInUp 0.8s ease-out' }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight mb-3 sm:mb-4 md:mb-6 tracking-wider">Shop by Room</h2>
          <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4 sm:mb-6 md:mb-8"></div>
          <p className="text-gray-600 font-light text-sm sm:text-base md:text-lg opacity-80">Curated collections for every space</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {shopByRoom.map((room, index) => (
            <div
              key={room.name}
              onClick={() => navigate(`/products?room=${room.name.toLowerCase()}`)}
              className="group cursor-pointer perspective-card mobile-optimized"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="card-3d relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl hover-lift bg-white">
                <div className="relative overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover transition-all duration-1000 group-hover:scale-105 md:group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2 md:mb-3 tracking-wide transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    {room.name}
                  </h3>
                  <div className="w-8 sm:w-10 md:w-12 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
                </div>

                {/* 3D Border Effect - Desktop Only */}
                <div className="hidden md:block absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-700 rounded-3xl"></div>
                
                {/* Hover Glow - Desktop Only */}
                <div className="hidden md:block absolute inset-0 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" 
                     style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByRoom;