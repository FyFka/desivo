<script setup lang="ts">
const props = defineProps<{ color: string; name: string }>();
</script>

<template>
  <div class="label" :style="{ 'background-color': props.color }">
    <span class="label__name">
      {{ props.name }}
    </span>
  </div>
</template>

<style scoped>
.label {
  font-size: 0.75rem;
  display: inline-block;
  background-color: red;
  border-radius: 1rem;
  padding: 0 0.35rem;
}
.label__name {
  color: var(--neutral-color);
  white-space: nowrap;
}
</style>
