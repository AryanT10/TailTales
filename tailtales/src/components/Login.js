// src/components/Login.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import ContactLink from './ContactLink';
import "../styles/Login.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we have a redirect path in the state
  const from = location.state?.from || "/profile";
  
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onLogin(user);
      navigate(from); // Redirect to the original requested page
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#ff6b6b"/>
            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#ff6b6b"/>
          </svg>
        </div>
        <h2>Welcome to TailTales</h2>
        <p className="login-subtitle">
          Login to access your account and services
        </p>
        
        {from === "/check-appointment" && (
          <div className="login-message">
            Please sign in to view your appointments
          </div>
        )}
        
        <button
          onClick={handleLogin}
          className="google-login-button"
        >
          <span className="google-icon">
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
          </span>
          Sign in with Google
        </button>
        
        <div className="login-footer">
          <p>Need help? <ContactLink /></p>
        </div>
      </div>
      
      <div className="login-benefits">
        <h3>Login Benefits</h3>
        <ul>
          <li>
            <span className="benefit-icon">✓</span>
            <span>View and manage your pet appointments</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Track your pet care history</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Receive special offers and discounts</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Quick checkout for shop purchases</span>
          </li>
        </ul>
      </div>
    </div>
  );
}