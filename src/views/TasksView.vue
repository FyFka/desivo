<script setup lang="ts">
import ProjectLayout from "./Layouts/ProjectLayout.vue";
import { MenuEnum } from "../interfaces/IMenu";
import Column from "../components/Tasks/Column.vue";
import { ITaskColumn } from "../interfaces/ITask";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { getColumns, sendSubscriptionToTasks, sendUnsubscriptionFromTasks, subscribeToColumns } from "../api/tasks";
import { useRoute } from "vue-router";
import { IResponse } from "../interfaces/IResponse";
import Loader from "../components/Loader.vue";
import NewColumn from "../components/Tasks/NewColumn.vue";

interface ITasksState {
  columns: ITaskColumn[];
}

const state = reactive<ITasksState>({ columns: [] });
const unsubRef = ref<Function[]>([]);
const route = useRoute();
const projectIdRef = computed(() => route.params.id.toString());

const handleColumns = (tasksColumns: IResponse<ITaskColumn[]>) => {
  if (tasksColumns.value) {
    state.columns = tasksColumns.value;
  }
};

onMounted(() => {
  unsubRef.value = [subscribeToColumns(handleColumns)];
  sendSubscriptionToTasks(projectIdRef.value);
  getColumns(projectIdRef.value);
});

onBeforeUnmount(() => {
  sendUnsubscriptionFromTasks(projectIdRef.value);
  unsubRef.value.forEach((unsubCallback) => unsubCallback());
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
          :column-id="tasksColumn.id"
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
