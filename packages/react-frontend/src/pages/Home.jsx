// src/pages/Home.jsx
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className="hero">
        <h1 className={styles.head}>Welcome!</h1>

        <h2 className={styles.msg}>View Your <span>Supply</span> Today</h2>

        <h3>Quick Stats</h3>

        <div className="flex-items">
          <div className="row">
            <div className="flex-item">
              <h4>Low-Stock Items</h4>
              <ProductCard 
                name="Cal Poly Hoodie" 
                price="39.99" 
                quantity="5" 
                filterLink="/catalog?sort=quantityAsc&stock=low"
              />
            </div>

            <div className="flex-item">
              <h4>Best Sellers</h4>
              <ProductCard 
                name="Cal Poly Hat" 
                price="19.99" 
                quantity="50" 
                filterLink="/catalog?sort=quantityDesc&category=bestSeller"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
