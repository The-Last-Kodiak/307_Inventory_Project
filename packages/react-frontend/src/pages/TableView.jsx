import React from "react";

const TableView = ({ productData }) => {
    const TableHeader = () => {
        return (
            <thead>
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
                            <button>View</button>
                            <button>Flag</button>
                            {/* <button onClick={() => removeProduct(sku)}>
                                Delete
                            </button> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }
    return (
        <table>
            <TableHeader/>
            <TableBody/>
        </table>
    );
}

export default TableView;