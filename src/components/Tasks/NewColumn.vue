<script setup lang="ts">
import { reactive } from "vue";
import Modal from "../Modal/Modal.vue";
import CreateTask from "../Modal/CreateTask.vue";
import CreateColumn from "../Modal/CreateColumn.vue";

const props = defineProps({
  projectId: { type: String, required: true },
});
const state = reactive({ isActive: false });

const handleNewTask = () => {
  state.isActive = !state.isActive;
};
</script>

<template>
  <button class="new-column" @click="handleNewTask">
    <span class="new-column__inner-wrapper">
      <svg x="0" y="0" width="100%" height="100%" viewBox="0 0 18 18">
        <polygon fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
      </svg>
    </span>
  </button>
  <Modal :is-active="state.isActive" @close="state.isActive = false">
    <CreateColumn :project-id="props.projectId" @close="state.isActive = false" />
  </Modal>
</template>

<style scoped>
.new-column {
  height: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d1f20;
}
.new-column__inner-wrapper {
  display: block;
  width: 1rem;
  height: 1rem;
}
</style>
