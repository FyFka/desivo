import { computed, ComputedRef } from "vue";
import { useStore } from "./useStore";

export const useModal = (): [ComputedRef<boolean>, (isOpen: boolean) => void] => {
  const store = useStore();

  const toggleModal = (isOpen: boolean) => {
    store.commit("setModal", isOpen);
  };

  const isModalOpen = computed(() => store.state.isModalOpen);

  return [isModalOpen, toggleModal];
};
