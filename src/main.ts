import { createApp } from "vue";
import "./shared/styles/colors.css";
import "./shared/styles/default.css";
import App from "./App.vue";
import router from "./router";
import { key, store } from "./store";
import Toastx from "vue-toastification";
import { TOAST_CONFIG } from "./shared/constants";

createApp(App).use(store, key).use(router).use(Toastx, TOAST_CONFIG).mount("#app");
