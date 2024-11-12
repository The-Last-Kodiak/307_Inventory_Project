import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import styles from "./LogIn.module.css";

const SignUp = ({verifySignUp}) => {
    const navigate = useNavigate();

    const signup = (userData) => {
        //verifySignUp should verify that
        //password and email and username
        //are okay (i.e secure password)
        //it should also call a function
        //that will create a user and upload to db
        verifySignUp(userData);
        navigate("/login")
    }

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