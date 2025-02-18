import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingProducts from "./components/TrendingProucts";
import AppointmentSection from "./components/AppointmentSection";
import BlogSection from "./components/BlogSection";
import SignupSection from "./components/SignupSection";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar Component so its always visible*/}
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
        </Routes>

      </div>
    </Router>
  );
}
