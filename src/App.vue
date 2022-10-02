<script setup lang="ts">
import Welcome from "./components/Welcome.vue";
import { onMounted, reactive } from "@vue/runtime-core";
import { getFromAppStorage } from "./utils/appStorage";
import VueFrame from "./components/Frame.vue";
import Menu from "./components/Menu/Menu.vue";

const appState = reactive({
  isTestAuth: false,
});

onMounted(async () => {
  const token = await getFromAppStorage("cached_token");
  appState.isTestAuth = true;
});
</script>

<template>
  <VueFrame>
    <Welcome v-if="!appState.isTestAuth" />
    <Menu v-if="appState.isTestAuth" />
  </VueFrame>
</template>
