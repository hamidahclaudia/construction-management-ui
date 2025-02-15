<script setup lang="ts">
import { defineProps } from 'vue'
import type { Project } from '../types/ProjectTypes'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const store = useStore();
const router = useRouter();
const toast = useToast();

defineProps({
    project: {
        type: Object as () => Project,
        required: true
    }
})

const removeProject = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
        try {
            await store.dispatch('deleteProject', id);
            toast.success("Deleted project successfully")
        } catch (error) {
            console.error("Failed to delete project:", error);
            toast.error("Failed delete project")
        }
    }
};

const editProject = (project: Project) => {
    router.push(`/projects/${project.id}/edit`);
};
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div class="mb-6">
                <div class="text-gray-600 my-2">Project Category: {{ project.projectCategoryName }}</div>
                <h3 class="text-xl font-bold">{{ project.name }}</h3>
            </div>

            <div class="mb-5">
                {{ project.description }}
            </div>

            <h3 class="text-green-500 mb-2">Project Stage: {{ project.projectStageName }}</h3>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
                <div class="text-orange-700 mb-3">
                    <i class="pi pi-map-marker text-orange-700"></i>
                    {{ project.location }}
                </div>
                <div class="flex flex-col lg:flex-row justify-end">
                    <button
                        class="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        @click="editProject(project)">
                        Edit
                    </button>
                    <button
                        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        @click="removeProject(project.id)">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>