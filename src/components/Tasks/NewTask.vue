<script setup lang="ts">
const handleNewTask = () => {
  console.log("new");
};
</script>

<template>
  <button class="new-task" @click="handleNewTask">
    <span class="new-task__inner-wrapper">
      <svg x="0" y="0" width="100%" height="100%" viewBox="0 0 18 18">
        <polygon fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.new-task {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #1d1f20;
}
.new-task__inner-wrapper {
  display: block;
  width: 1rem;
  height: 1rem;
}
</style>
