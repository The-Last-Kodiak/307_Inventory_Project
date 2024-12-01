import React, {useState} from "react";
import Navbar from '../components/Navbar';
import TableView from './TableView';
import CardView from './CardView';
import styles from './Catalog.module.css';


const Catalog = ({ productData }) => {
    const [viewMode, setViewMode] = useState('table');

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