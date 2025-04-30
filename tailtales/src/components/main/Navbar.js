// Modified Navbar.js file
import React from "react";
import "../../styles/main/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { motion } from "framer-motion";
import { useCart } from "../../services/CartContext"; // Import useCart hook
import logo from "../../images/logo.png";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { cart } = useCart(); // Get cart from context

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Calculate total quantity for cart badge
  const cartItemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      {/* Navbar UI */}
      <motion.nav
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        {/* Logo Section, When presed on logo, It should come to homepage */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="logo-image" />
          <span>TailTales</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                navigate("/shop");
              }}
            >
              Shop
            </a>
          </li>
          <li>
            <a
              href="/book-appointment"
              onClick={(e) => {
                e.preventDefault();
                navigate("/book-appointment");
              }}
            >
              Book Appointment
            </a>
          </li>
          <li>
            <a
              href="/check-appointment"
              onClick={(e) => {
                e.preventDefault();
                navigate("/check-appointment");
              }}
            >
              Check Appointment
            </a>
          </li>
          <li>
            <a
              href="/our-story"
              onClick={(e) => {
                e.preventDefault();
                navigate("/our-story");
              }}
            >
              Our Story
            </a>
          </li>
          <li>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Cart and Profile Buttons */}
        <motion.div
          className="navbar-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            className="navbar-button cart-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/cart")}
            style={{ position: "relative" }}
          >
            Cart
            {/* Only show cart badge when user is logged in */}
            {user && cartItemCount > 0 && (
              <span
                className="cart-badge"
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#ff6b6b",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartItemCount}
              </span>
            )}
          </motion.button>
          {currentUser ? (
            <motion.button
              className="navbar-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </motion.button>
          ) : (
            <motion.button
              className="navbar-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/login")} // Navigates to login page first
            >
              Login
            </motion.button>
          )}
        </motion.div>
      </motion.nav>
    </>
  );
}
