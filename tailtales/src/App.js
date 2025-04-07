import React from 'react'
import { useState,useEffect } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TrendingProducts from './components/TrendingProucts'
import AppointmentSection from './components/AppointmentSection'
import BlogSection from './components/BlogSection'
import SignupSection from './components/SignupSection'
import Footer from './components/Footer'
import OurStory from './components/OurStory'
import './App.css'
import ShopInfo from './components/ShopInfo'
import ProfilePage from './components/ProfilePage';
// authentication state
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";


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
    <Router>
      <div className="App">
        {/* Navbar Component so it's always visible */}
        <Navbar />

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
          {/* New Routes for Login and Profile */}
          <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={() => setUser(null)} />} />

        </Routes>
      </div>
    </Router>
  )
}
