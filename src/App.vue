<script setup lang="ts">
import Welcome from "./components/Welcome.vue";
import { onMounted } from "@vue/runtime-core";
import { getFromAppStorage } from "./utils/appStorage";
import VueFrame from "./components/Frame.vue";

onMounted(async () => {
  console.log(await getFromAppStorage("cached_token"));
});
</script>

<template>
  <VueFrame>
    <Welcome />
  </VueFrame>
</template>
