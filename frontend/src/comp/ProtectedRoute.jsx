import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return null; 
  if (!auth?.token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;