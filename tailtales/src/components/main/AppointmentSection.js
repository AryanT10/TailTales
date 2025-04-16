import React from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/main/AppointmentSection.css"; // Adjust the path as necessary

export default function AppointmentSection() {
  const navigate = useNavigate();
  return (
    <section className="appointment-section">
      <div className="appointment-content">
        <h2>Book a Vet Appointment</h2>
        <p>
          Connect with professional vets and groomers for your pet's care.
          Book easily and quickly online.
        </p>
        <button onClick={() => navigate("/book-appointment")}>Book Appointment</button>
      </div>
    </section>
  );
}