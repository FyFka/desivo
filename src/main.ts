import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { key, store } from "./store";
import Toastx from "vue-toastification";
import { TOAST_CONFIG } from "./constants";

createApp(App).use(store, key).use(router).use(Toastx, TOAST_CONFIG).mount("#app");
