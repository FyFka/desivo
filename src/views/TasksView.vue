<script setup lang="ts">
import ProjectLayout from "./Layouts/ProjectLayout.vue";
import { MenuEnum } from "../interfaces/IMenu";
import Column from "../components/Tasks/Column.vue";
import { ITask, ITaskColumn, ITaskColumnRaw } from "../interfaces/ITask";
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
import { IZippedColumns } from "../interfaces/IZippedColumns";

interface ITasksState {
  columns: ITaskColumn[];
  tasks: { [key: string]: ITask };
}

const route = useRoute();
const state = reactive<ITasksState>({ columns: [], tasks: {} });
const { subscribe, unsubscribeFromAll } = useObservable();

const handleColumns = (tasksColumns: IResponse<ITaskColumnRaw[]>) => {
  if (tasksColumns.value) {
    tasksColumns.value.forEach(({ tasks, ...columnSlice }) => {
      state.tasks = { ...state.tasks, ...tasks };
      state.columns.push(columnSlice);
    });
  }
};

const handleNewColumn = (newColumn: IResponse<ITaskColumnRaw>) => {
  if (newColumn.value) {
    const { tasks, ...columnSlice } = newColumn.value;
    state.columns.push(columnSlice);
    state.tasks = { ...state.tasks, ...tasks };
  }
};

const handleNewTask = (newTask: IResponse<{ columnId: string; task: ITask }>) => {
  const value = newTask.value;
  if (value) {
    state.tasks[value.task.id] = value.task;
    const targetColumn = state.columns.find((column) => column.id === value.columnId);
    if (targetColumn) {
      targetColumn.order.push(value.task.id);
    }
  }
};

const handleReorderTasks = () => {
  const zippedColumns = state.columns.map((column) => ({
    columnId: column.id,
    order: column.order,
  }));
  moveTasks(route.params.id.toString(), zippedColumns);
};

const handleMoveTasks = (tasksColumns: IResponse<IZippedColumns>) => {
  if (tasksColumns.value) {
    const newColumnsOrder = tasksColumns.value;
    state.columns = state.columns.map((column) => {
      const targetColumn = newColumnsOrder.find((columnSlice) => columnSlice.columnId === column.id);
      if (targetColumn) {
        return { ...column, order: targetColumn.order };
      }
      return column;
    });
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
          :tasks="state.tasks"
          :order="tasksColumn.order"
          :title="tasksColumn.title"
          :color="tasksColumn.color"
          :column-id="tasksColumn.id"
          @reoder-tasks="handleReorderTasks"
          :key="tasksColumn.id"
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
