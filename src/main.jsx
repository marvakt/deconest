


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// // ✅ Add these slick-carousel styles:
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { CartProvider } from './context/CartContext';
// import { WishlistProvider } from './context/WishlistContext';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <CartProvider>
//         <WishlistProvider>
//           <App />
//         </WishlistProvider>
//       </CartProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// ✅ Add these slick-carousel styles:
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext'; // ✅ import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
