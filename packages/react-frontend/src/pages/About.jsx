import React from 'react';
import Navbar from "../components/Navbar";
import imgsrc from "../assets/IMG_9537.jpeg";

const About = () => {
  return (
    <div className="container">
      <Navbar></Navbar>
      <div className="hero">
        <h1>About Us</h1>
        <div className="flex-columns">
          <div className="row">
            <div className="column">
              <div className="graphicColumn">
                <img src={imgsrc} alt="Waves in Big Sur" />
              </div>
            </div>
            <div className="column">
              <div className="infoColumn">
                <p>Founded at Cal Poly SLO, Supply<span>Hub</span> is a web application developed with store management in mind. Our easy to use catalog services allow stores like you to digitalize your inventory with easy. By telling you which products have low stock, which products have been selling more, and allowing you to flag your own products, we enable you to take your store to the next level</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
