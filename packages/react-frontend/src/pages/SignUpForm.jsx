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

    // verify signup credentials here
    const submitForm = () =>{
        // verify that signup credentials meet parameters
        // not set up yet
        if( user.password === user.confirmPassword ){

            signup(user);
        }
    }

    return (
        <div className={styles.authform}>
            <h2>Sign Up</h2>
            <form>
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
                    <label htmlFor="username">Usesrname</label>
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
                        onClick={submitForm}
                    >Sign Up</button>
                </div>
            </form>
            <hr />
            <p className="signUpText">
                Already have an account? <Link className="link" to="/login">Log in here</Link>
            </p>
        </div>
    )
}

export default SignUpForm;