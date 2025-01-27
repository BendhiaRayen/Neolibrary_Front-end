import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check for a token in localStorage

  if (!token) {
    // If no token exists, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // Render the protected content
};

export default ProtectedRoute;
