import React from "react";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
    return (
        <div className="login-background d-flex justify-content-center align-items-center vh-100">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>


            <div className="ticket-container">
                <div className="ticket-header text-center">
                    <h2 style={{ fontFamily: "Audiowide, sans-serif" }}>Admin Login</h2>
                    {/* <p style={{ fontFamily: "Space Mono" }}>Access your dashboard</p> */}
                </div>
                <form className="ticket-form mt-3">
                    <div className="form-group">
                        <label htmlFor="email" style={{ fontFamily: "Viga" }}>
                            <FaEnvelope className="me-2" /> Email
                        </label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" style={{ fontFamily: "Space Mono" }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{ fontFamily: "Viga" }}>
                            <FaLock className="me-2" /> Password
                        </label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" style={{ fontFamily: "Space Mono" }} />
                    </div>
                    <div className="text-end mb-2" style={{ fontFamily: "Space Mono" }}>
                        <a href="#" className="text-decoration-none text-muted" >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="login-button-wrapper mb-3">
                        <button className="cool-login-button">
                            Login
                        </button>
                    </div>
                    <div className="text-center google-login">
                        <FaGoogle className="google-icon me-2" /> Login with Google
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Login;
