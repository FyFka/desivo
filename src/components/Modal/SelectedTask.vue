<script setup lang="ts">
import { computed, reactive } from "vue";
import { createLabel, updateTask } from "../../api/tasks";
import { ILabel } from "../../interfaces/ITask";
import Comments from "../Comments.vue";
import Dropdown from "../Dropdown.vue";
import Label from "../Tasks/Label.vue";

const props = defineProps<{
  id: string;
  title: string;
  description: string;
  labels: ILabel[];
  columnId: string;
}>();

const state = reactive({
  title: props.title,
  description: props.description,
  labelColor: "#2e81ff",
  labelName: "",
});

const handleTaskUpdate = () => {
  updateTask(props.id, props.columnId, state.description, state.title);
};

const handleCreateLabel = () => {
  createLabel(props.id, props.columnId, state.labelName, state.labelColor);
  state.labelName = "";
  state.labelColor = "";
};

const isTaskChanged = computed(() => state.title !== props.title || state.description !== props.description);
</script>

<template>
  <div class="selected-task">
    <div class="selected-task__labels">
      <div class="selected-task__labels-inner">
        <Label v-for="label of props.labels" :name="label.name" :color="label.color" :key="label.id" />
      </div>
      <Dropdown :html-button-options="{ backgroundColor: '#1d2125', minWidth: '4rem' }">
        <template v-slot:button>
          <svg x="0" y="0" width="100%" height="1rem" viewBox="0 0 18 18">
            <polygon fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
          </svg>
        </template>
        <template v-slot:content>
          <form @submit.prevent="handleCreateLabel" @click.stop class="selected-task__create-label-form">
            <input v-model="state.labelName" placeholder="Name" required />
            <input v-model="state.labelColor" type="color" required />
            <button class="selected-task__create-label" type="submit">Create</button>
          </form>
        </template>
      </Dropdown>
    </div>
    <input class="selected-task__field" v-model="state.title" />
    <textarea class="selected-task__field selected-task--description" v-model="state.description" />
    <button @click="handleTaskUpdate" class="selected-task__update" v-if="isTaskChanged">Update</button>
    <Comments />
  </div>
</template>

<style scoped>
.selected-task {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}
.selected-task__field {
  width: 100%;
  min-height: 2rem;
  max-width: 27rem;
  min-width: 7rem;
}
.selected-task__field:not(:focus) {
  background-color: transparent;
}
.selected-task--description {
  color: var(--secondary-light-color);
}
.selected-task__labels {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  height: 1.75rem;
}
.selected-task__labels-inner {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.3rem;
  overflow-x: auto;
}
.selected-task__update {
  background-color: var(--highlight-color);
  width: 100%;
}
.selected-task__create-label-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
}
.selected-task__create-label {
  background-color: var(--highlight-color);
}
</style>
