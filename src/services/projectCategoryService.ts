import apiClient from "./apiClient";
import type { ProjectCategory } from "../types/ProjectTypes";

export const getCategories = async (): Promise<ProjectCategory[]> => {
  const response = await apiClient.get<ProjectCategory[]>("/projectcategories");
  return response.data;
};