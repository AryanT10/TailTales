// src/components/ProfilePage.js
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, app } from "../../services/firebase";
import { collection, getDocs, getFirestore,updateDoc, deleteDoc, doc } from "firebase/firestore";
import AppointmentService from "../../services/AppointmentService";
import { useNavigate } from "react-router-dom";
import "../../styles/users/ProfilePage.css";
import AddPetForm from '../appoint/AddPetForm'; // Import the AddPetForm component
import EditPetForm from '../appoint/EditPetForm'; // Import the EditPetForm component

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();
  const db = getFirestore(app);
  const [imageError, setImageError] = useState(false);
  const [recentAppointment, setRecentAppointment] = useState(null);

  // Pet management state variables
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [pets, setPets] = useState([]);
  
  useEffect(() => {

    

    const fetchPets = async () => {
      if (user) {
        try {
          const petsRef = collection(db, 'users', user.uid, 'pets');
          const snapshot = await getDocs(petsRef);
          const petList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPets(petList);
        } catch (err) {
          console.error("Failed to load pets from Firestore:", err);
        }
      }
    };
  
    fetchPets();
  }, [user]);

  const fetchRecentAppointment = async () => {
    if (user?.uid) {
      try {
        const allAppointments = await AppointmentService.getAppointments(user.uid);
        if (allAppointments.length > 0) {
          const sorted = allAppointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentAppointment(sorted[0]);
        }
      } catch (error) {
        console.error("Failed to fetch recent appointment:", error);
      }
    }
  };
  
  fetchRecentAppointment();

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
      // Navigate first, before changing auth state
      navigate("/logout-confirmation"); 
      
      // Then sign out and update state
      await signOut(auth);
      onLogout(); // Notify parent that user logged out
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
  const handleUpdatePet = async (updatedPet) => {
    try {
      const petRef = doc(db, 'users', user.uid, 'pets', updatedPet.id);
      await updateDoc(petRef, {
        name: updatedPet.name,
        type: updatedPet.type,
        age: updatedPet.age,
        breed: updatedPet.breed,
      });
  
      const updatedPets = pets.map((pet) =>
        pet.id === updatedPet.id ? updatedPet : pet
      );
      setPets(updatedPets);
      setEditingPet(null);
      console.log("Pet updated in Firestore");
    } catch (error) {
      console.error(" Error updating pet:", error);
    }
  };
  
  // Handle deleting a pet
  const handleDeletePet = async (petId) => {
    if (window.confirm("Are you sure you want to remove this pet?")) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'pets', petId));
        const updatedPets = pets.filter(pet => pet.id !== petId);
        setPets(updatedPets);
        console.log("Pet deleted from Firestore");
      } catch (err) {
        console.error("Error deleting pet:", err);
      }
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
            {recentAppointment ? (
            <div className="recent-appointment-summary">
            <strong>{recentAppointment.service.name}</strong> for <strong>{recentAppointment.petName}</strong><br />
            on{" "}
            {new Date(recentAppointment.date).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
              })}{" "}
              at {recentAppointment.time}
              <br />
              <span className={`status-badge ${recentAppointment.status.toLowerCase()}`}>
                Status: {recentAppointment.status}
              </span>
            </div>
          ) : (
            <div className="activity-empty">
            <p>No recent activities to display.</p>
    </div>
  )}
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
                  {/* eslint-disable-next-line no-unused-vars */}
                  {pets.map((pet) => (
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