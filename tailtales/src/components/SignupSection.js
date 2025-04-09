import React, { useState } from "react";
import "../styles/SignupSection.css";

export default function SignupSection() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Future functionality: Submit email to newsletter service
    console.log("Email submitted:", email);
    // Reset form
    setEmail("");
    // You could add a success message here
  };

  return (
    <section className="signup-section">
      <h2>Make Your Pet Happy Now</h2>
      <p>Don't miss a thing. Sign up to receive news and updates.</p>
      
      <form className="email-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="email-input"
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </section>
  );
}