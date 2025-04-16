// src/components/BookAppointment.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../../services/firebase";
import "../../styles/appoint/BookAppointment.css";

const db = getFirestore(app);

export default function BookAppointment({ user }) {

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userPets, setUserPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  
  // Form state
  const [serviceType, setServiceType] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [petType, setPetType] = useState("");
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  // Services data
  const serviceTypes = [
    { id: "grooming", name: "Grooming", icon: "✂️" },
    { id: "veterinary", name: "Veterinary", icon: "🩺" },
    { id: "training", name: "Training", icon: "🦮" },
    { id: "specialty", name: "Specialty", icon: "🐠" }
  ];
  
  const services = {
    grooming: [
      {
        id: "full-grooming",
        name: "Full Grooming Package",
        description: "Bath, haircut, nail trim, ear cleaning",
        duration: "1.5–2 hours",
        petTypes: ["dogs", "cats"],
        price: "$45-60"
      },
      {
        id: "nail-trim",
        name: "Nail Trim Only",
        description: "Nail clipping and filing",
        duration: "15–20 minutes",
        petTypes: ["dogs", "cats", "birds", "small-pets"],
        price: "$15"
      }
    ],
    veterinary: [
      {
        id: "wellness-exam",
        name: "Annual Wellness Exam",
        description: "Physical exam, vaccinations, parasite check",
        duration: "30 minutes",
        petTypes: ["dogs", "cats", "birds", "small-pets"],
        price: "$65"
      },
      {
        id: "microchipping",
        name: "Microchipping Appointment",
        description: "Implanting a microchip, registration",
        duration: "15–30 minutes",
        petTypes: ["dogs", "cats"],
        price: "$35"
      }
    ],
    training: [
      {
        id: "puppy-socialization",
        name: "Puppy Socialization Class",
        description: "Group Session: Basic commands, playtime with other puppies",
        duration: "1 hour",
        petTypes: ["dogs"],
        price: "$30"
      },
      {
        id: "behavioral-consultation",
        name: "Behavioral Consultation",
        description: "One-on-one session with a trainer",
        duration: "45–60 minutes",
        petTypes: ["dogs", "cats"],
        price: "$50"
      }
    ],
    specialty: [
      {
        id: "wing-clipping",
        name: "Bird Wing Clipping",
        description: "Trim flight feathers",
        duration: "15–20 minutes",
        petTypes: ["birds"],
        price: "$20"
      },
      {
        id: "aquarium-maintenance",
        name: "Aquarium Maintenance Consultation",
        description: "In-store water testing, supply suggestions",
        duration: "20–30 minutes",
        petTypes: ["fish"],
        price: "$25"
      }
    ]
  };
  
  // Load user pets from localStorage on component mount
  useEffect(() => {
    if (user) {
      const fetchPets = async () => {
        try {
          const petsRef = collection(db, "users", user.uid, "pets");
          const snapshot = await getDocs(petsRef);
          const pets = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUserPets(pets);
        } catch (error) {
          console.error("Error fetching pets from Firestore:", error);
        }
      };
  
      fetchPets();
    }
  }, [user]);
  
  // Time slots
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  // Generate time slots based on selected date
  useEffect(() => {
    if (appointmentDate) {
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
  }, [appointmentDate]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login", { state: { from: "/book-appointment" } });
    }
  }, [user, navigate, loading]);
  
  // Handle pet selection
  const handlePetSelect = (petId) => {
    setSelectedPetId(petId);
    // Find the selected pet and update the form fields
    const selectedPet = userPets.find(pet => pet.id === petId);
    if (selectedPet) {
      setPetName(selectedPet.name);
      setPetType(selectedPet.type.toLowerCase() + 's');
      setPetAge(selectedPet.age);
      setPetBreed(selectedPet.breed);
    }
  };

  // Handle service type selection
  const handleServiceTypeSelect = (type) => {
    setServiceType(type);
    setSelectedService(null); // Reset selected service when type changes
  };
  
  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };
  
  // Handle time slot selection
  const handleTimeSlotSelect = (slot) => {
    if (slot.available) {
      setAppointmentTime(slot.time);
    }
  };
  
  // Check if service is compatible with selected pet type
  const isServiceCompatible = (service) => {
    return !petType || service.petTypes.includes(petType.toLowerCase());
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const appointmentData = {
      service: selectedService,
      petName: petName,
      petType: petType.replace('s', ''),
      petBreed: petBreed,
      date: appointmentDate,
      time: appointmentTime,
      price: selectedService.price,
      specialInstructions: specialInstructions,
    };
  
    try {
      await addDoc(collection(db, 'users', user.uid, 'appointments'), {
        ...appointmentData,
        status: "Confirmed",
        createdAt: new Date().toISOString()
      });
  
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving appointment:", error);
      setLoading(false);
      alert("Failed to book appointment. Try again.");
    }
  };
  
  // Reset form and start over
  const handleBookAnother = () => {
    setCurrentStep(1);
    setServiceType("");
    setSelectedService(null);
    setSelectedPetId(null);
    setPetType("");
    setPetName("");
    setPetAge("");
    setPetBreed("");
    setAppointmentDate("");
    setAppointmentTime("");
    setSpecialInstructions("");
    setSubmitted(false);
  };
  
  // Get minimum date (today) for date picker
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Validate current step before proceeding
  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return serviceType && selectedService;
    }
    if (currentStep === 2) {
      return petType && petName && petAge;
    }
    return true;
  };
  
  // Check if form is ready to submit
  const isFormValid = () => {
    return (
      serviceType &&
      selectedService &&
      petType &&
      petName &&
      petAge &&
      appointmentDate &&
      appointmentTime
    );
  };

  return (
    <div className="book-appointment-page">
      <div className="book-appointment-container">
        {/* Decorative elements */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h2>Book an Appointment</h2>
        <p className="book-appointment-welcome">
          Welcome, {user?.displayName || "Guest"}! Schedule your pet's appointment with our professional staff.
        </p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="appointment-form-section">
                <h3>Step 1: Select a Service</h3>
                
                <div className="service-type-selector">
                  {serviceTypes.map((type) => (
                    <div
                    key={type.id}
                    className={`service-type-button ${serviceType === type.id ? 'active' : ''}`}
                    onClick={() => handleServiceTypeSelect(type.id)}
                  >
                    <span className="service-icon">{type.icon}</span>
                    <p>{type.name}</p>
                  </div>
                  ))}
                </div>
                
                {serviceType && (
                  <div className="service-options">
                    <h3>Available Services</h3>
                    {services[serviceType].map((service) => (
                      <div
                        key={service.id}
                        className={`service-option ${selectedService?.id === service.id ? 'selected' : ''}`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        <div className="service-option-details">
                          <div className="service-option-name">{service.name}</div>
                          <div className="service-option-description">{service.description}</div>
                          <div className="service-option-duration">Duration: {service.duration}</div>
                        </div>
                        <div className="service-option-price">{service.price}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToNextStep()}
                    style={{ opacity: canProceedToNextStep() ? 1 : 0.5 }}
                  >
                    Next: Pet Information
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Pet Information */}
            {currentStep === 2 && (
              <div className="appointment-form-section">
                <h3>Step 2: Pet Information</h3>
                
                {/* Pet Selection Section */}
                {userPets.length > 0 && (
                  <div className="pet-selection-section">
                    <h4>Select from your pets</h4>
                    <div className="pet-selection-list">
                      {userPets.map((pet) => (
                        <div 
                        key={pet.id}
                        className={`pet-selection-item ${selectedPetId === pet.id ? 'selected' : ''}`}
                        onClick={() => handlePetSelect(pet.id)}
                      >
                        <div className="pet-avatar">
                          {pet.type.charAt(0)}
                        </div>
                        <div className="pet-info">
                          <span className="pet-name">{pet.name}</span>
                          <span className="pet-details">{pet.type} • {pet.age}</span>
                        </div>
                      </div>
                      ))}
                    </div>
                    <div className="or-divider">
                      <span>OR</span>
                    </div>
                  </div>
                )}
                
                <div className="appointment-form-row">
                  <div className="form-group">
                    <label htmlFor="petType">Pet Type*</label>
                    <select
                      id="petType"
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      required
                    >
                      <option value="">Select Pet Type</option>
                      <option value="dogs">Dog</option>
                      <option value="cats">Cat</option>
                      <option value="birds">Bird</option>
                      <option value="fish">Fish</option>
                      <option value="small-pets">Small Pet (Hamster, Guinea Pig, etc.)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="petName">Pet Name*</label>
                    <input
                      type="text"
                      id="petName"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="appointment-form-row">
                  <div className="form-group">
                    <label htmlFor="petAge">Pet Age*</label>
                    <input
                      type="text"
                      id="petAge"
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      placeholder="E.g., 2 years"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="petBreed">Pet Breed (Optional)</label>
                    <input
                      type="text"
                      id="petBreed"
                      value={petBreed}
                      onChange={(e) => setPetBreed(e.target.value)}
                      placeholder="E.g., Golden Retriever"
                    />
                  </div>
                </div>
                
                {petType && selectedService && !isServiceCompatible(selectedService) && (
                  <div style={{ 
                    color: '#ff6b6b',
                    padding: '10px', 
                    background: '#fff0f0', 
                    borderRadius: '8px',
                    marginTop: '15px'
                  }}>
                    ⚠️ The selected service is not available for {petType}. Please select another service.
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={() => setCurrentStep(1)}
                    style={{ background: '#f0f0f0', color: '#333' }}
                  >
                    Back
                  </button>
                  
                  <button
                    type="button"
                    className="submit-button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedToNextStep() || (petType && selectedService && !isServiceCompatible(selectedService))}
                    style={{ opacity: (canProceedToNextStep() && (petType && selectedService ? isServiceCompatible(selectedService) : true)) ? 1 : 0.5 }}
                  >
                    Next: Schedule
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Date and Time Selection */}
            {currentStep === 3 && (
              <div className="appointment-form-section">
                <h3>Step 3: Schedule Appointment</h3>
                
                <div className="appointment-form-row">
                  <div className="form-group">
                    <label htmlFor="appointmentDate">Select Date*</label>
                    <input
                      type="date"
                      id="appointmentDate"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      min={getMinDate()}
                      required
                    />
                  </div>
                </div>
                
                {appointmentDate && (
                  <div className="form-group">
                    <label>Select Time*</label>
                    <div className="time-slots">
                      {availableTimeSlots.map((slot, index) => (
                        <div
                        key={`${slot.time}-${index}`}
                        className={`time-slot ${appointmentTime === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                        onClick={() => handleTimeSlotSelect(slot)}
                      >
                        {slot.time}
                      </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="specialInstructions">Special Instructions (Optional)</label>
                  <textarea
                    id="specialInstructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requirements or information we should know about your pet..."
                  ></textarea>
                </div>
                
                {/* Appointment Summary */}
                {selectedService && petName && appointmentDate && appointmentTime && (
                  <div className="appointment-summary">
                    <h3 className="summary-title">Appointment Summary</h3>
                    
                    <div className="summary-item">
                      <span className="summary-label">Service:</span>
                      <span className="summary-value">{selectedService.name}</span>
                    </div>
                    
                    <div className="summary-item">
                      <span className="summary-label">Pet:</span>
                      <span className="summary-value">{petName} ({petType.replace('s', '')})</span>
                    </div>
                    
                    <div className="summary-item">
                      <span className="summary-label">Date:</span>
                      <span className="summary-value">{formatDate(appointmentDate)}</span>
                    </div>
                    
                    <div className="summary-item">
                      <span className="summary-label">Time:</span>
                      <span className="summary-value">{appointmentTime}</span>
                    </div>
                    
                    <div className="summary-item">
                      <span className="summary-label">Price:</span>
                      <span className="summary-value">{selectedService.price}</span>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={() => setCurrentStep(2)}
                    style={{ background: '#f0f0f0', color: '#333' }}
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={!isFormValid() || loading}
                    style={{ opacity: isFormValid() && !loading ? 1 : 0.5 }}
                  >
                    {loading ? "Processing..." : "Confirm Appointment"}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          <div className="appointment-form-section">
            <div className="success-message">
              <span className="success-icon">✅</span>
              <span>Appointment booked successfully!</span>
            </div>
            
            <div className="appointment-summary">
              <h3 className="summary-title">Booking Confirmation</h3>
              
              <div className="summary-item">
                <span className="summary-label">Service:</span>
                <span className="summary-value">{selectedService.name}</span>
              </div>
              
              <div className="summary-item">
                <span className="summary-label">Pet:</span>
                <span className="summary-value">{petName} ({petType.replace('s', '')})</span>
              </div>
              
              <div className="summary-item">
                <span className="summary-label">Date:</span>
                <span className="summary-value">{formatDate(appointmentDate)}</span>
              </div>
              
              <div className="summary-item">
                <span className="summary-label">Time:</span>
                <span className="summary-value">{appointmentTime}</span>
              </div>
              
              <div className="summary-item">
                <span className="summary-label">Price:</span>
                <span className="summary-value">{selectedService.price}</span>
              </div>
            </div>
            
            <p style={{ marginTop: '20px', fontSize: '16px', color: '#555' }}>
              A confirmation email has been sent to {user?.email}. You can also view your appointment details in the <a href="/check-appointment" style={{ color: '#ff6b6b', textDecoration: 'underline' }}>Check Appointment</a> section.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
              <button
                type="button"
                className="submit-button"
                onClick={handleBookAnother}
                style={{ background: '#f0f0f0', color: '#333' }}
              >
                Book Another Appointment
              </button>
              
              <button
                type="button"
                className="submit-button"
                onClick={() => navigate("/check-appointment")}
              >
                View My Appointments
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}