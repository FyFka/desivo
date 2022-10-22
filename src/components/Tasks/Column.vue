<script setup lang="ts">
import NewTask from "./NewTask.vue";
import Task from "./Task.vue";
import ColumnTitle from "./ColumnTitle.vue";
</script>

<template>
  <div class="column">
    <ColumnTitle />
    <NewTask />
    <Task />
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 16rem;
  min-width: 16rem;
}
</style>
