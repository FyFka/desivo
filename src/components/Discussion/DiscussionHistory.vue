<script setup lang="ts">
import { reactive } from "vue";
import Message from "./Message.vue";
const state = reactive({ messagesHistory: ["", "", ""] });
</script>

<template>
  <div class="discussion__wrapper">
    <ul class="discussion__history">
      <Message
        v-for="message of state.messagesHistory"
        username="FyFka"
        avatar="https://user-images.githubusercontent.com/76843185/194325153-59248d9e-9826-4252-a0c2-64ed7408f4ee.png"
        :time="new Date().toLocaleDateString()"
        message="test test rtes"
      />
    </ul>
  </div>
</template>

<style scoped>
.discussion__wrapper {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem - 2.563rem - 2.5rem);
  overflow: hidden;
}
.discussion__history {
  height: 100%;
  background-color: var(--secondary-color);
  margin: 0.5rem 0.5rem 0;
  border-radius: 0.5rem;
  padding: 0;
  list-style: none;
  overflow-y: auto;
}
</style>
