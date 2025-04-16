// src/components/EditPetForm.js
import React, { useState, useEffect } from 'react';
import '../../styles/appoint/AddPetForm.css';

const EditPetForm = ({ pet, onSave, onCancel }) => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');

  // Initialize form with pet data
  useEffect(() => {
    if (pet) {
      setPetName(pet.name || '');
      setPetType(pet.type || '');
      setPetAge(pet.age || '');
      setPetBreed(pet.breed || '');
    }
  }, [pet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPet = {
      id: pet.id,
      name: petName,
      type: petType,
      age: petAge,
      breed: petBreed || 'Not specified'
    };
    onSave(updatedPet);
  };

  return (
    <div className="add-pet-form-container">
      <h3 className="add-pet-form-title">Edit Pet</h3>
      <form onSubmit={handleSubmit} className="add-pet-form">
        <div className="form-group">
          <label htmlFor="petName" className="form-label">Pet Name</label>
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
          <label htmlFor="petType" className="form-label">Pet Type</label>
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
            <option value="Small Pet">Small Pet (Hamster, Guinea Pig, etc.)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="petAge" className="form-label">Pet Age</label>
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
          <label htmlFor="petBreed" className="form-label">Pet Breed (Optional)</label>
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
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPetForm;