import { computed, ComputedRef } from "vue";
import { useStore } from "vuex";
import { key } from "../store";

export const useModal = (): [ComputedRef<boolean>, (isOpen: boolean) => void] => {
  const store = useStore(key);

  const toggleModal = (isOpen: boolean) => {
    store.commit("setModal", isOpen);
  };

  const isModalOpen = computed(() => store.state.isModalOpen);

  return [isModalOpen, toggleModal];
};
