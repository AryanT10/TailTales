import React from "react";
import { useNavigate } from "react-router-dom";
import ContactLink from "../users/ContactLink";
import "../../styles/main/Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Handle navigation properly with React Router
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-address">
          <h3>Our Address</h3>
          <p>TailTales Pet Shop</p>
          <p>123 Maple Avenue, Suite 00</p>
          <p>Hamilton, ON L0R XXX</p>
          <p>Canada</p>
        </div>

        <div className="footer-nav">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/shop" onClick={(e) => handleNavigation(e, "/shop")}>
                Shop
              </a>
            </li>
            <li>
              <a
                href="/our-story"
                onClick={(e) => handleNavigation(e, "/our-story")}
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="/book-appointment"
                onClick={(e) => handleNavigation(e, "/book-appointment")}
              >
                Book Appointment
              </a>
            </li>
            <li>
              <a
                href="/check-appointment"
                onClick={(e) => handleNavigation(e, "/check-appointment")}
              >
                Check Appointment
              </a>
            </li>
            <li>
              <ContactLink>Contact</ContactLink>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-10c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 5.8a8.49 8.49 0 01-2.36.64 4.13 4.13 0 001.81-2.27 8.21 8.21 0 01-2.61 1 4.1 4.1 0 00-7 3.74 11.64 11.64 0 01-8.45-4.29 4.16 4.16 0 001.27 5.49 4.09 4.09 0 01-1.86-.52v.05a4.1 4.1 0 003.3 4 4.16 4.16 0 01-1.86.07 4.11 4.11 0 003.83 2.84A8.22 8.22 0 012 18.28a11.57 11.57 0 006.29 1.85A11.59 11.59 0 0020 8.45v-.53a8.43 8.43 0 002-2.12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} TailTales. All rights reserved.</p>
      </div>
    </footer>
  );
}
