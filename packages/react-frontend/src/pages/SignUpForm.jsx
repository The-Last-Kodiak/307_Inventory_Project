// src/pages/SignUpForm.jsx
import React, { useState } from "react";
import styles from "./LogIn.module.css";
import { Link } from "react-router-dom";

const SignUpForm = ({signup}) => {
    // reset form upon load
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    // update event target component
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const submitForm = async (event) => {
        event.preventDefault();
        if(user.password === user.confirmPassword) {
            await signup(user);
            setUser({
                email: "",
                username: "",
                password: "",
                confirmPassword: ""
            });
        } else {
            // alert("Passwords do not match");
        }
    }

    return (
        <div className={styles.authform}>
            <h2>Sign Up</h2>
            <form onSubmit={submitForm}>
                <div className={styles.formgroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email" 
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formgroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text" 
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
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
                    />
                </div>
                <div className={styles.formgroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password" 
                        name="confirmPassword"
                        id="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formgroup}>
                    <button
                        className={`btn ${styles.btn}`}
                        type="submit"
                    >Sign Up</button>
                </div>
            </form>
            <hr />
            <p className="signUpText">
                Already have an account? <Link className="link" to="/login">Log in here</Link>
            </p>
        </div>
    );
}

export default SignUpForm;