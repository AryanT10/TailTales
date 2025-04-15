// src/components/ResetPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Instead of sending an email, redirect to the new password page
      // with the email as a URL parameter
      navigate(`/new-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        {/* Decorative elements */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h1>Reset Your Password</h1>
        <p className="reset-password-message">
          Enter your email address below and we'll help you to reset your password.
        </p>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleResetPassword} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/login")}
              disabled={isSubmitting}
            >
              Back to Login
            </button>
            
            <button
              type="submit"
              className="reset-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Reset Password"}
            </button>
          </div>
        </form>
        
        <div className="reset-password-footer">
          <p>
            Remember your password? <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;