<script setup lang="ts">
import CreateColumn from "../Modal/CreateColumn.vue";
import { useModal } from "../../hooks/useModal";

const props = defineProps<{ projectId: string }>();
const { showModal } = useModal();

const handleNewColumn = () => {
  showModal(CreateColumn, { projectId: props.projectId });
};
</script>

<template>
  <button class="new-column" @click="handleNewColumn">
    <span class="new-column__container">
      <svg x="0" y="0" width="100%" height="100%" viewBox="0 0 18 18">
        <polygon fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.new-column {
  height: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-darker-color);
}
.new-column__container {
  display: block;
  width: 1rem;
  height: 1rem;
}
</style>
