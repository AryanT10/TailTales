import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../services/firebase";
import RescheduleModal from "./RescheduleModal"; // Import the new RescheduleModal component
import "../../styles/appoint/CheckAppointment.css";

const db = getFirestore(app);

export default function CheckAppointment({ user }) {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Load appointments from local storage using AppointmentService
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const ref = collection(db, "users", user.uid, "appointments");
        const snapshot = await getDocs(ref);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(data);
      } catch (error) {
        console.error("Error loading appointments from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAppointments();
  }, [user]);

  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRescheduleAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const ref = doc(db, "users", user.uid, "appointments", appointmentId);
        await updateDoc(ref, { status: "Cancelled" });
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.id === appointmentId ? { ...appt, status: "Cancelled" } : appt
          )
        );
      } catch (error) {
        console.error("Error cancelling appointment:", error);
      }
    }
  };

  // Handle appointment deletion
  const handleDeleteAppointment = async (appointmentId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this appointment?"
      )
    ) {
      try {
        const ref = doc(db, "users", user.uid, "appointments", appointmentId);
        await deleteDoc(ref);
        setAppointments((prev) =>
          prev.filter((appt) => appt.id !== appointmentId)
        );
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  // Handle appointment rescheduling
  const handleRescheduleComplete = (appointmentId, updates) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId ? { ...appt, ...updates } : appt
      )
    );
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
          Welcome, {user?.displayName}! Here you can view and manage your
          scheduled appointments.
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
                    <span
                      className={`appointment-status ${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">
                        {formatDate(appointment.date)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Time:</span>
                      <span className="detail-value">{appointment.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Pet:</span>
                      <span className="detail-value">
                        {appointment.petName} ({appointment.petType})
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value">{appointment.price}</span>
                    </div>
                    {appointment.specialInstructions && (
                      <div className="detail-row">
                        <span className="detail-label">Notes:</span>
                        <span className="detail-value">
                          {appointment.specialInstructions}
                        </span>
                      </div>
                    )}
                  </div>

                  {appointment.status === "Confirmed" ? (
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
                  ) : (
                    appointment.status === "Cancelled" && (
                      <div className="appointment-actions">
                        <button
                          className="appointment-action-btn cancel"
                          onClick={() =>
                            handleDeleteAppointment(appointment.id)
                          }
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )
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
