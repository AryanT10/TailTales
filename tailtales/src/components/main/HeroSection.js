import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/main/HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const decorationVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section className="hero-section">
      {/* Decorative elements */}
      <motion.div 
        className="hero-decoration paw1"
        animate="animate"
        variants={decorationVariants}
      >
        <svg width="50" height="50" viewBox="0 0 100 100" fill="#ff6b6b">
          <path d="M45,10 C55,10 55,20 55,30 C55,40 45,40 35,40 C25,40 25,30 25,20 C25,10 35,10 45,10 Z" />
          <path d="M75,25 C85,25 85,35 85,45 C85,55 75,55 65,55 C55,55 55,45 55,35 C55,25 65,25 75,25 Z" />
          <path d="M25,45 C35,45 35,55 35,65 C35,75 25,75 15,75 C5,75 5,65 5,55 C5,45 15,45 25,45 Z" />
          <path d="M55,55 C65,55 65,65 65,75 C65,85 55,85 45,85 C35,85 35,75 35,65 C35,55 45,55 55,55 Z" />
          <path d="M50,60 C60,50 70,60 75,75 C80,90 70,95 50,95 C30,95 20,90 25,75 C30,60 40,50 50,60 Z" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="hero-decoration paw2"
        animate="animate"
        variants={decorationVariants}
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="#ff6b6b">
          <path d="M45,10 C55,10 55,20 55,30 C55,40 45,40 35,40 C25,40 25,30 25,20 C25,10 35,10 45,10 Z" />
          <path d="M75,25 C85,25 85,35 85,45 C85,55 75,55 65,55 C55,55 55,45 55,35 C55,25 65,25 75,25 Z" />
          <path d="M25,45 C35,45 35,55 35,65 C35,75 25,75 15,75 C5,75 5,65 5,55 C5,45 15,45 25,45 Z" />
          <path d="M55,55 C65,55 65,65 65,75 C65,85 55,85 45,85 C35,85 35,75 35,65 C35,55 45,55 55,55 Z" />
          <path d="M50,60 C60,50 70,60 75,75 C80,90 70,95 50,95 C30,95 20,90 25,75 C30,60 40,50 50,60 Z" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <motion.h1 variants={itemVariants}>
          Welcome to TailTales
        </motion.h1>
        
        <motion.p variants={itemVariants}>
          Your one-stop destination for pet care and products.
        </motion.p>
        
        <motion.div className="hero-buttons" variants={itemVariants}>
          <button 
            className="hero-button"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>
          
          <button 
            className="hero-button secondary"
            onClick={() => navigate("/book-appointment")}
          >
            Book Appointment
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}