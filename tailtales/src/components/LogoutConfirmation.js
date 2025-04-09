import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LogoutConfirmation.css"; // Import the new CSS file

export default function LogoutConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="logout-page">
      <div className="logout-container">
        {/* Optional paw print decorations */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h1>You have logged out successfully</h1>
        <p className="logout-message">
          Thank you for visiting TailTales. We hope to see you again soon!
        </p>
        
        <button 
          className="home-button"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}