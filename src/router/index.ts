import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import SignupView from "../views/SignupView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/projects", name: "Projects", component: ProjectsView },
  { path: "/signup", name: "Signup", component: SignupView },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
