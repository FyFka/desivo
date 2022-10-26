import { key } from "../store";
import { useStore as rootUseStore } from "vuex";

export const useStore = () => {
  return rootUseStore(key);
};
