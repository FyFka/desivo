<script setup lang="ts">
import DeleteVue from "../Modal/Delete.vue";
import Dropdown from "../Dropdown.vue";
import { deleteColumn } from "../../api/tasks";
import { useModal } from "../../hooks/useModal";

const props = defineProps<{
  title: string;
  count: number;
  color: string;
  columnId: string;
}>();

const { showModal } = useModal();

const handleDelete = () => {
  deleteColumn(props.columnId);
};

const handleDeleteConfirm = () => {
  showModal(DeleteVue, { confirm: handleDelete, title: props.title });
};
</script>

<template>
  <div class="column-title">
    <h2 class="column-title__title">
      <span class="column-title__color" :style="{ backgroundColor: props.color }"></span>
      {{ props.title }} <span class="column-title__column-count">{{ props.count }}</span>
    </h2>
    <Dropdown>
      <template v-slot:content>
        <button @click="handleDeleteConfirm">Delete</button>
      </template>
    </Dropdown>
  </div>
</template>

<style scoped>
.column-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 1.5rem;
}
.column-title__title {
  position: relative;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  padding-left: 1rem;
  color: var(--neutral-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 10;
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
.column-title__column-count {
  display: inline-block;
  margin-left: 0.25rem;
  color: var(--secondary-light-color);
}
</style>
