<script setup lang="ts">
import Sidebar from "../../components/Sidebar/Sidebar.vue";
</script>

<template>
  <div class="page-layout">
    <Sidebar />
    <div class="page-layout__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-layout {
  height: 100%;
  display: flex;
}
.page-layout__content {
  position: relative;
  width: calc(100% - 4.5rem);
  height: 100%;
}
</style>
