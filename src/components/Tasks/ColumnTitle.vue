<script setup lang="ts">
import { reactive } from "vue";
import Modal from "../Modal/Modal.vue";
import DeleteVue from "../Modal/Delete.vue";
import Control from "./Control.vue";
import { deleteColumn } from "../../api/tasks";

const props = defineProps<{
  title: string;
  count: number;
  color: string;
  columnId: string;
}>();

const state = reactive({ isModalActive: false });

const handleDelete = () => {
  deleteColumn(props.columnId);
};

const handleDeleteConfirm = () => {
  state.isModalActive = true;
};
</script>

<template>
  <div class="column-title">
    <h2 class="column-title__title">
      <span class="column-title__color" :style="{ 'background-color': props.color }"></span>
      {{ props.title }} <span class="column-title__column-count">{{ props.count }}</span>
    </h2>
    <Control>
      <button @click="handleDeleteConfirm">Delete</button>
    </Control>
  </div>
  <Modal :is-active="state.isModalActive" @close="state.isModalActive = false">
    <DeleteVue :confirm="handleDelete" :title="props.title" @close="state.isModalActive = false" />
  </Modal>
</template>

<style scoped>
.column-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.column-title__title {
  position: relative;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  padding-left: 1rem;
  color: var(--neutral-color);
}
.column-title__color {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--highlight-color);
}
/* .column-title__title::before {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: red;
} */
.column-title__column-count {
  display: inline-block;
  margin-left: 0.25rem;
  color: var(--secondary-light-color);
}
</style>
