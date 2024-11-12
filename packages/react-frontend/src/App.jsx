// src/pages/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import About from "./pages/About";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";


const App = () => {
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
          path="/signup"
          element={<SignUp verifySignUp={verifySignUp}/>}
        />
      </Routes>
    </Router>
    
  );
};

export default App;
