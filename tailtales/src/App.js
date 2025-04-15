// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrendingProducts from './components/TrendingProducts';
import AppointmentSection from './components/AppointmentSection';
import BlogSection from './components/BlogSection';
import SignupSection from './components/SignupSection';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Registration'; // Import the new Registration component
import ProfilePage from './components/ProfilePage';
import OurStory from './components/OurStory';
import ShopInfo from './components/ShopInfo';
import CartPage from './components/CartPage';
import CheckAppointment from './components/CheckAppointment';
import BookAppointment from './components/BookAppointment';
import Contact from './components/Contact';
import LogoutConfirmation from './components/LogoutConfirmation';
import BlogPost from './components/BlogPost';

// Services
import { auth } from "./services/firebase";

// Context
import { CartProvider } from './context/CartContext';

// Styles
import './App.css';

// Protected route component
const ProtectedRoute = ({ user, children, redirectPath = "/login" }) => {
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: window.location.pathname }} replace />;
  }
  return children;
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handler for user login
  const handleLogin = (user) => {
    setUser(user);
  };

  // Handler for user logout
  const handleLogout = () => {
    setUser(null);
  };

  // If auth is still initializing, show a loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(to bottom, #fff6f6, #fff5e1)'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '30px',
          borderRadius: '12px',
          background: 'white',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            margin: '0 auto 20px',
            border: '4px solid rgba(255, 107, 107, 0.2)',
            borderRadius: '50%',
            borderTopColor: '#ff6b6b',
            animation: 'spin 1s infinite linear'
          }}></div>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>Loading TailTales</h2>
          <p style={{ color: '#666' }}>Please wait while we fetch your information...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Navbar Component so it's always visible */}
          <Navbar user={user} />

          {/* Route Definitions */}
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <TrendingProducts />
                  <AppointmentSection />
                  <BlogSection />
                  <SignupSection />
                  <Footer />
                </>
              }
            />

            {/* Shop Page */}
            <Route path="/shop" element={<ShopInfo />} />
            
            {/* Our Story Page */}
            <Route path="/our-story" element={<OurStory />} />
            
            {/* Blog Post Page */}
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Contact Page */}
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute user={user}>
                  <ProfilePage user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/check-appointment" 
              element={
                <ProtectedRoute user={user} redirectPath="/login?redirect=check-appointment">
                  <CheckAppointment user={user} />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/book-appointment" 
              element={
                <ProtectedRoute user={user} redirectPath="/login?redirect=book-appointment">
                  <BookAppointment user={user} />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute user={user} redirectPath="/login?redirect=cart">
                  <CartPage user={user} />
                </ProtectedRoute>
              } 
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Registration onLogin={handleLogin} />} /> {/* Add new Registration route */}
            <Route path="/logout-confirmation" element={<LogoutConfirmation />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}