// src/components/ProfilePage.js
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import "../../styles/users/ProfilePage.css";
import AddPetForm from '../appoint/AddPetForm'; // Import the AddPetForm component
import EditPetForm from '../appoint/EditPetForm'; // Import the EditPetForm component

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  // Pet management state variables
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [pets, setPets] = useState([]);
  
  // Load pets from localStorage on component mount
  useEffect(() => {
    const savedPets = localStorage.getItem('userPets');
    if (savedPets && user) {
      try {
        const parsedPets = JSON.parse(savedPets);
        setPets(parsedPets[user.uid] || []);
      } catch (error) {
        console.error("Error parsing saved pets:", error);
      }
    }
  }, [user]);
  
  // Save pets to localStorage when they change
  useEffect(() => {
    if (user && pets.length > 0) {
      const savedPets = JSON.parse(localStorage.getItem('userPets') || '{}');
      savedPets[user.uid] = pets;
      localStorage.setItem('userPets', JSON.stringify(savedPets));
    }
  }, [pets, user]);
  
  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Generate initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get display name or extract username from email
  const getDisplayName = () => {
    if (user.displayName) {
      return user.displayName;
    } else if (user.email) {
      // Extract the part before @ from the email
      return user.email.split('@')[0];
    }
    return "User";
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Notify parent that user logged out
      navigate("/logout-confirmation"); // Navigate to logout confirmation page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Handle Add Pet button click
  const handleAddPetClick = () => {
    setShowAddPetForm(true);
    setEditingPet(null); // Make sure we're not in edit mode
  };
  
  // Handle Edit Pet button click
  const handleEditPetClick = (pet) => {
    setEditingPet(pet);
    setShowAddPetForm(false); // Make sure we're not in add mode
  };
  
  // Handle saving a new pet
  const handleSavePet = (newPet) => {
    setPets([...pets, newPet]);
    setShowAddPetForm(false);
  };
  
  // Handle updating an existing pet
  const handleUpdatePet = (updatedPet) => {
    const updatedPets = pets.map(pet => 
      pet.id === updatedPet.id ? updatedPet : pet
    );
    setPets(updatedPets);
    setEditingPet(null);
  };
  
  // Handle deleting a pet
  const handleDeletePet = (petId) => {
    if (window.confirm("Are you sure you want to remove this pet?")) {
      const updatedPets = pets.filter(pet => pet.id !== petId);
      setPets(updatedPets);
    }
  };

  if (!user) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Please log in first.</h2>;
  }

  // Format the account creation date
  const creationDate = new Date(user.metadata.creationTime);
  const formattedDate = creationDate.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  // Use the new function to get the display name
  const displayName = getDisplayName();

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Decorative elements */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h1>My Profile</h1>
        <p className="profile-welcome">
          Welcome back, {displayName}! Manage your account and pet care journey from here.
        </p>

        <div className="profile-content">
          <div className="profile-card user-info">
            <div className="profile-avatar-container">
              {!imageError && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="profile-avatar"
                  onError={handleImageError}
                />
              ) : (
                <div className="profile-avatar-fallback">
                  {getInitials(displayName)}
                </div>
              )}
            </div>
            <h2>{displayName}</h2>
            <div className="profile-info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="profile-info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">{formattedDate}</span>
            </div>
            {user.emailVerified && (
              <div className="profile-info-item">
                <span className="info-label">Status:</span>
                <span className="info-value" style={{ color: '#4CAF50' }}>
                  ✓ Email Verified
                </span>
              </div>
            )}
          </div>

          <div className="profile-card quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button 
                className="action-button"
                onClick={() => navigate("/book-appointment")}
              >
                Book Appointment
              </button>
              <button 
                className="action-button"
                onClick={() => navigate("/check-appointment")}
              >
                Check Appointments
              </button>
              <button 
                className="action-button"
                onClick={() => navigate("/shop")}
              >
                Shop Products
              </button>
              <button 
                className="action-button"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>

        <div className="profile-card recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-empty">
            <p>No recent activities to display.</p>
          </div>
        </div>

        <div className="profile-card pet-profiles">
          <h3>My Pets</h3>
          {!showAddPetForm && !editingPet && (
            <>
              {pets.length === 0 ? (
                <div className="pet-profiles-empty">
                  <p>You haven't added any pets yet.</p>
                  <button className="add-pet-button" onClick={handleAddPetClick}>Add a Pet</button>
                </div>
              ) : (
                <div className="pet-list">
                  {pets.map(pet => (
                    <div key={pet.id} className="pet-item">
                      <div>
                        <h4>{pet.name}</h4>
                        <p>{pet.type} • {pet.age} • {pet.breed}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          className="edit-pet-button"
                          onClick={() => handleEditPetClick(pet)}
                        >
                          Edit
                        </button>
                        <button
                          className="edit-pet-button"
                          onClick={() => handleDeletePet(pet.id)}
                          style={{
                            background: '#f0f0f0',
                            color: '#e74c3c',
                            borderColor: '#e74c3c'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    className="add-pet-button" 
                    onClick={handleAddPetClick}
                    style={{ marginTop: '15px' }}
                  >
                    Add Another Pet
                  </button>
                </div>
              )}
            </>
          )}
          
          {showAddPetForm && (
            <AddPetForm 
              onSave={handleSavePet}
              onCancel={() => setShowAddPetForm(false)}
            />
          )}
          
          {editingPet && (
            <EditPetForm 
              pet={editingPet}
              onSave={handleUpdatePet}
              onCancel={() => setEditingPet(null)}
            />
          )}
        </div>

        <div className="account-actions">
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}