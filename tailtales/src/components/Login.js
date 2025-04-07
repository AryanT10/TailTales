// src/components/Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onLogin(user);
      navigate("/profile") // Send user back to App or Profile
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Login to TailTales</h2>
      <button
        onClick={handleGoogleLogin}
        style={{
          background: "#4285F4",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
