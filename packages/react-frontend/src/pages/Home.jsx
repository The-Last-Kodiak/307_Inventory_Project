import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import About from "./About";
import Account from "./Account";

const Home = () => {
  return (
    <div>
      <Navbar>
        <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
        </Routes>
      </Navbar>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
