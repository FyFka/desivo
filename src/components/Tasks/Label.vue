<script setup lang="ts">
const props = defineProps<{ color: string; name: string }>();
</script>

<template>
  <div class="label" :style="{ backgroundColor: props.color }">
    <span class="label__name">
      {{ props.name }}
    </span>
  </div>
</template>

<style scoped>
.label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  border-radius: 1rem;
  padding: 0 0.5rem;
  background-color: var(--the-darkest-color);
}
.label__name {
  color: var(--neutral-color);
  white-space: nowrap;
}
</style>
