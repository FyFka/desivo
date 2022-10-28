<script setup lang="ts">
import NewTask from "./NewTask.vue";
import Task from "./Task.vue";
import ColumnTitle from "./ColumnTitle.vue";
import { computed } from "vue";
import { ITask } from "../../interfaces/ITask";
import draggable from "vuedraggable";

const props = defineProps<{
  title: string;
  columnId: string;
  color: string;
  order: string[];
  tasks: { [key: string]: ITask };
}>();

const emit = defineEmits(["reoder-tasks"]);

const count = computed(() => props.order.length);

const handleTaskDrop = () => {
  emit("reoder-tasks");
};
</script>

<template>
  <div class="column">
    <ColumnTitle :title="props.title" :count="count" :color="props.color" />
    <NewTask :column-id="props.columnId" />
    <draggable
      class="column__draggable-zone"
      :list="props.order"
      itemKey="id"
      group="tasks-columns"
      ghost-class="task--moveable"
      @end="handleTaskDrop"
    >
      <template #item="{ element }">
        <Task
          :id="props.tasks[element].id"
          :title="props.tasks[element].title"
          :description="props.tasks[element].description"
          :labels="props.tasks[element].labels"
        />
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 16rem;
  min-width: 16rem;
}
.column__draggable-zone {
  min-height: 9rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 16rem;
  min-width: 16rem;
}
</style>
