import React from "react";
import { Navigate } from "react-router-dom";
import useProviderAuthCheck from "./ProviderAuthCheck";

export default function ProtectedProviderRoute({ user, children }) {
  const { isAuthorized, loading } = useProviderAuthCheck(user);

  if (loading) return <p>Checking authorization...</p>;

  if (!isAuthorized) {
    return <Navigate to="/" replace state={{ error: "Access denied" }} />;
  }

  return children;
}
