import React from "react";

export default function SignupSection() {
  return (
    <section className="signup-section">
      <h2>Make Your Pet Happy Now</h2>
      <p>Don’t miss a thing. Sign up to receive news and updates.</p>
      <input
        type="email"
        placeholder="Email Address"
        className="email-input"
      />
      <button className="signup-button">Sign Up</button>
    </section>
  );
}
