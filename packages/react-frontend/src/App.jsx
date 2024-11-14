// src/pages/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import About from "./pages/About";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import Catalog from "./pages/Catalog";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[products, setProducts] = useState([]);

  const handleAuth = () => {
    console.log("Authentication successful");
    setIsAuthenticated(true);
  }

  const verifySignUp = (userData) => {
    console.log("not implemented yet");
  }

  const fetchProducts = async () => {
    try{
      const response = await fetch("http:localhost:8000/products");
      const data = await response.json();
      setProducts(data.products_list);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [] );
  
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
            isAuthenticated ? (<Catalog removeProduct={removeProduct}/>) : (<Navigate to="/login" replace />)
          }
        />

      </Routes>
    </Router>
    
  );
};

export default App;
