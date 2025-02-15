import axios from "axios";
import type { ProjectCategory } from "../types/ProjectTypes";

const API_URL = "http://localhost:5001/api/projectcategories";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Add request interceptor to attach token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage or Vuex/Pinia
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 API Methods
export const getCategories = async (): Promise<ProjectCategory[]> => {
  const response = await apiClient.get<ProjectCategory[]>("/");
  return response.data;
};