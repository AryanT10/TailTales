import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Components/main
import Navbar from "./components/main/Navbar";
import HeroSection from "./components/main/HeroSection";
import TrendingProducts from "./components/main/TrendingProducts";
import AppointmentSection from "./components/main/AppointmentSection";
import BlogSection from "./components/main/BlogSection";
import SignupSection from "./components/main/SignupSection";
import Footer from "./components/main/Footer";
import MobileNavbar from "./components/main/MobileNavbar";

// Components/services
import { auth } from "./services/firebase";
import { CartProvider } from "./services/CartContext";
import ShopInfo from "./services/ShopInfo";
import CartPage from "./services/CartPage";
import ProtectedProviderRoute from "./services/ProtectedProviderRoute";
import ProviderDashboard from "./services/ProviderDashboard";

// Components/intro
import Contact from "./components/intro/Contact";
import BlogPost from "./components/intro/BlogPost";
import OurStory from "./components/intro/OurStory";

// Components/user
import Login from "./components/users/Login";
import Registration from "./components/users/Registration";
import ResetPassword from "./components/users/ResetPassword";
import NewPassword from "./components/users/NewPassword";
import ProfilePage from "./components/users/ProfilePage";
import LogoutConfirmation from "./components/users/LogoutConfirmation";

// Components/appoint
import CheckAppointment from "./components/appoint/CheckAppointment";
import BookAppointment from "./components/appoint/BookAppointment";

// Styles
import "./styles/responsive.css";
import "./App.css";

// Protected route component
const ProtectedRoute = ({ user, children, redirectPath = "/login" }) => {
  if (!user) {
    return (
      <Navigate
        to={redirectPath}
        state={{ from: window.location.pathname }}
        replace
      />
    );
  }
  return children;
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handler for user login
  const handleLogin = (user) => {
    setUser(user);
  };

  // Handler for user logout
  const handleLogout = () => {
    setUser(null);
  };

  // If auth is still initializing, show a loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #fff6f6, #fff5e1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            borderRadius: "12px",
            background: "white",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              margin: "0 auto 20px",
              border: "4px solid rgba(255, 107, 107, 0.2)",
              borderRadius: "50%",
              borderTopColor: "#ff6b6b",
              animation: "spin 1s infinite linear",
            }}
          ></div>
          <h2 style={{ color: "#333", marginBottom: "10px" }}>
            Loading TailTales
          </h2>
          <p style={{ color: "#666" }}>
            Please wait while we fetch your information...
          </p>
        </div>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Navbar Component so it's always visible */}
          {window.innerWidth < 768 ? (
            <>
              <MobileNavbar user={user} />
              <div style={{ height: "75px" }} /> {/* Spacer */}
            </>
          ) : (
            <Navbar user={user} />
          )}

          {/* Route Definitions */}
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <TrendingProducts user={user} />
                  <AppointmentSection />
                  <BlogSection />
                  <SignupSection />
                  <Footer />
                </>
              }
            />
            <Route
              path="/provider-dashboard"
              element={
                <ProtectedProviderRoute user={user}>
                  <ProviderDashboard user={user} />
                </ProtectedProviderRoute>
              }
            />
            {/* Shop Page */}
            <Route path="/shop" element={<ShopInfo user={user} />} />
            {/* Our Story Page */}
            <Route path="/our-story" element={<OurStory />} />
            {/* Blog Post Page */}
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* Contact Page */}
            <Route path="/contact" element={<Contact />} />
            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <ProfilePage user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/check-appointment"
              element={
                <ProtectedRoute
                  user={user}
                  redirectPath="/login?redirect=check-appointment"
                >
                  <CheckAppointment user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-appointment"
              element={
                <ProtectedRoute
                  user={user}
                  redirectPath="/login?redirect=book-appointment"
                >
                  <BookAppointment user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user} redirectPath="/login?redirect=cart">
                  <CartPage user={user} />
                </ProtectedRoute>
              }
            />
            {/* Authentication Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/register"
              element={<Registration onLogin={handleLogin} />}
            />{" "}
            {/* Add new Registration route */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route
              path="/logout-confirmation"
              element={<LogoutConfirmation />}
            />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
