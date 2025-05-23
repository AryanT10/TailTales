import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export default function ProviderServiceUpload({ user }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!user) return alert("You must be logged in.");

    try {
      await addDoc(collection(db, "services"), {
        name,
        price: parseFloat(price),
        duration: parseInt(duration),
        providerId: user.uid,
      });
      setSuccess(true);
      setName("");
      setPrice("");
      setDuration("");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload service.");
    }
  };

  return (
    <div>
      <h2>Upload a New Service</h2>
      <input
        placeholder="Service Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Duration (min)"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={handleUpload}>Add Service</button>
      {success && <p>Service added successfully!</p>}
    </div>
  );
}
