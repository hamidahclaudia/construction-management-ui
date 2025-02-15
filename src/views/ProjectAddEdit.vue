<script setup lang="ts">

import { ref, onMounted } from 'vue';
import type { Project, ProjectCategory, ProjectStage } from '../types/ProjectTypes';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const store = useStore();
const toast = useToast();

const isEditing = ref(false);
const isValid = ref(false);
const newProject = ref<Project>({
    id: 0,
    name: '',
    location: '',
    projectStageId: 1,
    projectStageName: '',
    projectCategoryId: 1,
    projectCategoryName: '',
    startDate: '',
    description: '',
    userId: 0
});

const formatDate = (isoString: string) => {
    return isoString ? isoString.split("T")[0] : "";
};

const saveProject = async () => {
    try {
        if((newProject.value.projectStageId == 1 || newProject.value.projectStageId == 2 || newProject.value.projectStageId == 3)
            && new Date(newProject.value.startDate) <= new Date()) {
            toast.warning("The start date must be in the future");
            return;
        }
        
        isValid.value = true;
        newProject.value.startDate = new Date(newProject.value.startDate).toISOString();
        newProject.value.userId = Number(localStorage.getItem("id"));
        newProject.value.projectStageName = store.state.stages.find((s: ProjectStage) => s.id === newProject.value.projectStageId)?.name || '';
        newProject.value.projectCategoryName = store.state.categories.find((c: ProjectCategory) => c.id === newProject.value.projectCategoryId)?.name || '';

        if (isEditing.value) {
            await store.dispatch("updateProject", newProject.value);
            toast.success("Project updated successfully");
        } else {
            await store.dispatch("createProject", newProject.value);
            toast.success("Project added successfully");
        }
    } catch (error) {
        console.error(error);
        if (isEditing.value) {
            toast.error("Failed update project")
        }
        else {
            toast.error("Failed add project")
        }
    }
    finally {
        if(isValid.value) {
            router.push("/projects");
            isValid.value = false;
        }
    }
};

const fetchProject = async (projectId: number) => {
    try {
        console.log("Fetching project with id:", projectId);
        //const project = computed(() => store.getters.getProjectById(projectId)).value;
        const project = await store.dispatch('fetchProjectById', projectId);
        console.log("Fetched project:", project);
        newProject.value = project;
        newProject.value.startDate = formatDate(project.startDate);
    } catch (error) {
        console.error("Error fetching project:", error);
    }
};

const cancel = () => {
    router.push(`/projects`);
};

onMounted(async () => {
    store.dispatch('fetchCategories')
    store.dispatch('fetchStages')
    if (route.params.id) {
        isEditing.value = true;
        fetchProject(Number(route.params.id));
    }
});
</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="saveProject">
                    <h2 class="text-3xl text-center font-semibold mb-6">{{ isEditing ? 'Edit Project' : 'New Project' }}
                    </h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Project Name</label>
                        <input type="text" v-model="newProject.name" id="name" name="name"
                            class="border rounded w-full py-2 px-3 mb-2" required />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2"> Location </label>
                        <input type="text" v-model="newProject.location" id="location" name="location"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Company Location" required />
                    </div>

                    <div class="mb-4">
                        <label for="stage" class="block text-gray-700 font-bold mb-2">Project Stage</label>
                        <select id="stage" v-model="newProject.projectStageId" name="stage"
                            class="border rounded w-full py-2 px-3" required>
                            <option v-for="stage in store.state.stages" :key="stage.id" :value="stage.id">
                                {{ stage.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="category" class="block text-gray-700 font-bold mb-2">Project Category</label>
                        <select v-model="newProject.projectCategoryId" id="category" name="category"
                            class="border rounded w-full py-2 px-3" required>
                            <option v-for="category in store.state.categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Start Date</label>
                        <input type="date" v-model="newProject.startDate" id="startDate" name="startDate"
                            class="border rounded w-full py-2 px-3 mb-2" required />
                    </div>


                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea id="description" v-model="newProject.description" name="description"
                            class="border rounded w-full py-2 px-3" rows="4"></textarea>
                    </div>

                    <div class="flex justify-end">
                        <button
                            class="mr-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            {{ isEditing ? 'Edit Project' : 'Add New Project' }}
                        </button>
                        <button @click="cancel()"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>