// src/pages/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import About from "./pages/About";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import Catalog from "./pages/Catalog";


const App = () => {
  const [products, setProducts] = useState([
    {
      sku: 'PROD001',
      name: 'Cal Poly Hoodie',
      price: 49.99,
      qty: 12,
      _id: '1',
    },
    {
      sku: 'PROD002',
      name: 'Cal Poly Hat',
      price: 19.99,
      qty: 20,
      _id: '2',
    },
    {
      sku: 'PROD003',
      name: 'Cal Poly T-Shirt',
      price: 29.99,
      qty: 15,
      _id: '3',
    },
    {
      sku: 'PROD004',
      name: 'Cal Poly Mug',
      price: 9.99,
      qty: 50,
      _id: '4',
    },
    {
      sku: 'PROD005',
      name: 'Cal Poly Keychain',
      price: 4.99,
      qty: 100,
      _id: '5',
    },
  ]);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    console.log("Authentication successful");
    setIsAuthenticated(true);
  }

  const verifySignUp = (userData) => {
    console.log("not implemented yet");
  }

  return (
    <Router>
      <Routes>
        {/* default route redirects to login */}
        <Route path="/" element={<Navigate to ="/login" replace />} />

        {/* login route */}
        <Route path="/login" element={<LogIn handleAuth={handleAuth} />} />

        {/* signup route */}
        <Route path="/signup" element={<SignUp verifySignUp={verifySignUp}/>} />

        {/* paths that need authentication */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (<Home />) : (<Navigate to="/login" replace/>)
          } 
        />

        <Route
          path="/about"
          element={
            isAuthenticated ? (<About />) : (<Navigate to="/login" replace />)
          }
        />

        <Route
          path="/account"
          element={
            isAuthenticated ? (<Account />) : (<Navigate to="/login" replace />)
          }
        />

        <Route
          path="/catalog"
          element={
            isAuthenticated ? (<Catalog productData={products}/>) : (<Navigate to="/login" replace />)
          }
        />

      </Routes>
    </Router>
    
  );
};

export default App;
