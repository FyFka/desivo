<script setup lang="ts">
import { reactive } from "vue";
import { useModal } from "../../hooks/useModal";
import { useProjects } from "../../hooks/useProjects";

const state = reactive({ projectId: "", error: "" });
const { joinToProject } = useProjects();
const { hideModal } = useModal();

const handleJoinProject = async () => {
  const joinProjectResult = await joinToProject(state.projectId);
  if (joinProjectResult) {
    state.error = joinProjectResult;
  } else {
    hideModal();
  }
};
</script>

<template>
  <form @submit.prevent="handleJoinProject" class="join-project">
    <h3 class="join-project__title">Join To Project</h3>
    <input v-model="state.projectId" class="join-project__field" placeholder="Project id" required />
    <button type="submit" class="join-project__submit">Join</button>
    <p class="join-project__error" v-if="state.error">{{ state.error }}</p>
  </form>
</template>

<style scoped>
.join-project {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.join-project__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}
.join-project__submit {
  background-color: var(--highlight-color);
  width: 100%;
}
.join-project__field {
  width: 100%;
  margin-bottom: 1rem;
}
.join-project__error {
  width: 100%;
  text-align: center;
  color: var(--highlight-danger-color);
  margin: 0.5rem 0 0;
}
</style>
