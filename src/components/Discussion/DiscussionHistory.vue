<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  requestMessagesHistory,
  subscribeToDiscussion,
  subscribeToHistoryEnd,
  subscribeToMessagesHistory,
  subscribeToNewMessage,
} from "../../api/discussion";
import { IMessage, IMessageRaw } from "../../interfaces/IMessage";
import { IResponse } from "../../interfaces/IResponse";
import Message from "./Message.vue";
import Loader from "../Loader.vue";
import { HISTORY_SKIP_COUNT } from "../../shared/constants";
import { useObservable } from "../../hooks/useObservable";
import { useToast } from "vue-toastification";

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
const toast = useToast();
const { subscribe, unsubscribeFromAll } = useObservable();
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
  } else if (discussionHistory.message) {
    toast.error(discussionHistory.message);
  }
};

const handleHistoryEnd = (isHistoryEnd: IResponse<boolean>) => {
  if (isHistoryEnd.value) {
    state.historyEnd = true;
  } else if (isHistoryEnd.message) {
    toast.error(isHistoryEnd.message);
  }
};

const handleNewMessage = (newMessage: IResponse<IMessageRaw>) => {
  if (newMessage.value) {
    state.discussionHistory.push({
      ...newMessage.value,
      time: new Date(newMessage.value.timestamp).toLocaleString(),
    });
  } else if (newMessage.message) {
    toast.error(newMessage.message);
  }
};

const handleHistoryScroll = (evt: Event) => {
  const list = evt.target as HTMLUListElement;
  if (!state.historyEnd && list.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
    requestMessagesHistory(route.params.id.toString(), state.historySkip + HISTORY_SKIP_COUNT);
    state.historySkip += HISTORY_SKIP_COUNT;
  }
};

onMounted(() => {
  subscribe(subscribeToNewMessage(handleNewMessage));
  subscribe(subscribeToMessagesHistory(handleHistory));
  subscribe(subscribeToHistoryEnd(handleHistoryEnd));
  subscribe(subscribeToDiscussion(route.params.id.toString()));
  requestMessagesHistory(route.params.id.toString(), state.historySkip);
});

onBeforeUnmount(() => {
  unsubscribeFromAll();
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
  <div v-if="!state.loading" class="discussion__container">
    <div class="discussion__history-container">
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
.discussion__container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3rem - 2.563rem - 2.5rem);
  overflow: hidden;
}
.discussion__history-container {
  height: 100%;
  background-color: var(--secondary-dark-color);
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
