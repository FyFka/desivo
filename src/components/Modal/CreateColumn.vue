<script setup lang="ts">
import { reactive } from "vue";
import { createColumn } from "../../api/tasks";

const props = defineProps({
  projectId: { type: String, required: true },
});
const state = reactive({ columnName: "", color: "#2e81ff" });
const emit = defineEmits(["close"]);

const handleJoinProject = async () => {
  createColumn(props.projectId, state.columnName, state.color);
  emit("close");
};
</script>

<template>
  <form @submit.prevent="handleJoinProject" class="create-column">
    <h3 class="create-column__title">Create column</h3>
    <div class="create-column__row">
      <div class="create-column__color-wrapper">
        <input v-model="state.color" class="create-column__inp create-column--color" type="color" required />
      </div>
      <input v-model="state.columnName" class="create-column__inp" type="text" placeholder="Name" required />
    </div>
    <button type="submit" class="create-column__submit">Create</button>
  </form>
</template>

<style scoped>
.create-column {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.create-column__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}
.create-column__submit {
  background-color: var(--highlight-color);
  width: 100%;
}
.create-column__inp {
  flex: 10;
}
.create-column__row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.create-column--color {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  cursor: pointer;
}
.create-column__color-wrapper {
  background-color: var(--secondary-color);
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  overflow: hidden;
}
</style>
