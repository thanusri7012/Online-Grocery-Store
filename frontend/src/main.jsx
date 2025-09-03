import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// --- Global State Providers ---
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// --- Main App Component & Styles ---
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provides routing capabilities to the entire app */}
    <BrowserRouter>
      {/* Provides user authentication state (login, logout, user info) */}
      <AuthProvider>
        {/* Provides shopping cart state (cart items, add/remove functions) */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);