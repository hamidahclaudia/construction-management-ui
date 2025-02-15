<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import ProjectItem from './ProjectItem.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import type { Project } from '@/types/ProjectTypes';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(); // Formats to local date
};

const removeProject = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
        try {
            await store.dispatch('deleteProject', id);
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    }
};

const editProject = (project: Project) => {
    router.push(`/projects/${project.id}/edit`);
};


onMounted(async () => {
    store.dispatch('fetchProjects');
})

</script>

<template>
    <div class="container mx-auto">
        <div class="text-right pt-4">
            <router-link to="/projects/add"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded inline-block">
                Add Project
            </router-link>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Project Stage</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Project Category</th>
                        <!-- <th class="border border-gray-300 px-4 py-2 text-left">Location</th> -->
                        <th class="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="project in store.state.projects" :key="project.id" class="hover:bg-gray-50">
                        <td class="border border-gray-300 px-4 py-2">{{ project.id }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ project.name }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ project.projectStageName }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ project.projectCategoryName }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ formatDate(project.startDate) }}</td>
                        <td class="border border-gray-300 px-4 py-2">
                            <button class="px-1 py-1 rounded hover:bg-blue-600 mr-2"
                                @click="editProject(project)">
                                <i class="pi pi-pencil text-blue-700"></i>
                            </button>
                            <button class="px-1 py-1 rounded hover:bg-red-600"
                                @click="removeProject(project.id)">
                                <i class="pi pi-trash text-red-700"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<!-- <template>
    <section class="bg-blue-50 px4 py-10">
        <div class="container lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Projects
            </h2>
            <div v-if="state.isLoading" class="text-center text-gray-50 oy-6">
                <PulseLoader />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProjectItem v-for="project in state.projects" :key="project.id" :project="project"/>
            </div>
        </div>
    </section>
</template> -->

<!-- <template>
    <section>
        <div class="text-right">
            <router-link to="/addproject"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded-full inline-block">
                Add Project
            </router-link>
        </div>
        <b-table :data="state.projects" :columns="state.columns">
        </b-table>
    </section>
</template> -->
