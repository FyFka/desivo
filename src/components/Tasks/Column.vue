<script setup lang="ts">
import NewTask from "./NewTask.vue";
import Task from "./Task.vue";
import ColumnTitle from "./ColumnTitle.vue";
import { computed } from "vue";
import { ITask } from "../../interfaces/ITask";
import Draggable from "vuedraggable";
import { SortableEvent } from "sortablejs";

const props = defineProps<{
  title: string;
  columnId: string;
  color: string;
  order: string[];
  tasks: { [key: string]: ITask };
}>();

const emit = defineEmits(["reoder-tasks"]);

const count = computed(() => props.order.length);

const handleTaskDrop = (evt: SortableEvent) => {
  if (evt.oldIndex === evt.newIndex && evt.to === evt.from) return;
  emit("reoder-tasks");
};
</script>

<template>
  <div class="column">
    <ColumnTitle :title="props.title" :count="count" :color="props.color" :column-id="props.columnId" />
    <NewTask :column-id="props.columnId" />
    <Draggable
      class="column__draggable-zone"
      itemKey="id"
      group="tasks-columns"
      ghost-class="task--moveable"
      :list="props.order"
      @end="handleTaskDrop"
    >
      <template #item="{ element }">
        <Task
          :id="props.tasks[element].id"
          :title="props.tasks[element].title"
          :description="props.tasks[element].description"
          :labels="props.tasks[element].labels"
          :column-id="props.columnId"
        />
      </template>
    </Draggable>
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
