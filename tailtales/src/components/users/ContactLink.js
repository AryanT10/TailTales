import React from 'react';
import { Link } from 'react-router-dom';

const ContactLink = ({ children, className }) => {
  return (
    <Link to="/contact" className={`contact-link ${className || ''}`}>
      {children || 'Contact us'}
    </Link>
  );
};

export default ContactLink;

// Usage example:
// <p>Need help? <ContactLink /></p>