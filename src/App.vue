<script setup lang="ts">
import VueFrame from "./components/Frame.vue";
import Loader from "./components/Loader.vue";
import { reactive, watch, onMounted, onUnmounted } from "vue";
import { useUser } from "./hooks/useUser";
import { useProjects } from "./hooks/useProjects";
import { useStore } from "vuex";
import { key } from "./store";
import { useRoute } from "vue-router";

const { loginByToken, logout } = useUser();
const { refreshProjects } = useProjects();
const route = useRoute();
const store = useStore(key);
const state = reactive({ isLoaded: false });

watch(
  () => store.state.token,
  (token: string) => {
    if (token) {
      refreshProjects();
    }
  }
);

onMounted(async () => {
  window.addEventListener("expiredToken", logout);
  await loginByToken();
  state.isLoaded = true;
});

onUnmounted(() => {
  window.removeEventListener("expiredToken", logout);
});
</script>

<template>
  <VueFrame>
    <RouterView v-if="state.isLoaded" :key="route.path" />
    <Loader v-else />
  </VueFrame>
</template>
