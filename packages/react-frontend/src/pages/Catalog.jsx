import React, {useState, useEffect} from "react";
import Navbar from '../components/Navbar';
import TableView from './TableView';
import CardView from './CardView';
import styles from './Catalog.module.css';


const Catalog = ({user}) => {
    const [viewMode, setViewMode] = useState('table');
    const [productData, setProductData] = useState([]);
    const [overlayVisibility, setOverlayVisibility] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        supplier: '',
        description: ''
    });


    // fetch productData from api
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`https://307inventoryproject-a0f3f8g3dhcedrek.westus3-01.azurewebsites.net/inventory?username=${user.username}&password=${user.password}`);
                if (!res.ok) {
                    throw new Error ('Failed to fetch products');
                }
                const data = await res.json();
                setProductData(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

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
        try{
            const res = await fetch(`https://307inventoryproject-a0f3f8g3dhcedrek.westus3-01.azurewebsites.net/inventory?username=${user.username}&password=${user.password}`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(newProduct)
            });
            if (!res.ok) {
                throw new Error("Failed to add product");
            }
            alert("Product added successfully.");
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("An error occurred while adding the product. Please try again.");
        }
        toggleOverlay();
    };


    return (
        <div >
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.filterbar}>
                    {/* add button for adding products */}
                    {/* add bar for filtering */}
                    <button className={`btn ${styles.addBtn}`} onClick={toggleOverlay}></button>
                    <button className={`btn ${styles.viewBtn}`} onClick={() => toggleView('table')}>Table View</button>
                    <button className={`btn ${styles.viewBtn}`} onClick={() => toggleView('card')}>Card View</button>
                </div>

                <div>
                    {viewMode === 'table' ? ( <TableView productData={productData} /> ) : ( <CardView /> )}
                </div>

                {overlayVisibility && (
                    <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                            <h2>Add New Product</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Product Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={newProduct.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Price:
                                    <input
                                        type="number"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Quantity:
                                    <input
                                        type="number"
                                        name="qty"
                                        value={newProduct.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Supplier:
                                    <input
                                        type="text"
                                        name="qty"
                                        value={newProduct.supplier}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        name="qty"
                                        value={newProduct.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <button type="submit">Add Product</button>
                                <button type="button" onClick={toggleOverlay}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;