<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { sendMessage } from "../../api/discussion";

const state = reactive({ message: "" });
const route = useRoute();

const handleSubmitMessage = () => {
  sendMessage(state.message, route.params.id.toString());
  state.message = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmitMessage" class="user-message">
    <textarea
      v-model="state.message"
      class="user-message__field"
      placeholder="Message"
      @keydown.exact.enter.prevent="handleSubmitMessage"
    ></textarea>
  </form>
</template>

<style scoped>
.user-message {
  display: block;
  padding: 0.25rem;
  height: 3rem;
  background-color: var(--secondary-color);
  border-radius: 0.5rem;
  margin: 0.5rem;
}
.user-message__field {
  height: 100%;
  width: 100%;
  background-color: var(--secondary-color);
  color: var(--neutral-color);
  border: none;
  resize: none;
  overflow: hidden;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
