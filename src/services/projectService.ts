import apiClient from "./apiClient";
import type { Project } from "../types/ProjectTypes";

export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>("/projects");
  return response.data;
};

export const getProjectById = async (id: number): Promise<Project> => {
  const response = await apiClient.get<Project>(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData: Omit<Project, "id">): Promise<Project> => {
  const response = await apiClient.post<Project>("/projects", projectData);
  return response.data;
};

export const updateProject = async (id: number, updatedData: Partial<Project>): Promise<Project> => {
  const response = await apiClient.put<Project>(`/projects/${id}`, updatedData);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await apiClient.delete(`/projects/${id}`);
};