export interface Project {
  id: number;
  name: string;
  location: string;
  projectStageId: number;
  projectStageName?: string | null;
  projectCategoryId: number;
  projectCategoryName?: string | null;
  startDate: string; // ISO Date String
  description: string;
  userId: number;
}

export interface ProjectStage {
  id: number;
  name: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}