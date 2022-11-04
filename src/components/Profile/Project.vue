<script setup lang="ts">
const props = defineProps<{ image: string; name: string }>();
</script>

<template>
  <div class="project">
    <img class="project__project-image" v-bind:src="props.image" />
    <div class="project__info">
      <h3 class="project__title">{{ props.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.project {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 9.5rem;
  max-height: 9.5rem;
  background-color: var(--secondary-color);
  border-radius: 0.5rem;
}
.project:hover .project__info {
  opacity: 1;
}
.project__project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
.project__info {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(16, 18, 19, 0.8);
  transition: opacity 0.25s;
  overflow: hidden;
}
.project__title {
  font-size: 1.25rem;
  user-select: none;
}
</style>
