// src/pages/LogIn.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
import styles from "./LogIn.module.css";

const LogIn = ({ onLogin }) => {
    const navigate = useNavigate();

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const handleAuth = async (userData) => {
        try {
            const res = await fetch(`http://localhost:8000/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            })
            if (!res.ok) {
                throw new Error('Authentication failed');
            }
            
            const data = await res.json();
            localStorage.setItem('jwtToken', data.token);

            onLogin();
            navigate("/home");
        } catch (error) {
            console.error("Error during authentication:", error);
            // alert("Invalid credentials");
        }
    };

    const login = (userData) => {
        handleAuth(userData);
    };

    return (
        <div className={`container ${styles.container}`}>
            <h1>Supply<span>Hub</span></h1>
            <LogInForm login={login}/>
        </div>
    );
};

export default LogIn;
