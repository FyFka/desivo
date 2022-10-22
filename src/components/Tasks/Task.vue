<script setup lang="ts">
import Control from "./Control.vue";
</script>

<template>
  <div class="task">
    <div class="task__wrapper">
      <div class="task__side-info">
        <div class="task__labels">
          <div class="task__label">Design</div>
          <div class="task__label">Task</div>
          <div class="task__label">Web</div>
          <div class="task__label">Den</div>
          <div class="task__label">sign</div>
        </div>
        <Control />
      </div>
      <div class="task__info">
        <h2 class="task__title">Lorem ipsum dolor sit, amet consectetur</h2>
        <p class="task__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate quia deleniti sunt minima. Ut odio
          aspernatur voluptatem laboriosam a illo officiis, atque ratione. Tempore culpa repellat doloremque temporibus
          voluptates iure.
        </p>
      </div>
    </div>
    <div class="task__additional-info"></div>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.task__wrapper {
  background-color: #1d1f20;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 0.5rem;
}
.task__additional-info {
  height: 2rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: #1d1f20;
}
.task__labels {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.3rem;
  width: 100%;
  overflow-x: auto;
}
.task__side-info {
  display: flex;
  width: 100%;
}
.task__label {
  font-size: 0.75rem;
  display: inline-block;
  background-color: red;
  border-radius: 1rem;
  padding: 0 0.35rem;
}
.task__title {
  font-size: 1.15rem;
  color: var(--neutral-color);
  margin: 0.5rem 0;
}
.task__info {
  overflow: hidden;
}
.task__description {
  font-weight: 400;
  font-size: 1rem;
  color: var(--secondary-light-color);
  margin: 0;
}
</style>
