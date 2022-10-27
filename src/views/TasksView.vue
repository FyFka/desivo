<script setup lang="ts">
import ProjectLayout from "./Layouts/ProjectLayout.vue";
import { MenuEnum } from "../interfaces/IMenu";
import Column from "../components/Tasks/Column.vue";
import { ITask, ITaskColumn } from "../interfaces/ITask";
import { onBeforeUnmount, onMounted, reactive } from "vue";
import {
  requestColumns,
  subscribeToColumns,
  subscribeToNewColumn,
  subscribeToNewTask,
  subscribeToTasks,
  subscribeToMoveTasks,
} from "../api/tasks";
import { useRoute } from "vue-router";
import { IResponse } from "../interfaces/IResponse";
import Loader from "../components/Loader.vue";
import NewColumn from "../components/Tasks/NewColumn.vue";
import { useObservable } from "../hooks/useObservable";
import { moveTasks } from "../api/tasks";

interface ITasksState {
  columns: ITaskColumn[];
}

const route = useRoute();
const state = reactive<ITasksState>({ columns: [] });
const { subscribe, unsubscribeFromAll } = useObservable();

const handleColumns = (tasksColumns: IResponse<ITaskColumn[]>) => {
  if (tasksColumns.value) {
    state.columns = tasksColumns.value;
  }
};

const handleNewColumn = (newColumn: IResponse<ITaskColumn>) => {
  if (newColumn.value) {
    state.columns.push(newColumn.value);
  }
};

const handleNewTask = (newTask: IResponse<{ columnId: string; task: ITask }>) => {
  const value = newTask.value;
  if (value) {
    const targetIndex = state.columns.findIndex((column) => column.id === value.columnId);
    if (targetIndex !== -1) {
      state.columns[targetIndex].tasks.push(value.task);
    }
  }
};

const handleTaskDrop = () => {
  const zippedColumns = state.columns.map((column) => ({
    columnId: column.id,
    tasks: column.tasks.map((task) => task.id),
  }));
  moveTasks(route.params.id.toString(), zippedColumns);
};

const handleMoveTasks = (tasksColumns: IResponse<ITaskColumn[]>) => {
  if (tasksColumns.value) {
    state.columns = tasksColumns.value;
  }
};

onMounted(() => {
  subscribe(subscribeToTasks(route.params.id.toString()));
  subscribe(subscribeToColumns(handleColumns));
  subscribe(subscribeToNewColumn(handleNewColumn));
  subscribe(subscribeToNewTask(handleNewTask));
  subscribe(subscribeToMoveTasks(handleMoveTasks));

  requestColumns(route.params.id.toString());
});

onBeforeUnmount(() => {
  unsubscribeFromAll();
});
</script>

<template>
  <ProjectLayout :menu-route="MenuEnum.TASKS">
    <div class="tasks">
      <template v-if="state.columns.length !== 0">
        <Column
          v-for="tasksColumn of state.columns"
          :tasks="tasksColumn.tasks"
          :title="tasksColumn.title"
          :color="tasksColumn.color"
          :column-id="tasksColumn.id"
          :key="tasksColumn.id"
          @task-drop="handleTaskDrop"
        />
        <NewColumn :project-id="route.params.id.toString()" />
      </template>
      <Loader v-else />
    </div>
  </ProjectLayout>
</template>

<style scoped>
.tasks {
  height: 100%;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  gap: 0.75rem;
  overflow: auto;
}
</style>
