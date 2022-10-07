<script setup lang="ts">
import Menu from "../components/Menu/Menu.vue";
</script>

<template>
  <div class="layout">
    <Menu />
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout {
  height: 100%;
  display: flex;
}
.layout__content {
  width: 100%;
  height: 100%;
}
</style>
