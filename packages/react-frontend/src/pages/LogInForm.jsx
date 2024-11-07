// src/pages/LogInForm.jsx
import React, { useState } from "react";
import "./LogIn.module.css";

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
    }

    // check login credentials here
    const submitForm = () =>{
        // login credentials hardcoded for testing
        if (user.username === "test" && user.password === "password") {
            login(user);
            setUser({password: ""});
        } else {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="auth-form">
            <form>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <input
                    type="button"
                    value="Submit"
                    onClick={submitForm}
                />
            </form>
        </div>
    );
}

export default LogInForm;