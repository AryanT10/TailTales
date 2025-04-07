import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function ProfilePage({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Notify parent that user logged out
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  if (!user) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Please log in first.</h2>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Welcome, {user.displayName}!</h2>
      <img
        src={user.photoURL}
        alt="User Profile"
        style={{ borderRadius: "50%", width: "100px", height: "100px", margin: "1rem auto" }}
      />
      <p><strong>Email:</strong> {user.email}</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          backgroundColor: "#ff6b6b",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}
