import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ img, name }) => {
  return (
    <div className={styles.card}>
      <div className={styles.productView}>
        <img src={img} alt={name} />
        <h5 className={styles.productName}>{name}</h5>
      </div>
    </div>
  );
};

export default ProductCard;
