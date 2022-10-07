import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IUser } from "../interfaces/IUser";

interface IAppStore {
  user: IUser | null;
  token: string;
}

export const key: InjectionKey<Store<IAppStore>> = Symbol();

export const store = createStore<IAppStore>({
  state(): IAppStore {
    return {
      user: null,
      token: "",
    };
  },
  mutations: {
    setUser(state, user: IUser | null) {
      state.user = user;
    },
    setToken(state, token: string) {
      state.token = token;
    },
  },
});
