<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Project, ProjectCategory, ProjectStage } from '../types/ProjectTypes';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const isEditing = ref(false);
const newProject = ref<Project>({
    id: 0,
    name: '',
    location: '',
    projectStageId: 0,
    projectStageName: '',
    projectCategoryId: 0,
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
        newProject.value.startDate = new Date(newProject.value.startDate).toISOString();
        newProject.value.userId = Number(localStorage.getItem("id"));
        newProject.value.projectStageName = store.state.stages.find((s: ProjectStage) => s.id === newProject.value.projectStageId)?.name || '';
        newProject.value.projectCategoryName = store.state.categories.find((c: ProjectCategory) => c.id === newProject.value.projectCategoryId)?.name || '';

        if (isEditing.value) {
            await store.dispatch("updateProject", newProject.value);
        } else {
            await store.dispatch("createProject", newProject.value);
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        router.push("/projects");
    }
};

const fetchProject = async (projectId: number) => {
    try {
        const project = computed(() => store.getters.getProjectById(projectId)).value;
        newProject.value = project;
        newProject.value.startDate = formatDate(project.startDate);
    } catch (error) {
        console.error("Error fetching project:", error);
    }
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
    <section class="container mx-auto px-6 py-4">
        <form @submit.prevent="saveProject">
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base/7 font-semibold text-gray-900">{{ isEditing ? 'Edit Project' : 'New Project' }}
                    </h2>
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Name</label>
                            <div class="mt-2">
                                <input v-model="newProject.name" type="text" name="email" id="email"
                                    autocomplete="email" required
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="email" class="block text-sm/6 font-medium text-gray-900">Location</label>
                            <div class="mt-2">
                                <input v-model="newProject.location" type="text" name="email" id="email"
                                    autocomplete="email" required
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="country" class="block text-sm/6 font-medium text-gray-900">Project Stage</label>
                            <div class="mt-2 grid grid-cols-1">
                                <select v-model="newProject.projectStageId" id="country" name="country"
                                    autocomplete="country-name"
                                    class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <option v-for="stage in store.state.stages" :key="stage.id" :value="stage.id">
                                        {{ stage.name }}
                                    </option>
                                </select>
                                <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd"
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="country" class="block text-sm/6 font-medium text-gray-900">Project
                                Category</label>
                            <div class="mt-2 grid grid-cols-1">
                                <select v-model="newProject.projectCategoryId" id="country" name="country"
                                    autocomplete="country-name"
                                    class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <option v-for="category in store.state.categories" :key="category.id"
                                        :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                                <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd"
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="street-address" class="block text-sm/6 font-medium text-gray-900">Start
                                Date</label>
                            <div class="mt-2">
                                <input v-model="newProject.startDate" type="date" name="street-address"
                                    id="street-address" autocomplete="street-address"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="city" class="block text-sm/6 font-medium text-gray-900">Description</label>
                            <div class="mt-2">
                                <input v-model="newProject.description" type="text" name="city" id="city"
                                    autocomplete="address-level2"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
                <button type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
        </form>
    </section>
</template>