import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const saved = localStorage.getItem("auth");
  if (saved) {
    try {
      const { token } = JSON.parse(saved);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {}
  }
  return config;
});

export default API;
