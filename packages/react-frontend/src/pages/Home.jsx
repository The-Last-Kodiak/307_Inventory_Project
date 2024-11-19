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
                img="https://i.pinimg.com/originals/07/29/24/072924e41f4a7d6bf478ea98af7bb34f.jpg" 
                name="Cal Poly Hoodie"
              ></ProductCard>
              {/* link to catalog with filter by lowest stock to highest stock */}
              <Link className="link" to="/catalog">See more here</Link>
            </div>

            <div className="flex-item">
              <h4>Best Sellers</h4>
              <ProductCard 
                img="https://th.bing.com/th/id/OIP.L_z4gSypyO9Ry7LQziNpRwHaHa?rs=1&pid=ImgDetMain" 
                name="Cal Poly Hat"
              ></ProductCard>
              {/* link to catalog with filter by highest demand to lowest demand */}
              <Link className="link" to="/catalog">See more here</Link>
            </div>

            <div className="flex-item">
              <h4>Flagged Items</h4>
              <ProductCard 
                img="https://images-na.ssl-images-amazon.com/images/I/61UksPqCFML._AC_UX569_.jpg" 
                name="Cal Poly Sweatpants"
              ></ProductCard>
              {/* link to catalog with filter by flagged items */}
              <Link className="link" to="/catalog">See more here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
