// src/services/AppointmentService.js
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

const AppointmentService = {
  async saveAppointment(userId, appointmentData) {
    try {
      const userAppointmentsRef = collection(db, "users", userId, "appointments");
      const docRef = await addDoc(userAppointmentsRef, {
        ...appointmentData,
        status: "Confirmed",
        createdAt: new Date().toISOString()
      });
      console.log("Appointment saved to Firestore");
      return docRef.id;
    } catch (error) {
      console.error(" Error saving appointment:", error);
      throw error;
    }
  },

  async getAppointments(userId) {
    try {
      const userAppointmentsRef = collection(db, "users", userId, "appointments");
      const snapshot = await getDocs(userAppointmentsRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(" Error fetching appointments:", error);
      return [];
    }
  },

  async updateAppointment(userId, appointmentId, updates) {
    try {
      const appointmentRef = doc(db, "users", userId, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error(" Error updating appointment:", error);
      throw error;
    }
  },

  async cancelAppointment(userId, appointmentId) {
    return await this.updateAppointment(userId, appointmentId, { status: "Cancelled" });
  },

  async deleteAppointment(userId, appointmentId) {
    try {
      const appointmentRef = doc(db, "users", userId, "appointments", appointmentId);
      await deleteDoc(appointmentRef);
      console.log("Appointment deleted from Firestore");
    } catch (error) {
      console.error(" Error deleting appointment:", error);
      throw error;
    }
  }
};

export default AppointmentService;
