<script setup lang="ts">

import { onMounted, ref } from 'vue';
import ProjectItem from './ProjectItem.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const isLoading = ref(true);
const router = useRouter();

const addProject = () => {
    router.push('/projects/add');
}
onMounted(async () => {
    store.dispatch('fetchProjects');
    isLoading.value = false;
})

</script>
<template>
    <section class="bg-blue-50 px4 py-10">
        <div class="container lg:container m-auto">
            <h4 class="text-3xl font-bold text-green-500 mb-6 text-center">Projects</h4>
            <div class="flex justify-end">
                <button
                    class="mb-3 bg-green-500 hover:bg-red-600 text-white font-bold px-3 py-2 text-sm rounded-full focus:outline-none focus:shadow-outline"
                    @click="addProject()">
                    Add Project
                </button>
            </div>
            <div v-if="isLoading" class="text-center text-gray-50 oy-6">
                <PulseLoader />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-1 gap-6">
                <ProjectItem v-for="project in store.state.projects" :key="project.id" :project="project" />
            </div>
        </div>
    </section>
</template>
