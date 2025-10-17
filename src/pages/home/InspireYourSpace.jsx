import React from "react";

const InspireYourSpace = () => {
  const inspirationRooms = [
    {
      name: "Modern Living",
      image: "https://i.pinimg.com/1200x/cb/b7/af/cbb7af456f16cf89557f79ed365b15e7.jpg",
    },
    {
      name: "Cozy Bedroom",
      image: "https://i.pinimg.com/736x/ed/f6/8b/edf68b0eec30954b0dfb277d1e8ad8bd.jpg",
    },
    {
      name: "Natural Kitchen",
      image: "https://i.pinimg.com/736x/37/58/3c/37583c606bf3fe14b67aeae10cb40fef.jpg",
    },
    {
      name: "Dining Room",
      image: "https://i.pinimg.com/736x/a8/33/61/a833617230ba2ee311a84e21170f9e14.jpg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Floating Decoration - Hidden on Mobile */}
      <div className="hidden lg:block absolute top-20 right-20 w-32 md:w-40 h-32 md:h-40 border border-gray-200/50 rounded-full opacity-30" 
           style={{ animation: 'morphShape 15s ease-in-out infinite' }}></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20" style={{ animation: 'slideInUp 0.8s ease-out 0.2s both' }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight mb-3 sm:mb-4 md:mb-6 tracking-wider">Inspire Your Space</h2>
          <div className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4 sm:mb-6 md:mb-8"></div>
          <p className="text-gray-600 font-light text-sm sm:text-base md:text-lg opacity-80">Design inspiration for modern living</p>
        </div>
        
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide">
          {inspirationRooms.map((look, index) => (
            <div
              key={look.name}
              className="group min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] perspective-card flex-shrink-0 mobile-optimized"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="card-3d relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover-lift bg-white">
                <div className="relative overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-all duration-1000 group-hover:scale-105 md:group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-light mb-2 md:mb-3 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-all duration-700 tracking-wide">
                    {look.name}
                  </h3>
                  <div className="w-10 sm:w-12 md:w-16 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspireYourSpace;