import apiClient from "./apiClient";
import type { ProjectStage } from "../types/ProjectTypes";

export const getStages = async (): Promise<ProjectStage[]> => {
  const response = await apiClient.get<ProjectStage[]>("/projectstages");
  return response.data;
};