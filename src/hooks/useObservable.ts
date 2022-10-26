import { ref } from "vue";

export const useObservable = () => {
  const unsubRef = ref<Function[]>([]);

  const subscribe = (sub: () => void) => {
    unsubRef.value.push(sub);
  };

  const unsubscribeFromAll = () => {
    unsubRef.value.forEach((unsub) => unsub());
    unsubRef.value = [];
  };

  return { subscribe, unsubscribeFromAll };
};
