//src/pages/SignUp.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import styles from "./LogIn.module.css";

const SignUp = () => {
    const navigate = useNavigate();

    const signup = async (userData) => {
        const { email, username, password, confirmPassword } = userData;

        try{
            const res = await fetch("https://307inventoryproject-a0f3f8g3dhcedrek.westus3-01.azurewebsites.net/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });
            if (!res.ok) {
                throw new Error("Signup failed");
            }

            alert("User registered successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Error during signup, please try again");
        }
    };

    return (
        <div className="flex-columns">
            <div className="row">
                <div className="column">
                    <div className="infoColumn">
                        <h1>Who are <span>we</span>?</h1>
                        <p>Supply<span>Hub</span> is a web application developed with store management in mind. Our easy to use catalog services allow stores like you to digitalize your inventory with easy. By telling you which products have low stock, which products have been selling more, and allowing you to flag your own products, we enable you to take your store to the next level</p>
                    </div>
                </div>
                <div className="column">
                    <div className={`graphicColumn ${styles.container}`}>
                        <h1>Supply<span>Hub</span></h1>
                        <div className={styles.authform}>
                            <SignUpForm signup={signup}></SignUpForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;