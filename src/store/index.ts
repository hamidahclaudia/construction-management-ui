import { createStore } from 'vuex';
import type { Project, ProjectCategory, ProjectStage } from '@/types/ProjectTypes';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '@/services/projectService';
import { getCategories } from '@/services/projectCategoryService';
import { getStages } from '@/services/projectStageService';

export interface State {
  projects: Project[];
  categories: ProjectCategory[];
  stages: ProjectStage[];
}

export default createStore<State>({
  state: {
    projects: [],
    categories: [],
    stages: []
  },
  mutations: {
    SET_CATEGORIES(state, categories: ProjectCategory[]) {
      state.categories = categories;
    },
    SET_STAGES(state, stages: ProjectStage[]) {
      state.stages = stages;
    },
    SET_PROJECTS(state, projects: Project[]) {
      state.projects = projects;
    },
    ADD_PROJECT(state, project: Project) {
      state.projects.push(project);
    },
    UPDATE_PROJECT(state, updatedProject: Project) {
      const index = state.projects.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) state.projects[index] = updatedProject;
    },
    DELETE_PROJECT(state, id: number) {
      state.projects = state.projects.filter(p => p.id !== id);
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const categories = await getCategories();
        commit('SET_CATEGORIES', categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    async fetchStages({ commit }) {
      try {
        const stages = await getStages();
        commit('SET_STAGES', stages);
      } catch (error) {
        console.error('Failed to fetch stages:', error);
      }
    },
    async fetchProjects({ commit }) {
      try {
        const projects = await getProjects();
        commit('SET_PROJECTS', projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    },
    async fetchProjectById({ commit }, projectId: number) {
        try {
          const project = await getProjectById(projectId);
          return project;
        } catch (error) {
          console.error('Error fetching project by ID:', error);
        }
    },  
    async createProject({ commit }, project: Project) {
        try {
          const newProject = await createProject(project);
          commit('ADD_PROJECT', newProject);
        } catch (error) {
          console.error('Failed to create project:', error);
        }
      },
      async updateProject({ commit }, project: Project) {
        try {
          const updatedProject = await updateProject(project.id, project);
          commit('UPDATE_PROJECT', updatedProject);
        } catch (error) {
          console.error('Failed to update project:', error);
        }
      },
      async deleteProject({ commit }, id: number) {
        try {
          await deleteProject(id);
          commit('DELETE_PROJECT', id);
        } catch (error) {
          console.error('Failed to delete project:', error);
        }
      }
  },
  getters: {
    getProjectById: (state) => (id: number) => {
      return state.projects.find(project => project.id === id);
    }
  }
});
