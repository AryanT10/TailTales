// src/components/NewPassword.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/users/ResetPassword.css"; // Reusing existing styles

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from URL parameters when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // If no email is provided, redirect back to the first step
      navigate("/reset-password");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real implementation, you would call your API to update the password
      // For this example, we'll just simulate a successful password reset

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login", { 
          state: { 
            message: "Your password has been reset successfully. Please login with your new password." 
          } 
        });
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to reset password. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        {/* Decorative elements */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h1>Create New Password</h1>
        <p className="reset-password-message">
          Please enter a new password for your account: <strong>{email}</strong>
        </p>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">
            </span>
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            <span>Password reset successful! Redirecting to login page...</span>
          </div>
        )}
        
        {!success && (
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/reset-password")}
                disabled={isSubmitting}
              >
                Back
              </button>
              
              <button
                type="submit"
                className="reset-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Set New Password"}
              </button>
            </div>
          </form>
        )}
        
        <div className="reset-password-footer">
          <p>
            Remember your password? <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;