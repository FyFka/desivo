<script setup lang="ts">
import { IProject } from "../../interfaces/IProject";
import Loader from "../Loader.vue";

const props = defineProps<{ projects: IProject[] }>();
</script>

<template>
  <div v-if="props.projects.length" class="projects">
    <div class="projects__proj" v-for="proj of props.projects">
      <img class="projects__proj__img" v-bind:src="proj.image" />
      <div class="projects__proj-info">
        <h3 class="projects__proj-title">{{ proj.name }}</h3>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 1.25rem;
}
.projects__proj {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 9.5rem;
  max-height: 9.5rem;
  background-color: var(--secondary-color);
  border-radius: 0.5rem;
}
.projects__proj:hover .projects__proj-info {
  opacity: 1;
}
.projects__proj__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
.projects__proj-info {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #101213cb;
  transition: opacity 0.25s;
}
</style>
