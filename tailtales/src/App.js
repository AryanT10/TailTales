import React from "react";
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
    <div className="App">
      {/* Navbar Component */}
      <Navbar />

      {/* Other Components */}
      <HeroSection />
      <TrendingProducts />
      <AppointmentSection />
      <BlogSection />
      <SignupSection />
      <Footer />
    </div>
  );
}
