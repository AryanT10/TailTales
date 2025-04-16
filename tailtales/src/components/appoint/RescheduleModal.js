// src/components/RescheduleModal.js
import React, { useState, useEffect } from 'react';
import '../../styles/appoint/RescheduleModal.css';
import AppointmentService from "../../services/AppointmentService";

const RescheduleModal = ({ appointment, onClose, onReschedule, userId }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Set the initial date value to the current appointment date
  useEffect(() => {
    if (appointment && appointment.date) {
      setNewDate(appointment.date);
    }
  }, [appointment]);

  // Generate time slots based on selected date
  useEffect(() => {
    if (newDate) {
      const slots = [];
      // Store hours 9 AM - 5 PM with 30-minute intervals
      for (let hour = 9; hour < 17; hour++) {
        const amPm = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour <= 12 ? hour : hour - 12;
        slots.push(`${displayHour}:00 ${amPm}`);
        slots.push(`${displayHour}:30 ${amPm}`);
      }
      
      // Randomly mark some slots as unavailable for demo purposes
      const available = slots.map(slot => ({
        time: slot,
        available: Math.random() > 0.3 // 30% chance of being unavailable
      }));
      
      setAvailableTimeSlots(available);
    }
  }, [newDate]);

  // Handle time slot selection
  const handleTimeSlotSelect = (slot) => {
    if (slot.available) {
      setNewTime(slot.time);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newDate || !newTime) {
      alert("Please select both a date and time.");
      return;
    }
    
    setLoading(true);
    
    // Create updates object
    const updates = {
      date: newDate,
      time: newTime,
      status: 'Confirmed'
    };
    
    try {
      // Update the appointment using AppointmentService
      AppointmentService.updateAppointment(userId, appointment.id, updates);
      
      setTimeout(() => {
        setLoading(false);
        onReschedule(appointment.id, updates);
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      setLoading(false);
      alert("There was an error rescheduling your appointment. Please try again.");
    }
  };

  // Get minimum date (today) for date picker
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Reschedule Appointment</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p className="current-appointment-info">
            Currently scheduled: {appointment?.service?.name} for {appointment?.petName}
            <br />
            on {new Date(appointment?.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appointment?.time}
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newDate">Select New Date*</label>
              <input
                type="date"
                id="newDate"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                min={getMinDate()}
                required
              />
            </div>
            
            {newDate && (
              <div className="form-group">
                <label>Select New Time*</label>
                <div className="time-slots">
                  {availableTimeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`time-slot ${newTime === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                      onClick={() => handleTimeSlotSelect(slot)}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-button"
                disabled={!newDate || !newTime || loading}
              >
                {loading ? "Processing..." : "Confirm Reschedule"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;