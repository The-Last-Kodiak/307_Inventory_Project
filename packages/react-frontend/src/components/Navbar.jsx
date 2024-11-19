// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <h1><Link className={`link ${styles.logo}`} to="/home">Supply<span>Hub</span></Link></h1>
      <div className={styles.links}>
        <Link className={`link ${styles.navlink}`} to="/catalog">Catalog</Link>
        <Link className={`link ${styles.navlink}`} to="/about">About</Link>
        <Link className={`link ${styles.navlink}`} to="/account">Account</Link>
        <Link className={`link ${styles.navlink}`} to="/login">Log Out</Link>
      </div>
    </nav>
  );
};

export default Navbar;
