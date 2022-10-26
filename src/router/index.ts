import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import DiscussionView from "../views/DiscussionView.vue";
import ProfileView from "../views/ProfileView.vue";
import TasksView from "../views/TasksView.vue";
import ShareView from "../views/ShareView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/signup", name: "Signup", component: SignupView },
  { path: "/project/:id/discussion", name: "Discussion", component: DiscussionView },
  { path: "/project/:id/tasks", name: "Tasks", component: TasksView },
  { path: "/project/:id/share", name: "Share", component: ShareView },
  { path: "/profile/:username", name: "Profile", component: ProfileView },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
