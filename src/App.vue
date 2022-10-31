<script setup lang="ts">
import VueFrame from "./components/Frame.vue";
import Loader from "./components/Loader.vue";
import { reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useProjects } from "./hooks/useProjects";
import { useRoute } from "vue-router";
import { subscribeToReconnection } from "./api/connection";
import { registerConnection } from "./api/user";
import { useStore } from "./hooks/useStore";
import { useObservable } from "./hooks/useObservable";
import "vue-toastification/dist/index.css";
import { useAuth } from "./hooks/useAuth";

const { loginByToken, logout } = useAuth();
const { refreshProjects } = useProjects();
const route = useRoute();
const store = useStore();
const { subscribe, unsubscribeFromAll } = useObservable();
const state = reactive({ isLoaded: false });

watch(
  () => store.state.token,
  (token: string) => {
    if (token) {
      refreshProjects();
    }
  }
);

const reconnect = () => {
  if (store.state.token) {
    registerConnection(store.state.token);
  }
};

onMounted(async () => {
  window.addEventListener("token-expired", logout);
  subscribe(subscribeToReconnection(reconnect));
  await loginByToken();
  state.isLoaded = true;
});

onBeforeUnmount(() => {
  window.removeEventListener("token-expired", logout);
  unsubscribeFromAll();
});
</script>

<template>
  <VueFrame>
    <RouterView v-if="state.isLoaded" :key="route.path" />
    <Loader v-else />
  </VueFrame>
</template>
