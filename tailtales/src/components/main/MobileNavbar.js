// src/components/main/MobileNavbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main/MobileNavbar.css";
import logo from "../../images/logo.png";

export default function MobileNavbar({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="mobile-navbar">
      <div className="mobile-navbar-header">
        <img
          src={logo}
          alt="Logo"
          className="logo-image"
          onClick={() => navigate("/")}
        />
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <ul className="menu">
          <li onClick={() => navigate("/shop")}>Shop</li>
          <li onClick={() => navigate("/book-appointment")}>
            Book Appointment
          </li>
          <li onClick={() => navigate("/check-appointment")}>
            Check Appointment
          </li>
          <li onClick={() => navigate("/our-story")}>Our Story</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
          <li onClick={() => navigate("/cart")}>Cart</li>
          <li onClick={() => navigate(user ? "/profile" : "/login")}>
            {user ? "Profile" : "Login"}
          </li>
        </ul>
      )}
    </nav>
  );
}
