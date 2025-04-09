import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CheckAppointment.css";

export default function CheckAppointment({ user }) {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };

  return (
    <div className="check-appointment-page">
      <div className="check-appointment-container">
        {/* Decorative elements */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h2>Your Appointments</h2>
        <p className="check-appointment-welcome">
          Welcome, {user.displayName}! Here you can view and manage your scheduled appointments.
        </p>
        
        <div className="appointment-list-container">
          <p>No appointments found yet.</p>
          <button 
            className="book-new-appointment-btn"
            onClick={handleBookAppointment}
          >
            Book New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}