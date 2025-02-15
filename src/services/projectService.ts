import axios from "axios";
import type { Project } from "../types/ProjectTypes";

const API_URL = "http://localhost:5001/api/projects";

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
export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>("/");
  return response.data;
};

export const getProjectById = async (id: number): Promise<Project> => {
  const response = await apiClient.get<Project>(`/${id}`);
  return response.data;
};

export const createProject = async (projectData: Omit<Project, "id">): Promise<Project> => {
  const response = await apiClient.post<Project>("/", projectData);
  return response.data;
};

export const updateProject = async (id: number, updatedData: Partial<Project>): Promise<Project> => {
  const response = await apiClient.put<Project>(`/${id}`, updatedData);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};