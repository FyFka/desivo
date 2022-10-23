<script setup lang="ts">
import NewTask from "./NewTask.vue";
import Task from "./Task.vue";
import ColumnTitle from "./ColumnTitle.vue";
import { computed, PropType } from "vue";
import { ITask } from "../../interfaces/ITask";
import draggable from "vuedraggable";

const props = defineProps({
  title: { type: String, required: true },
  tasks: { type: Array as PropType<ITask[]>, required: true },
});

const count = computed(() => props.tasks.length);
</script>

<template>
  <div class="column">
    <ColumnTitle :title="props.title" :count="count" />
    <NewTask />
    <draggable class="column__draggable-zone" :list="props.tasks" itemKey="id" group="tasks">
      <template #item="{ element }">
        <Task :id="element.id" :title="element.title" :description="element.description" :labels="element.labels" />
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
