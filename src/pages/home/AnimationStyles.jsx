import React from "react";

const AnimationStyles = () => {
  return (
    <style>
      {`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        
        @keyframes pulse3d {
          0%, 100% { transform: scale(1) rotateZ(0deg); box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
          50% { transform: scale(1.1) rotateZ(180deg); box-shadow: 0 0 0 20px rgba(255,255,255,0); }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(100px) rotateX(15deg); opacity: 0; }
          to { transform: translateY(0) rotateX(0deg); opacity: 1; }
        }
        
        @keyframes morphShape {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 25% 75% / 25% 75% 50% 50%; }
          75% { border-radius: 25% 75% 50% 50% / 50% 25% 75% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotateZ(45deg); }
          100% { transform: translateX(300%) rotateZ(45deg); }
        }
        
        @media (min-width: 768px) {
          .perspective-card {
            transform-style: preserve-3d;
            perspective: 1000px;
          }
          
          .card-3d {
            transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
            transform-style: preserve-3d;
          }
          
          .card-3d:hover {
            transform: rotateY(8deg) rotateX(8deg) translateZ(20px);
          }
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .text-glow {
          text-shadow: 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @media (min-width: 768px) {
          .hover-lift {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .hover-lift:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          }
        }

        @media (max-width: 767px) {
          .mobile-optimized {
            transform: none !important;
            transition: opacity 0.3s ease;
          }
          
          .mobile-optimized:active {
            opacity: 0.8;
          }
        }
      `}
    </style>
  );
};

export default AnimationStyles;