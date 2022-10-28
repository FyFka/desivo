<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ username: string; avatar: string; time: string; message: string }>();

const messageRef = ref();

defineExpose({ messageRef });
</script>

<template>
  <li ref="messageRef" class="message">
    <RouterLink :to="`/profile/${props.username}`" tabindex="-1">
      <img class="message__sender-avatar" :src="props.avatar" />
    </RouterLink>
    <div class="message__content">
      <span class="message__meta">
        <RouterLink class="message__sender-username" :to="`/profile/${props.username}`">{{
          props.username
        }}</RouterLink>
        <span class="message__date">{{ props.time }}</span>
      </span>
      <p class="message__sender-message">
        {{ props.message }}
      </p>
    </div>
  </li>
</template>

<style scoped>
.message:first-of-type {
  margin: 0;
}
.message {
  position: relative;
  margin-top: 1rem;
  padding: 0 3rem 0 4.5rem;
  min-height: 2.75rem;
}
.message:hover {
  background-color: #2e3236;
}
.message__sender-avatar {
  position: absolute;
  left: 1rem;
  margin-top: 0.25rem;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
}
.message__meta {
  display: flex;
  gap: 0.5rem;
}
.message__date {
  display: block;
  color: var(--secondary-light-color);
  font-size: 0.75rem;
  line-height: 1.375rem;
}
.message__sender-username {
  font-size: 1rem;
  color: var(--neutral-color);
  font-weight: 700;
  margin: 0;
}
.message__sender-username:hover {
  text-decoration: underline;
}
.message__sender-message {
  margin: 0;
  overflow-wrap: break-word;
}
</style>
