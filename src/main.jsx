
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// import { CartProvider } from './context/CartContext';
// import { WishlistProvider } from './context/WishlistContext'; // ✅ Import this

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <CartProvider>
//         <WishlistProvider> {/* ✅ Wrap App */}
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

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; // ✅ Import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider> {/* ✅ Wrap App */}
          <App />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
