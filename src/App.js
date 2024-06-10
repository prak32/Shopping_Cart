import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Component/AuthContext';
import Registration from './Component/Registration';
import Login from './Component/Login';
import Home from './Component/Home';
import Cart from './Component/Cart';
import { CartProvider } from './Component/CartContext';
import Product from './Component/Product';
import Contact from './Component/Contact';
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
    
  );
};

export default App;