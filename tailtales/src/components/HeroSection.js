import React from "react";
import { motion } from "framer-motion";
// import "../styles/HeroSection.css";

export default function HeroSection() {
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <h1>Welcome to TailTales</h1>
      <p>Your one-stop destination for pet care and products.</p>
    </motion.div>
  );
}