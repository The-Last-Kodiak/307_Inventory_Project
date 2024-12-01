import React from "react";
import styles from "./Catalog.module.css"

const TableView = ({ productData }) => {
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
        )
    }
    const TableBody = () => {
        return (
            <tbody>
                {productData.map((row) => (
                    <tr key={row.sku}>
                        <td>{row.sku}</td>
                        <td>{row.name}</td>
                        <td>{row.price}</td>
                        <td>{row.qty}</td>
                        <td>
                            <div className={styles.btnContainer}>
                                <button className={`btn ${styles.btn}`}>View</button>
                                <button className={`btn ${styles.btn}`}>Flag</button>
                                {/* <button onClick={() => removeProduct(sku)}>
                                    Delete
                                </button> */}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }
    return (
        <table className={styles.table}>
            <TableHeader/>
            <TableBody/>
        </table>
    );
}

export default TableView;