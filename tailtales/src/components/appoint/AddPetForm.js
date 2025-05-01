import React, { useState, useEffect } from "react";
import { auth, app } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import "../../styles/appoint/AddPetForm.css";

const AddPetForm = ({ onSave, onCancel }) => {
  const db = getFirestore(app);
  const [currentUser, setCurrentUser] = useState(null);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!petName || !petType || !petAge) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!currentUser) {
      setError("You must be logged in to add a pet.");
      return;
    }

    const newPet = {
      id: Date.now().toString(),
      name: petName,
      type: petType,
      age: petAge,
      breed: petBreed || "Not specified",
      createdAt: new Date().toISOString(),
    };

    try {
      const petsRef = collection(db, "users", currentUser.uid, "pets");
      const docRef = await addDoc(petsRef, newPet);
      const petWithId = { ...newPet, id: docRef.id };

      if (onSave) onSave(petWithId);
      console.log(" Pet added to Firestore");

      // Reset form fields
      setPetName("");
      setPetType("");
      setPetAge("");
      setPetBreed("");
    } catch (err) {
      console.error("Error saving pet:", err);
      setError("Failed to save pet. Please try again.");
    }
  };

  return (
    <div className="add-pet-form-container">
      <h3 className="add-pet-form-title">Add a New Pet</h3>
      <form onSubmit={handleSubmit} className="add-pet-form">
        <div className="form-group">
          <label htmlFor="petName" className="form-label">
            Pet Name
          </label>
          <input
            type="text"
            id="petName"
            className="form-input"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="petType" className="form-label">
            Pet Type
          </label>
          <select
            id="petType"
            className="form-select"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            required
          >
            <option value="">Select Pet Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Small Pet">
              Small Pet (Hamster, Guinea Pig, etc.)
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="petAge" className="form-label">
            Pet Age
          </label>
          <input
            type="text"
            id="petAge"
            className="form-input"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            placeholder="E.g., 2 years"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="petBreed" className="form-label">
            Pet Breed (Optional)
          </label>
          <input
            type="text"
            id="petBreed"
            className="form-input"
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
            placeholder="E.g., Golden Retriever"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;
