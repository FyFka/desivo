import { POSITION } from "vue-toastification";

export const ROOT_API = import.meta.env.VITE_ROOT_API || "http://localhost:3001";
export const HISTORY_SKIP_COUNT = Number(import.meta.env.VITE_HISTORY_SKIP_COUNT) || 25;
export const TOAST_CONFIG = { position: POSITION.BOTTOM_RIGHT, containerClassName: "app-toast" };
export const DEFAULT_COLOR = import.meta.env.VITE_DEFAULT_COLOR || "#2e81ff";
