<script setup lang="ts">
import { ILabel } from "../../interfaces/ITask";
import DeleteVue from "../Modal/Delete.vue";
import Dropdown from "../Dropdown.vue";
import { deleteTask } from "../../api/tasks";
import BigTask from "../Modal/BigTask.vue";
import Label from "./Label.vue";
import { useModal } from "../../hooks/useModal";

const props = defineProps<{
  id: string;
  title: string;
  description: string;
  labels: ILabel[];
  columnId: string;
}>();

const { showModal } = useModal();

const handleDelete = () => {
  deleteTask(props.columnId, props.id);
};

const handleTaskOpen = () => {
  showModal(BigTask, {
    id: props.id,
    title: props.title,
    description: props.description,
    labels: props.labels,
    columnId: props.columnId,
  });
};

const handleDeleteConfirm = () => {
  showModal(DeleteVue, { title: props.title, confirm: handleDelete });
};
</script>

<template>
  <div @click.self="handleTaskOpen" class="task">
    <div class="task__side-info">
      <div class="task__labels">
        <Label v-for="label of props.labels" :key="label.id" :name="label.name" :color="label.color" />
      </div>
      <Dropdown>
        <template v-slot:content>
          <button @click="handleDeleteConfirm">Delete</button>
        </template>
      </Dropdown>
    </div>
    <div class="task__info">
      <h2 class="task__title">{{ props.title }}</h2>
      <p class="task__description">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--secondary-darker-color);
  cursor: pointer;
}
.task__labels {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.3rem;
  width: 100%;
  overflow-x: auto;
}
.task__side-info {
  display: flex;
  width: 100%;
  height: 1.75rem;
}
.task__title {
  font-size: 1.15rem;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--neutral-color);
  margin: 0.5rem 0;
}
.task__info {
  overflow: hidden;
  pointer-events: none;
}
.task__description {
  font-weight: 400;
  font-size: 1rem;
  color: var(--secondary-light-color);
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
}
.task--moveable {
  border-radius: 0.5rem;
  border: 0.15rem solid var(--secondary-light-color);
}
.task--moveable > * {
  visibility: hidden;
}
</style>
