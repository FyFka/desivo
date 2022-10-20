<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  getMessagesHistory,
  sendSubscriptionToNewMessage,
  sendUnsubscriptionToNewMessage,
  subscribeToHistoryEnd,
  subscribeToMessagesHistory,
  subscribeToNewMessage,
} from "../../api/discussion";
import { IMessage, IMessageRaw } from "../../interfaces/IMessage";
import { IResponse } from "../../interfaces/IResponse";
import Message from "./Message.vue";
import Loader from "../Loader.vue";

interface IDiscussionHistoryState {
  discussionHistory: IMessage[];
  loading: boolean;
  historySkip: number;
  historyEnd: boolean;
}

const state = reactive<IDiscussionHistoryState>({
  discussionHistory: [],
  loading: true,
  historySkip: 0,
  historyEnd: false,
});

const route = useRoute();
const unsubRef = ref<Function[]>([]);
const projectIdRef = computed(() => route.params.id.toString());
const messagesRef = ref();

const scrollToLastMessage = () => {
  if (Array.isArray(messagesRef.value)) {
    const lastMessage = messagesRef.value[messagesRef.value.length - 1];
    lastMessage.messageRef.scrollIntoView();
  }
};

const handleHistory = (discussionHistory: IResponse<IMessageRaw[]>) => {
  if (discussionHistory.value) {
    const discussionHistorySlice = discussionHistory.value.map((message) => ({
      ...message,
      time: new Date(message.timestamp).toLocaleString(),
    }));
    state.discussionHistory = [...discussionHistorySlice, ...state.discussionHistory];
  }
};

const handleHistoryEnd = (isHistoryEnd: IResponse<boolean>) => {
  if (isHistoryEnd.value) {
    state.historyEnd = true;
  }
};

const handleNewMessage = (newMessage: IResponse<IMessageRaw>) => {
  if (newMessage.value) {
    state.discussionHistory.push({
      ...newMessage.value,
      time: new Date(newMessage.value.timestamp).toLocaleString(),
    });
  }
};

const handleHistoryScroll = (evt: Event) => {
  const list = evt.target as HTMLUListElement;
  if (!state.historyEnd && list.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
    getMessagesHistory(projectIdRef.value, state.historySkip + 25);
    state.historySkip += 25;
  }
};

onMounted(() => {
  unsubRef.value = [
    subscribeToNewMessage(handleNewMessage),
    subscribeToMessagesHistory(handleHistory),
    subscribeToHistoryEnd(handleHistoryEnd),
  ];
  sendSubscriptionToNewMessage(projectIdRef.value);
  getMessagesHistory(projectIdRef.value, state.historySkip);
});

onBeforeUnmount(() => {
  sendUnsubscriptionToNewMessage(projectIdRef.value);
  unsubRef.value.forEach((unsubCallback) => unsubCallback());
});

watch(
  () => state.discussionHistory,
  () => {
    if (state.loading) {
      state.loading = false;
    }
  }
);

onUpdated(() => {
  scrollToLastMessage();
});
</script>

<template>
  <div v-if="!state.loading" class="discussion__wrapper">
    <div class="discussion__history-wrapper">
      <ul ref="historyRef" class="discussion__history" @scroll="handleHistoryScroll">
        <Message
          v-for="message of state.discussionHistory"
          :key="message.id"
          :username="message.user.username"
          :avatar="message.user.avatar"
          :time="message.time"
          :message="message.message"
          ref="messagesRef"
        />
      </ul>
    </div>
  </div>
  <Loader v-else />
</template>

<style scoped>
.discussion__wrapper {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem - 2.563rem - 2.5rem);
  overflow: hidden;
}
.discussion__history-wrapper {
  height: 100%;
  background-color: #1d2125;
  margin: 0.5rem 0.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
}
.discussion__history {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: auto;
}
</style>
