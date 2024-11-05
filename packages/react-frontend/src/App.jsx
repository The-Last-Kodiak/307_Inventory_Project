import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    console.log("Authentication successful")
    setIsAuthenticated(true);
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
      </Routes>
    </Router>
    
  );
};

export default App;
