import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { subscribeToConnection } from "../api/connection";
import { key } from "../store";

export const useConnection = () => {
  const store = useStore(key);
  const connectionRef = ref(() => {});

  const handleConnectionChange = (connectionId: string) => {
    store.commit("setConnectionId", connectionId);
  };

  onMounted(() => {
    connectionRef.value = subscribeToConnection(handleConnectionChange);
  });

  onUnmounted(() => {
    connectionRef.value();
  });

  const connectionId = computed(() => store.state.connectionId);

  return { connectionId };
};
