<script setup lang="ts">
import { reactive } from "vue";
import { createTask } from "../../api/tasks";

const props = defineProps({
  columnId: { type: String, required: true },
});
const state = reactive({ taskTitle: "", taskDescription: "" });
const emit = defineEmits(["close"]);

const handleJoinProject = async () => {
  createTask(state.taskTitle, state.taskDescription, props.columnId);

  emit("close");
};
</script>

<template>
  <form @submit.prevent="handleJoinProject" class="create-task">
    <h3 class="create-task__title">Create task</h3>
    <input v-model="state.taskTitle" class="create-task__inp" type="text" placeholder="Title" required />
    <input v-model="state.taskDescription" class="create-task__inp" type="text" placeholder="Description" required />
    <button type="submit" class="create-task__submit">Create</button>
  </form>
</template>

<style scoped>
.create-task {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.create-task__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}
.create-task__submit {
  background-color: var(--highlight-color);
  width: 100%;
}
.create-task__inp {
  width: 100%;
  margin-bottom: 1rem;
}
</style>
