<script setup lang="ts">
import VueFrame from "./components/Frame.vue";
import Loader from "./components/Loader.vue";
import { reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useProjects } from "./hooks/useProjects";
import { useRoute } from "vue-router";
import { subscribeToGlobalError, subscribeToReconnection } from "./api/connection";
import { registerConnection } from "./api/user";
import { useStore } from "./hooks/useStore";
import { useObservable } from "./hooks/useObservable";
import { useAuth } from "./hooks/useAuth";
import Modal from "./components/Modal/Modal.vue";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";
import { IResponse } from "./interfaces/IResponse";

const { loginByToken, logout } = useAuth();
const { refreshProjects } = useProjects();
const route = useRoute();
const store = useStore();
const { subscribe, unsubscribeFromAll } = useObservable();
const state = reactive({ isLoaded: false });
const toast = useToast();

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

const handleGlobalError = (error: IResponse) => {
  if (error.message) {
    toast.error(error.message);
  }
};

onMounted(async () => {
  window.addEventListener("token-expired", logout);
  subscribe(subscribeToReconnection(reconnect));
  subscribe(subscribeToGlobalError(handleGlobalError));
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
    <Modal />
  </VueFrame>
</template>
