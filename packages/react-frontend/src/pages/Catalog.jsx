// react-frontend/src/pages/Catalog.jsx
import React, {useState, useEffect} from "react";
import Navbar from '../components/Navbar';
import TableView from './TableView';
import styles from './Catalog.module.css';
import * as jwt_decode from "jwt-decode";
const url = `https://307inventoryproject-a0f3f8g3dhcedrek.westus3-01.azurewebsites.net`;
// const url = `http://localhost:8000/`;


const Catalog = () => {
    const[test, setTest] = useState(false);
    const [productData, setProductData] = useState([]);
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [newProduct, setNewProduct] = useState({
        product_name: "",
        sku: "",
        price: "",
        quantity: "",
        supplier: "",
        description: ""
    });
    const [filteredData, setFilteredData] = useState([]);
    const [sortCriteria, setSortCriteria] = useState(null); 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    // fetch productData from api
    useEffect(() => {
        //if component unmounts, uses abort controller to avoid memory leaks
        const controller = new AbortController();
        const signal = controller.signal;
    
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const res = await fetch(`${url}/catalog`, { 
                    signal,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                setProductData(data);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.error("Error fetching products:", error);
                    // alert("Unable to fetch product data. Please try again later.");
                }
            }
        };
    
        fetchProducts();
    
        return () => controller.abort(); // Cleanup to avoid memory leaks
    }, []);

    useEffect(() => {
        if (sortCriteria) {
            const sortedData = applySorting(sortCriteria);
            setFilteredData(sortedData);
        } else {
            setFilteredData(productData);
        }
    }, [sortCriteria, productData]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(token) {
            const decoded = jwt_decode(token);
            setNewProduct((prevState) => ({
                ...prevState,
                username: decoded.username
            }));
        }
    }, []);

    const applySorting = (criteria) => {
        let sortedData = [...productData];
        switch (criteria) {
            case 'priceAsc':
                sortedData.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                sortedData.sort((a, b) => b.price - a.price);
                break;
            case 'quantityAsc':
                sortedData.sort((a, b) => a.quantity - b.quantity);
                break;
            case 'quantityDesc':
                sortedData.sort((a, b) => b.quantity - a.quantity);
                break;
            default:
                sortedData = productData; // No sorting
        }
        return sortedData;
    };

    const toggleTest = () => {
        setTest(!test);
    }

    const toggleOverlay = (clearEditing = true) => {
        setOverlayVisibility(!overlayVisibility);
        if (clearEditing) {
            setEditingProduct(null);
        }
    };

    const openOverlayForEditing = (product) => {
        setSelectedProduct(product);
        setEditingProduct(product);
        setOverlayVisibility(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newProduct.price <= 0 || newProduct.quantity <= 0) {
            // alert("Price and quantity must be positive numbers.");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            // alert("You must be logged in to add products");
            return;
        }

        try {
            const res = await fetch(
                `${url}/catalog`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(newProduct),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to add product");
            }
            
            const addedProduct = await res.json();
            setProductData((prevData) => [...prevData, addedProduct.product]);
            // alert("Product added successfully.");

            //reset form after submission
            setNewProduct({
                name: "",
                sku: "",
                price: "",
                quantity: "",
                supplier: "",
                description: "",
            });

            toggleOverlay();
        } catch (error) {
            console.error("Error submitting product:", error);
            // alert("An error occurred while adding the product. Please try again.");
        }
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem("jwtToken");
        try{
            const res = await fetch(`${url}/catalog/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if(!res.ok) {
                throw new Error("Failed to delete product");
            }

            setProductData((prevData) => prevData.filter((product) => product._id !== productId));
            // alert("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
            // alert("An error occurred while deleting the product. Please try again");
        }
    };

    const handleProductClick = (product) => openOverlayForEditing(product);

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditingProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitEdit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            // alert("You must be logged in to edit products");
            return;
        }

        try {
            const res = await fetch(
                `${url}/catalog/${editingProduct._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(editingProduct),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to update product");
            }

            const updatedProduct = await res.json();
            setProductData((prevData) =>
                prevData.map((product) =>
                    product._id === updatedProduct.product._id ? updatedProduct.product : product
                )
            );
            // alert("Product updated successfully.");
            toggleOverlay();
        } catch (error) {
            console.error("Error submitting product update:", error);
            // alert("An error occurred while updating the product. Please try again.");
        }
    };
    
    return (
        <div >
            <Navbar/>
                <div className={styles.container}>
                    <div className={styles.filterbar}>
                        <button className={`btn ${styles.addBtn}`} onClick={toggleOverlay}>Add Product</button>
                        <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('priceAsc')}>Sort by Price (Low to High)</button>
                        <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('priceDesc')}>Sort by Price (High to Low)</button>
                        <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('quantityAsc')}>Sort by Quantity (Low to High)</button>
                        <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('quantityDesc')}>Sort by Quantity (High to Low)</button>
                    </div>

                    <div className={`${styles.tableContainer}`}>
                        <TableView productData={filteredData} onDelete={handleDelete} handleClick={handleProductClick}/>
                    </div>

                    {overlayVisibility && (
                        <div className={`${styles.overlay} ${styles.show}`}>
                            <div className={styles.overlayContent}>
                                <button
                                    className={`btn ${styles.closeBtn}`}
                                    onClick={toggleOverlay}
                                    aria-label="Close overlay"
                                >
                                    &times;
                                </button>

                                {editingProduct ? (
                                    <>
                                        <h2>Edit Product</h2>
                                        <form onSubmit={handleSubmitEdit}>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="product_name">Product Name:</label>
                                                <input
                                                    type="text"
                                                    id="product_name"
                                                    name="product_name"
                                                    value={editingProduct.product_name}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </div>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="sku">SKU:</label>
                                                <input
                                                    type="text"
                                                    id="sku"
                                                    name="sku"
                                                    value={editingProduct.sku}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </div>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="price">Price:</label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    value={editingProduct.price}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </div>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="quantity">Quantity:</label>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    name="quantity"
                                                    value={editingProduct.quantity}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </div>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="supplier">Supplier:</label>
                                                <input
                                                    type="text"
                                                    id="supplier"
                                                    name="supplier"
                                                    value={editingProduct.supplier}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </div>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="description">Description:</label>
                                                <input
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    value={editingProduct.description}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className={styles.btn}>Save Changes</button>
                                            <button type="button" className={styles.btn} onClick={toggleOverlay}>Cancel</button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <h2>Add New Product</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="name">Product Name:</label>
                                                <input
                                                    className={`${styles.formgroupLabel}`}
                                                    type="text"
                                                    id="product_name"
                                                    name="product_name"
                                                    value={newProduct.product_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="sku">SKU:</label>
                                                <input
                                                    className={`${styles.formgroupLabel}`}
                                                    type="text"
                                                    id="sku"
                                                    name="sku"
                                                    value={newProduct.sku}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="price">Price:</label>
                                                <input
                                                    className={`${styles.formgroupLabel}`}
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    value={newProduct.price}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="quantity">Quantity:</label>
                                                <input
                                                    className={`${styles.formgroupLabel}`}
                                                    type="number"
                                                    id="quantity"
                                                    name="quantity"
                                                    value={newProduct.quantity}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="supplier">Supplier:</label>
                                                <input
                                                    className={`${styles.formgroupLabel}`}
                                                    type="text"
                                                    id="supplier"
                                                    name="supplier"
                                                    value={newProduct.supplier}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className={`${styles.formgroup}`}>

                                                <label htmlFor="description">Description:</label>
                                                <input
                                                    className={`${styles.formgroupLabel}`}
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    value={newProduct.description}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <button type="submit" className={styles.btn}>Add Product</button>
                                            <button type="button" className={styles.btn} onClick={toggleOverlay}>Cancel</button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
};

export default Catalog;