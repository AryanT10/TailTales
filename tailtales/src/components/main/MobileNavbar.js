// src/components/main/MobileNavbar.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/main/MobileNavbar.css";
import logo from "../../images/logo.png";

export default function MobileNavbar({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mobile-navbar">
      <div className="mobile-navbar-header">
        <img
          src={logo}
          alt="Logo"
          className="logo-image"
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
        />
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <ul className="menu">
          <li
            className={location.pathname === "/shop" ? "active" : ""}
            onClick={() => {
              navigate("/shop");
              setOpen(false);
            }}
          >
            Shop
          </li>
          <li
            className={
              location.pathname === "/book-appointment" ? "active" : ""
            }
            onClick={() => {
              navigate("/book-appointment");
              setOpen(false);
            }}
          >
            Book Appointment
          </li>
          <li
            className={
              location.pathname === "/check-appointment" ? "active" : ""
            }
            onClick={() => {
              navigate("/check-appointment");
              setOpen(false);
            }}
          >
            Check Appointment
          </li>
          <li
            className={location.pathname === "/our-story" ? "active" : ""}
            onClick={() => {
              navigate("/our-story");
              setOpen(false);
            }}
          >
            Our Story
          </li>
          <li
            className={location.pathname === "/contact" ? "active" : ""}
            onClick={() => {
              navigate("/contact");
              setOpen(false);
            }}
          >
            Contact
          </li>
          <li
            className={location.pathname === "/cart" ? "active" : ""}
            onClick={() => {
              navigate("/cart");
              setOpen(false);
            }}
          >
            Cart
          </li>
          <li
            className={location.pathname === "/profile" ? "active" : ""}
            onClick={() => {
              navigate(user ? "/profile" : "/login");
              setOpen(false);
            }}
          >
            {user ? "Profile" : "Login"}
          </li>
        </ul>
      )}
    </nav>
  );
}
