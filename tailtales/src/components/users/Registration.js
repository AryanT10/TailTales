// src/components/Registration.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";
import "../../styles/users/Login.css"; // Reuse login styles

export default function Registration({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if we have an email from state (from SignupSection redirect)
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update the user's profile with the display name
      await updateProfile(user, {
        displayName: displayName
      });
      
      // Call the onLogin handler passed from App.js
      onLogin(user);
      
      // Redirect to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      
      // Provide user-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        setError("This email address is already registered. Please sign in instead.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak. Please choose a stronger password.");
      } else {
        setError("Registration failed. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: "500px" }}>
        <div className="login-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#ff6b6b"/>
            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#ff6b6b"/>
          </svg>
        </div>
        <h2>Create Your TailTales Account</h2>
        <p className="login-subtitle">
          Join our pet-loving community
        </p>
        
        {error && (
          <div className="login-message" style={{ backgroundColor: "#fff0f0", color: "#e74c3c" }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#444" }}>
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "15px"
              }}
              required
            />
            
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#444" }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "15px"
              }}
              required
            />
            
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#444" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "15px"
              }}
              required
            />
            
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#444" }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
              required
            />
          </div>
          
          <button
            type="submit"
            className="google-login-button"
            disabled={isSubmitting}
            style={{ width: "100%" }}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
          
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
      
      <div className="login-benefits">
        <h3>Join TailTales Today</h3>
        <ul>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Create profiles for all your pets</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Book and manage appointments easily</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Access exclusive pet care resources</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Connect with our pet-loving community</span>
          </li>
        </ul>
      </div>
    </div>
  );
}