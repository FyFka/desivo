<script setup lang="ts">
import VueFrame from "./components/Frame.vue";
import Loader from "./components/Loader.vue";
import { reactive, watch, onMounted, ref, onBeforeUnmount } from "vue";
import { useUser } from "./hooks/useUser";
import { useProjects } from "./hooks/useProjects";
import { useStore } from "vuex";
import { key } from "./store";
import { useRoute } from "vue-router";
import { subscribeToReconnection } from "./api/connection";
import { registerConnection } from "./api/user";

const { loginByToken, logout } = useUser();
const { refreshProjects } = useProjects();
const route = useRoute();
const store = useStore(key);
const unsubRef = ref<Function>(() => {});
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
  window.addEventListener("expiredToken", logout);
  await loginByToken();
  unsubRef.value = subscribeToReconnection(reconnect);
  state.isLoaded = true;
});

onBeforeUnmount(() => {
  window.removeEventListener("expiredToken", logout);
  unsubRef.value();
});
</script>

<template>
  <VueFrame>
    <RouterView v-if="state.isLoaded" :key="route.path" />
    <Loader v-else />
  </VueFrame>
</template>
