// src/pages/LogInForm.jsx
import React, { useState } from "react";
import styles from "./LogIn.module.css";
import { Link } from 'react-router-dom';

const LogInForm = ({ login }) => {
    // reset form upon load
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    // update event target component
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    // check login credentials here
    const submitForm = async (event) =>{
        event.preventDefault();
        await login(user);
        setUser({ username: "", password: ""});
    };

    return (
        <div className={styles.authform}>
            <h2>Log In</h2>
            <form onSubmit={submitForm}>
                <div className={styles.formgroup}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formgroup}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formgroup}>
                    <button
                        className={`btn ${styles.btn}`}
                        type="submit"
                    >Log In</button>
                </div>
            </form>
            <hr />
            <p className="signUpText">
                Don&apos;t have an account? <Link className="link"to="/signup">Sign up here</Link>
            </p>
        </div>
    );
}

export default LogInForm;