import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import About from "./pages/About";
import Account from "./pages/Account";


const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
    </div>
  );
};

export default App;
