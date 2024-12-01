import React, {useState, useEffect} from "react";
import Navbar from '../components/Navbar';
import TableView from './TableView';
import CardView from './CardView';
import styles from './Catalog.module.css';


const Catalog = () => {
    const [viewMode, setViewMode] = useState('table');
    const [productData, setProductData] = useState([]);

    // fetch productData from api
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('https://307inventoryproject-a0f3f8g3dhcedrek.westus3-01.azurewebsites.net/inventory');
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
    }
    return (
        <div >
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.filterbar}>
                    {/* add button for adding products */}
                    {/* add bar for filtering */}
                    <button className={`btn ${styles.viewBtn}`} onClick={() => toggleView('table')}>Table View</button>
                    <button className={`btn ${styles.viewBtn}`} onClick={() => toggleView('card')}>Card View</button>
                </div>
                <div>
                    {viewMode === 'table' ? ( <TableView productData={productData} /> ) : ( <CardView /> )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;