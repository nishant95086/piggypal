import { createContext, useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Restore auth from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.token && parsed?.user) {
          setAuth(parsed);
        } else {
          localStorage.removeItem("auth");
        }
      } catch {
        localStorage.removeItem("auth");
      }
    }
    setLoading(false); 
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data?.accessToken;
      const user = res.data?.user;

      if (token && user) {
        const authData = { token, user };
        setAuth(authData);
        localStorage.setItem("auth", JSON.stringify(authData));
        return { success: true, user };
      } else {
        return { success: false, message: res.data?.message || "Login failed" };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login error",
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await API.post("/auth/register", { name, email, password });
      if (res.data?.success) return { success: true };
      return { success: false, message: res.data?.message || "Signup failed" };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup error",
      };
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};