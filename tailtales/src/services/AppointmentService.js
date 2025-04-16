// src/services/AppointmentService.js
// Service to manage appointment data in localStorage

class AppointmentService {
  /**
   * Save appointment to localStorage
   * @param {string} userId - User ID
   * @param {Object} appointment - Appointment data
   */
  static saveAppointment(userId, appointment) {
    try {
      // Get existing appointments
      const savedAppointments = JSON.parse(localStorage.getItem('userAppointments') || '{}');
      
      // Get user's appointments or initialize empty array
      const userAppointments = savedAppointments[userId] || [];
      
      // Add new appointment with a generated ID and default status
      const newAppointment = {
        ...appointment,
        id: Date.now(), // Use timestamp as a simple unique ID
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      
      // Add to user's appointments
      userAppointments.push(newAppointment);
      
      // Update localStorage
      savedAppointments[userId] = userAppointments;
      localStorage.setItem('userAppointments', JSON.stringify(savedAppointments));
      
      console.log('Appointment saved successfully:', newAppointment);
      return newAppointment;
    } catch (error) {
      console.error('Error saving appointment:', error);
      throw error;
    }
  }
  
  /**
   * Get all appointments for a user
   * @param {string} userId - User ID
   * @returns {Array} - Array of appointments
   */
  static getAppointments(userId) {
    try {
      const savedAppointments = JSON.parse(localStorage.getItem('userAppointments') || '{}');
      return savedAppointments[userId] || [];
    } catch (error) {
      console.error('Error retrieving appointments:', error);
      return [];
    }
  }
  
  /**
   * Update an appointment
   * @param {string} userId - User ID
   * @param {string} appointmentId - Appointment ID
   * @param {Object} updates - Fields to update
   * @returns {Object|null} - Updated appointment or null if not found
   */
  static updateAppointment(userId, appointmentId, updates) {
    try {
      const savedAppointments = JSON.parse(localStorage.getItem('userAppointments') || '{}');
      const userAppointments = savedAppointments[userId] || [];
      
      // Find the appointment index
      const appointmentIndex = userAppointments.findIndex(appt => appt.id === appointmentId);
      
      if (appointmentIndex === -1) {
        return null; // Appointment not found
      }
      
      // Update the appointment
      userAppointments[appointmentIndex] = {
        ...userAppointments[appointmentIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Save back to localStorage
      savedAppointments[userId] = userAppointments;
      localStorage.setItem('userAppointments', JSON.stringify(savedAppointments));
      
      return userAppointments[appointmentIndex];
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }
  
  /**
   * Cancel an appointment
   * @param {string} userId - User ID
   * @param {string} appointmentId - Appointment ID
   * @returns {Object|null} - Cancelled appointment or null if not found
   */
  static cancelAppointment(userId, appointmentId) {
    return this.updateAppointment(userId, appointmentId, { status: 'Cancelled' });
  }
  
  /**
   * Delete an appointment completely
   * @param {string} userId - User ID
   * @param {string} appointmentId - Appointment ID
   * @returns {boolean} - Success status
   */
  static deleteAppointment(userId, appointmentId) {
    try {
      const savedAppointments = JSON.parse(localStorage.getItem('userAppointments') || '{}');
      const userAppointments = savedAppointments[userId] || [];
      
      // Filter out the appointment to delete
      const updatedAppointments = userAppointments.filter(appt => appt.id !== appointmentId);
      
      // Save back to localStorage
      savedAppointments[userId] = updatedAppointments;
      localStorage.setItem('userAppointments', JSON.stringify(savedAppointments));
      
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return false;
    }
  }
  
  /**
   * Get a single appointment by ID
   * @param {string} userId - User ID
   * @param {string} appointmentId - Appointment ID
   * @returns {Object|null} - Appointment or null if not found
   */
  static getAppointment(userId, appointmentId) {
    try {
      const appointments = this.getAppointments(userId);
      return appointments.find(appt => appt.id === appointmentId) || null;
    } catch (error) {
      console.error('Error retrieving appointment:', error);
      return null;
    }
  }
}

export default AppointmentService;