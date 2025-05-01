import { useEffect, useState } from "react";
import {
  getFirestore,
  collectionGroup,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export default function ProviderDashboard({ user }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(
    () => {
      const fetchAppointments = async () => {
        if (!user) return;

        const q = query(
          collectionGroup(db, "appointments"),
          where("providerId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          ref: doc.ref,
        }));
        setAppointments(data);
      };

      fetchAppointments();
    },
    [user],
    [doc]
  );

  const handleStatusUpdate = async (ref, newStatus) => {
    await updateDoc(ref, { status: newStatus });
    setAppointments((prev) =>
      prev.map((app) =>
        app.ref.id === ref.id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Appointments</h2>
      {appointments.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "1rem",
          }}
        >
          <p>
            <strong>Pet:</strong> {app.petName}
          </p>
          <p>
            <strong>Service:</strong> {app.service?.name}
          </p>
          <p>
            <strong>Status:</strong> {app.status}
          </p>
          <button onClick={() => handleStatusUpdate(app.ref, "Completed")}>
            Mark as Completed
          </button>
          <button onClick={() => handleStatusUpdate(app.ref, "Canceled")}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
