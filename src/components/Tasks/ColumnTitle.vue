<script setup lang="ts">
import Control from "./Control.vue";
</script>

<template>
  <div class="column-title">
    <h2 class="column-title__title">New Request <span class="column-title__column-count">8</span></h2>
    <Control />
  </div>
</template>

<style scoped>
.column-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.column-title__title {
  position: relative;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  padding-left: 1rem;
  color: var(--neutral-color);
}
.column-title__title::before {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: red;
}
.column-title__column-count {
  display: inline-block;
  margin-left: 0.25rem;
  color: var(--secondary-light-color);
}
</style>
