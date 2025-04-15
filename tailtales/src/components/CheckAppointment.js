// src/components/CheckAppointment.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentService from "../services/AppointmentService"; // Import the AppointmentService
import RescheduleModal from "./RescheduleModal"; // Import the new RescheduleModal component
import "../styles/CheckAppointment.css";

export default function CheckAppointment({ user }) {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Load appointments from local storage using AppointmentService
  useEffect(() => {
    if (user) {
      setLoading(true);
      
      // Simulate a short loading delay for better UX
      setTimeout(() => {
        try {
          // Use AppointmentService to fetch user appointments
          const userAppointments = AppointmentService.getAppointments(user.uid);
          console.log("Fetched appointments:", userAppointments);
          setAppointments(userAppointments);
        } catch (error) {
          console.error("Error loading appointments:", error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
  }, [user]);

  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRescheduleAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        // Cancel the appointment
        AppointmentService.cancelAppointment(user.uid, appointmentId);
        
        // Refresh the appointments list
        const updatedAppointments = AppointmentService.getAppointments(user.uid);
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        alert("There was an error cancelling your appointment. Please try again.");
      }
    }
  };

  // Handle appointment deletion
  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to permanently delete this appointment?")) {
      try {
        // Delete the appointment
        AppointmentService.deleteAppointment(user.uid, appointmentId);
        
        // Refresh the appointments list
        const updatedAppointments = AppointmentService.getAppointments(user.uid);
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("There was an error deleting your appointment. Please try again.");
      }
    }
  };

  // Handle appointment rescheduling
  const handleRescheduleComplete = (appointmentId, updates) => {
    // Refresh appointments after rescheduling
    const updatedAppointments = AppointmentService.getAppointments(user.uid);
    setAppointments(updatedAppointments);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login", { state: { from: "/check-appointment" } });
    }
  }, [user, navigate, loading]);

  return (
    <div className="check-appointment-page">
      <div className="check-appointment-container">
        {/* Decorative elements */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h2>Your Appointments</h2>
        <p className="check-appointment-welcome">
          Welcome, {user?.displayName}! Here you can view and manage your scheduled appointments.
        </p>
        
        <div className="appointment-list-container">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading your appointments...</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>{appointment.service.name}</h3>
                    <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Time:</span>
                      <span className="detail-value">{appointment.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Pet:</span>
                      <span className="detail-value">{appointment.petName} ({appointment.petType})</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value">{appointment.price}</span>
                    </div>
                    {appointment.specialInstructions && (
                      <div className="detail-row">
                        <span className="detail-label">Notes:</span>
                        <span className="detail-value">{appointment.specialInstructions}</span>
                      </div>
                    )}
                  </div>
                  
                  {appointment.status === 'Confirmed' ? (
                    <div className="appointment-actions">
                      <button 
                        className="appointment-action-btn edit"
                        onClick={() => handleRescheduleAppointment(appointment)}
                      >
                        Reschedule
                      </button>
                      <button 
                        className="appointment-action-btn cancel"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : appointment.status === 'Cancelled' && (
                    <div className="appointment-actions">
                      <button 
                        className="appointment-action-btn cancel"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "white"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <p>No appointments found yet.</p>
              <button 
                className="book-new-appointment-btn"
                onClick={handleBookAppointment}
              >
                Book New Appointment
              </button>
            </>
          )}
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <RescheduleModal
          appointment={selectedAppointment}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={handleRescheduleComplete}
          userId={user.uid}
        />
      )}
    </div>
  );
}