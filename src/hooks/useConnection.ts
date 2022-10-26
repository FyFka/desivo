import { computed, onBeforeUnmount, onMounted } from "vue";
import { subscribeToConnection } from "../api/connection";
import { useObservable } from "./useObservable";
import { useStore } from "./useStore";

export const useConnection = () => {
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

  const connectionId = computed(() => store.state.connectionId);

  return { connectionId };
};
