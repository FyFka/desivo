<script setup lang="ts">
import { IProject } from "../../interfaces/IProject";
import Loader from "../Loader.vue";
import Project from "./Project.vue";

const props = defineProps<{ projects: IProject[]; loading: boolean }>();
</script>

<template>
  <div v-if="!props.loading" class="project-list">
    <template v-if="props.projects.length">
      <Project v-for="project of props.projects" :name="project.name" :image="project.image" :key="project.id" />
    </template>
    <h2 v-else class="project-list__empty">User has no projects yet</h2>
  </div>
  <Loader v-else />
</template>

<style scoped>
.project-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 1.25rem;
}
.project-list__empty {
  grid-column: 1/-1;
  margin: 2rem 0;
  text-align: center;
}
</style>
