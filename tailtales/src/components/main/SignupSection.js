// src/components/SignupSection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import "../../styles/main/SignupSection.css";

export default function SignupSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      // Check if the email exists in Firebase Authentication
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      
      // If the array has length > 0, the email exists
      if (signInMethods.length > 0) {
        // Redirect to login page
        navigate("/login", { state: { email, message: "This email is already registered. Please log in." } });
      } else {
        // Email doesn't exist, redirect to registration page
        navigate("/register", { state: { email } });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="signup-section">
      <h2>Make Your Pet Happy Now</h2>
      <p>Don't miss a thing. Sign up to receive news and updates.</p>
      
      {errorMessage && (
        <div style={{ 
          color: "#e74c3c", 
          backgroundColor: "#fff0f0", 
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "15px"
        }}>
          {errorMessage}
        </div>
      )}
      
      <form className="email-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="email-input"
          required
        />
        <button 
          type="submit" 
          className="signup-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Checking..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
}