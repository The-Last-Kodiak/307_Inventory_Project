import React from "react";
import styles from "./Catalog.module.css"

const TableView = ({ productData, onDelete, handleClick }) => {
    const handleDelete = (productId) => {
        onDelete(productId);
    };
    const TableHeader = () => {
        return (
            <thead className={styles.thead}>
                <tr>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
        );
    };
    const TableBody = () => {
        return (
            <tbody>
                {productData.map((product) => (
                    <tr key={product._id}>
                        <td>{product.sku}</td>
                        <td>{product.product_name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <div className={styles.btnContainer}>
                                <button className={`btn ${styles.btn}`} onClick={() => handleClick(product)}>Edit</button>
                                <button className={`btn ${styles.btn}`} onClick={() => handleDelete(product._id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };
    return (
        <table className={styles.table}>
            <TableHeader/>
            <TableBody/>
        </table>
    );
}

export default TableView;