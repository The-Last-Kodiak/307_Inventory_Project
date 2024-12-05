// src/components/ProductCard.jsx
import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ name, price, quantity, filterLink }) => {
  return (
    <div className={styles.card}>
      <div className={styles.productView}>
        <h5 className={styles.productName}>{name}</h5>
        <p className={styles.productPrice}>Price: ${price}</p>
        <p className={styles.productQuantity}>Quantity: {quantity}</p>
      </div>
      <a href={filterLink} className="link">
        See more here
      </a>
    </div>
  );
};

export default ProductCard;
