import React from 'react'
import { useState, useEffect } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CartPage from './components/CartPage'
import TrendingProducts from './components/TrendingProducts'
import AppointmentSection from './components/AppointmentSection'
import BlogSection from './components/BlogSection'
import BlogPost from './components/BlogPost'
import SignupSection from './components/SignupSection'
import Footer from './components/Footer'
import OurStory from './components/OurStory'
import './App.css'
import ShopInfo from './components/ShopInfo'
import ProfilePage from './components/ProfilePage';
import CheckAppointment from './components/CheckAppointment';
import Contact from './components/Contact';
import LogoutConfirmation from './components/LogoutConfirmation';
// authentication state
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
// Import CartProvider
import { CartProvider } from './context/CartContext';

// Protected route component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" state={{ from: "/check-appointment" }} replace />;
  }
  return children;
};

export default function App() {
  const [user, setUser] = useState(null);

  // Firebase listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Navbar Component so it's always visible */}
          <Navbar user={user} />

          {/* Route Definitions */}
          <Routes>
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

            <Route path="/shop" element={<ShopInfo />} />
            {/* Move OurStory to a Separate Route */}
            <Route path="/our-story" element={<OurStory />} />
            {/* Blog Post Route */}
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* Contact Page Route */}
            <Route path="/contact" element={<Contact />} />
            {/* Protected Route for Check Appointment */}
            <Route 
              path="/check-appointment" 
              element={
                <ProtectedRoute user={user}>
                  <CheckAppointment user={user} />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/cart" element={<CartPage user={user} />} />

            {/* Routes for Login, Profile, and Logout Confirmation */}
            <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />} />
            <Route path="/profile" element={<ProfilePage user={user} onLogout={() => setUser(null)} />} />
            <Route path="/logout-confirmation" element={<LogoutConfirmation />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}