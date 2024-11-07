// src/pages/LogIn.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
import styles from "./LogIn.module.css";

const LogIn = ({ handleAuth }) => {
    // we need to return a promise that connects to the backend,
    // inputing user authentication data and if successful, reroutes to the homepage
    // if error, log error in console and display an error message to user
    const navigate = useNavigate();

    const login = (userData) => {
        handleAuth();
        navigate("/home");
    }
    return (
    <div className={`container ${styles.container}`}>
        <h1>Supply<span>Hub</span></h1>
        <LogInForm login={login}/>
    </div>
    );
};

export default LogIn;
