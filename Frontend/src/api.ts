import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const useAxiosWithAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("authToken")); // Fetch token after mount
  }, []);

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return api;
};

export default useAxiosWithAuth;
