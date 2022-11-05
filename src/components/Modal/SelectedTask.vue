<script setup lang="ts">
import { watch } from "vue";
import { computed, reactive } from "vue";
import { createLabel, updateTask } from "../../api/tasks";
import { useModal } from "../../hooks/useModal";
import { ILabel } from "../../interfaces/ITask";
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

const { hideModal } = useModal();

const handleTaskUpdate = () => {
  updateTask(props.id, props.columnId, state.description, state.title);
  hideModal();
};

const handleCreateLabel = () => {
  createLabel(props.id, props.columnId, state.labelName, state.labelColor);
  state.labelName = "";
};

const isTaskChanged = computed(() => state.title !== props.title || state.description !== props.description);
</script>

<template>
  <div class="selected-task">
    <div class="selected-task__labels">
      <template v-if="props.labels.length">
        <div class="selected-task__labels-inner">
          <Label v-for="label of props.labels" :name="label.name" :color="label.color" :key="label.id" />
        </div>
      </template>
      <Dropdown :html-button-options="{ backgroundColor: '#1d2125', minWidth: '4rem' }">
        <template v-slot:button>
          <svg x="0" y="0" width="100%" height="1rem" viewBox="0 0 18 18">
            <polygon fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
          </svg>
        </template>
        <template v-slot:content>
          <form @submit.prevent="handleCreateLabel" @click.stop class="selected-task__create-label-form">
            <div class="selected-task__row">
              <div class="selected-task__color-wrapper">
                <input class="selected-task--color" v-model="state.labelColor" type="color" required />
              </div>
              <input class="selected-task__label-name" v-model="state.labelName" placeholder="Name" required />
            </div>
            <button class="selected-task__create-label" type="submit">Create</button>
          </form>
        </template>
      </Dropdown>
    </div>
    <input class="selected-task__field" v-model="state.title" />
    <textarea class="selected-task__field selected-task--description" v-model="state.description" />
    <button @click="handleTaskUpdate" class="selected-task__update" v-if="isTaskChanged">Update</button>
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
.selected-task--color {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  cursor: pointer;
}
.selected-task__color-wrapper {
  background-color: var(--secondary-color);
  position: relative;
  min-width: 1.5rem;
  max-width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  overflow: hidden;
}
.selected-task__row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.selected-task__label-name {
  min-width: 7rem;
  width: 100%;
  padding: 0.5rem 1rem;
}
</style>
