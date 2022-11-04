<script setup lang="ts">
const props = defineProps<{ id: string; image: string; name: string }>();
</script>

<template>
  <RouterLink class="mini-project" :to="`/project/${props.id}/tasks`">
    <img class="mini-project__project-image" v-bind:src="props.image" />
    <div class="mini-project__prompt">{{ props.name }}</div>
  </RouterLink>
</template>

<style scoped>
.mini-project {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
}
.mini-project:hover {
  background-color: var(--secondary-color);
}
.mini-project:hover > .mini-project__prompt {
  display: block;
}
.mini-project__project-image {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.15rem;
}
.mini-project__prompt {
  position: absolute;
  display: none;
  left: 4.25rem;
  z-index: 4999;
  padding: 0.25rem 0.5rem;
  border-radius: 0.35rem;
  color: var(--neutral-color);
  font-size: 0.75rem;
  background-color: var(--the-darkest-color);
  border: 0.064rem solid var(--secondary-color);
  white-space: nowrap;
}
</style>
