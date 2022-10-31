<script setup lang="ts">
import { IProject } from "../../interfaces/IProject";
import Loader from "../Loader.vue";
import Project from "./Project.vue";

const props = defineProps<{ projects: IProject[] }>();
</script>

<template>
  <div v-if="props.projects.length" class="project-list">
    <Project v-for="project of props.projects" :name="project.name" :image="project.image" :key="project.id" />
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
</style>
