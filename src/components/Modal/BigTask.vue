<script setup lang="ts">
import { onMounted, ref } from "vue";
import { computed, reactive } from "vue";
import { createLabel, updateTask } from "../../api/tasks";
import { useModal } from "../../hooks/useModal";
import { ILabel } from "../../interfaces/ITask";
import { DEFAULT_COLOR } from "../../shared/constants";
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
  labelColor: DEFAULT_COLOR,
  labelName: "",
});

const { hideModal } = useModal();
const descriptionRef = ref<HTMLTextAreaElement | null>(null);

const handleTaskUpdate = () => {
  updateTask(props.id, props.columnId, state.description, state.title);
  hideModal();
};

const handleCreateLabel = () => {
  createLabel(props.id, props.columnId, state.labelName, state.labelColor);
  state.labelName = "";
};

function textAreaAdjust() {
  if (descriptionRef.value) {
    descriptionRef.value.style.height = "0.063rem";
    const descriptionHeight = descriptionRef.value.scrollHeight / 16;
    descriptionRef.value.style.height = 1.25 + descriptionHeight + "rem";
  }
}

onMounted(() => {
  textAreaAdjust();
});

const isTaskChanged = computed(() => state.title !== props.title || state.description !== props.description);
</script>

<template>
  <div class="big-task">
    <div class="big-task__labels">
      <template v-if="props.labels.length">
        <div class="big-task__labels-inner">
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
          <form @submit.prevent="handleCreateLabel" @click.stop class="big-task__create-label-form">
            <div class="big-task__row">
              <div class="big-task__color-wrapper">
                <input class="big-task--color" v-model="state.labelColor" type="color" required />
              </div>
              <input class="big-task__label-name" v-model="state.labelName" placeholder="Name" required />
            </div>
            <button class="big-task__create-label" type="submit">Create</button>
          </form>
        </template>
      </Dropdown>
    </div>
    <input class="big-task__field big-task--title" v-model="state.title" />
    <textarea
      ref="descriptionRef"
      @keyup="textAreaAdjust"
      class="big-task__field big-task--description"
      v-model="state.description"
    />
    <button @click="handleTaskUpdate" class="big-task__update" v-if="isTaskChanged">Update</button>
  </div>
</template>

<style scoped>
.big-task {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}
.big-task__field {
  width: 100%;
  min-height: 2rem;
  max-width: 27rem;
  min-width: 7rem;
}
.big-task__field:not(:focus) {
  background-color: transparent;
}
.big-task--description {
  color: var(--secondary-light-color);
}
.big-task--title {
  font-weight: 700;
}
.big-task__labels {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  height: 1.75rem;
}
.big-task__labels-inner {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.3rem;
  overflow-x: auto;
}
.big-task__update {
  background-color: var(--highlight-color);
  width: 100%;
}
.big-task__create-label-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
}
.big-task__create-label {
  background-color: var(--highlight-color);
}
.big-task--color {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  cursor: pointer;
}
.big-task__color-wrapper {
  background-color: var(--secondary-color);
  position: relative;
  min-width: 1.5rem;
  max-width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  overflow: hidden;
}
.big-task__row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.big-task__label-name {
  min-width: 7rem;
  width: 100%;
  padding: 0.5rem 1rem;
}
</style>
