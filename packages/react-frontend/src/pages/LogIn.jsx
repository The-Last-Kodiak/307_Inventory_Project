// src/pages/LogIn.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
import styles from "./LogIn.module.css";

const LogIn = ({ onLogin }) => {
    // we need to return a promise that connects to the backend,
    // inputing user authentication data and if successful, reroutes to the homepage
    // if error, log error in console and display an error message to user

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async () => {
        try {
            const res = await fetch(`https://307inventoryproject-a0f3f8g3dhcedrek.westus3-01.azurewebsites.net/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
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
            alert("Invalid credentials");
        }
    };

    const login = (userData) => {
        setUsername(userData.username);
        setPassword(userData.password);
        handleAuth();
    };

    return (
        <div className={`container ${styles.container}`}>
            <h1>Supply<span>Hub</span></h1>
            <LogInForm login={login}/>
        </div>
    );
};

export default LogIn;
