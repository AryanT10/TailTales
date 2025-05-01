import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, app } from "./firebase";
import "../styles/provider/ProviderLogin.css";

const db = getFirestore(app);
const docSnap = await getDoc(providerRef);

export default function ProviderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Check if provider is authorized
      const providerRef = doc(db, "authorizedProviders", uid);
      const providerSnap = await getDoc(providerRef);

      if (providerSnap.exists()) {
        navigate("/provider-dashboard");
      } else {
        setError("Access denied. You are not authorized yet.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="provider-login-container">
      <h2>Provider Login</h2>
      <form onSubmit={handleLogin} className="provider-login-form">
        <input
          type="email"
          placeholder="Work Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}
