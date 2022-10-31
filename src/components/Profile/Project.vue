<script setup lang="ts">
const props = defineProps<{ image: string; name: string }>();
</script>

<template>
  <div class="project">
    <img class="project__img" v-bind:src="props.image" />
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
.project__img {
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
  height: 100%;
  width: 100%;
  background-color: #101213cb;
  transition: opacity 0.25s;
}
</style>
