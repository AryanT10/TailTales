import React from "react";

export default function CheckAppointment({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem", padding: "0 2rem" }}>
      <h2>Your Appointments</h2>
      <p>Welcome, {user.displayName}! Here you can view and manage your scheduled appointments.</p>
      
      {/* Placeholder for future appointment list */}
      <div style={{ 
        margin: "2rem auto", 
        maxWidth: "600px", 
        padding: "1.5rem", 
        border: "1px solid #eee", 
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
      }}>
        <p>No appointments found yet.</p>
        <button 
          style={{
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            borderRadius: "25px",
            cursor: "pointer",
            marginTop: "1rem"
          }}
          onClick={() => alert("This feature is coming soon!")}
        >
          Book New Appointment
        </button>
      </div>
    </div>
  );
}