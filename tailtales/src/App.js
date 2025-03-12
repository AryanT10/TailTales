import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingProducts from "./components/TrendingProucts";
import AppointmentSection from "./components/AppointmentSection";
import BlogSection from "./components/BlogSection";
import SignupSection from "./components/SignupSection";
import Footer from "./components/Footer";
import OurStory from "./components/OurStory";
import "./App.css";

export default function App() {
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

          {/* Move OurStory to a Separate Route */}
          <Route path="/our-story" element={<OurStory />} />

        </Routes>
      </div>
    </Router>
  );
}