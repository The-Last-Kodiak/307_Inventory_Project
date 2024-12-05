// src/pages/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Catalog from "./pages/Catalog";

// test
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    console.log("Authentication successful");
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* default route redirects to login */}
        <Route path="/" element={<Navigate to ="/login" replace />} />

        {/* login route */}
        <Route path="/login" element={<LogIn onLogin={handleLogin} />} />

        {/* signup route */}
        <Route path="/signup" element={<SignUp />} />

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
          path="/catalog"
          element={
            isAuthenticated ? (<Catalog />) : (<Navigate to="/login" replace />)
          }
        />

      </Routes>
    </Router>
    
  );
};

export default App;
