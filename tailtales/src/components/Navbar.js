import React from "react";
import "../styles/Navbar.css";
import { motion } from "framer-motion";
import logo from "../images/logo.png";

export default function Navbar() {
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.nav
      className="navbar"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span>TailTales</span>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><a href="#shop">Shop</a></li>
        <li><a href="#book-appointment">Book Appointment</a></li>
        <li><a href="#check-appointment">Check Appointment</a></li>
        <li><a href="#our-story">Our Story</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Cart and Profile Buttons */}
      <motion.div className="navbar-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.button
          className="navbar-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Cart
        </motion.button>
        <motion.button
          className="navbar-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Profile
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}
