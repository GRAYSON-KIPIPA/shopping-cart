import axios from "axios";

const BASE_URL = "http://localhost:5000";

const AxiosWithAuth = () => {
  // const token = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use(
    (config) => {
      const authToken = localStorage.getItem("authToken"); // Ensure fresh token
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return api;
};

export default AxiosWithAuth;
