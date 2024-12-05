// react-frontend/src/pages/Catalog.jsx
import React, {useState, useEffect} from "react";
import Navbar from '../components/Navbar';
import TableView from './TableView';
import CardView from './CardView';
import styles from './Catalog.module.css';
import * as jwt_decode from "jwt-decode";


const Catalog = () => {
    const [viewMode, setViewMode] = useState('table');
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

    // fetch productData from api
    useEffect(() => {
        //if component unmounts, uses abort controller to avoid memory leaks
        const controller = new AbortController();
        const signal = controller.signal;
    
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const res = await fetch(`http://localhost:8000/catalog`, { 
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
                    alert("Unable to fetch product data. Please try again later.");
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
    
    const toggleView = (mode) =>{
        setViewMode(mode);
    };

    const toggleOverlay = () => {
        setOverlayVisibility(!overlayVisibility);
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
            alert("Price and quantity must be positive numbers.");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("You must be logged in to add products");
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:8000/catalog`,
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
            alert("Product added successfully.");

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
            alert("An error occurred while adding the product. Please try again.");
        }
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem("jwtToken");
        try{
            const res = await fetch(`http://localhost:8000/catalog/${productId}`, {
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
            alert("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product. Please try again");
        }
    };
    
    return (
        <div >
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.filterbar}>
                    {/* add bar for filtering */}
                    <button className={`btn ${styles.addBtn}`} onClick={toggleOverlay}>Add Product</button>
                    <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('priceAsc')}>Sort by Price (Low to High)</button>
                    <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('priceDesc')}>Sort by Price (High to Low)</button>
                    <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('quantityAsc')}>Sort by Quantity (Low to High)</button>
                    <button className={`btn ${styles.filterBtn}`} onClick={() => setSortCriteria('quantityDesc')}>Sort by Quantity (High to Low)</button>
                    <button className={`btn ${styles.viewBtn}`} onClick={() => toggleView('table')}>Table View</button>
                    <button className={`btn ${styles.viewBtn}`} onClick={() => toggleView('card')}>Card View</button>
                </div>

                <div>
                    {viewMode === 'table' ? <TableView productData={filteredData} onDelete={handleDelete}/> : <CardView productData={filteredData} />}
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
                            <h2>Add New Product</h2>
                            <form onSubmit={handleSubmit}>
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

                                <button type="submit" className={styles.btn}>Add Product</button>
                                <button type="button" className={styles.btn} onClick={toggleOverlay}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;