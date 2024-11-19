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
        <div className="container">
            <Navbar/>
            <div>
                {/* add button for adding products */}
                {/* add bar for filtering */}
                <button onClick={() => toggleView('table')}>Table View</button>
                <button onClick={() => toggleView('card')}>Card View</button>
            </div>
            <div>
                {viewMode === 'table' ? ( <TableView productData={productData} /> ) : ( <CardView /> )}
            </div>
        </div>
    );
};

export default Catalog;