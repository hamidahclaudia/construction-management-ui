import axios from "axios";

const API_URL = "http://localhost:5001/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response ? error.response.data : error);
    return Promise.reject(error);
  }
);

export default apiClient;
