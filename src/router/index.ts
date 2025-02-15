import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import ProjectDashboard from "@/views/ProjectDashboard.vue";
import ProjectAddEdit from "@/views/ProjectAddEdit.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login
        },
        {
            path: "/projects",
            name: "Projects",
            component: ProjectDashboard
        },
        {
            path: "/projects/add",
            name: "AddProject",
            component: ProjectAddEdit
        },
        {
            path: "/projects/:id/edit",
            name: "EditProject",
            component: ProjectAddEdit
        }
    ]
})

export default router;