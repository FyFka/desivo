import { markRaw } from "vue";
import { useStore } from "./useStore";

export const useModal = () => {
  const store = useStore();

  const showModal = (component: any | null, props?: any) => {
    store.commit("setModal", { component: markRaw(component), props });
  };

  const hideModal = () => {
    store.commit("setModal", null);
  };

  return { showModal, hideModal };
};
