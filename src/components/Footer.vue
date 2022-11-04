<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
import { subscribeToConnection } from "../api/connection";
import { useObservable } from "../hooks/useObservable";
import { useStore } from "../hooks/useStore";

const store = useStore();
const { subscribe, unsubscribeFromAll } = useObservable();

const handleConnectionChange = (connectionId: string) => {
  store.commit("setConnectionId", connectionId);
};

onMounted(() => {
  subscribe(subscribeToConnection(handleConnectionChange));
});

onBeforeUnmount(() => {
  unsubscribeFromAll();
});

const currentConnection = computed(() =>
  store.state.connectionId ? store.state.connectionId : "Connection is not established"
);
</script>

<template>
  <footer class="footer">
    <p class="footer__connection-id">{{ currentConnection }}</p>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  right: 0.5rem;
  user-select: none;
  touch-action: none;
  pointer-events: none;
}
.footer__connection-id {
  margin: 0;
  color: rgb(255 255 255 / 15%);
  font-size: 0.5rem;
  mix-blend-mode: difference;
  line-height: 0.8;
}
</style>
