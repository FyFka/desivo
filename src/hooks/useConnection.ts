import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { subscribeToConnection } from "../api/connection";
import { key } from "../store";

export const useConnection = () => {
  const store = useStore(key);
  const unsubRef = ref<Function[]>([]);

  const handleConnectionChange = (connectionId: string) => {
    store.commit("setConnectionId", connectionId);
  };

  onMounted(() => {
    unsubRef.value = [subscribeToConnection(handleConnectionChange)];
  });

  onBeforeUnmount(() => {
    unsubRef.value.forEach((unsubCallback) => unsubCallback());
  });

  const connectionId = computed(() => store.state.connectionId);

  return { connectionId };
};
