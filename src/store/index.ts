import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IProject } from "../interfaces/IProject";
import { IUser } from "../interfaces/IUser";

interface IAppStore {
  user: IUser | null;
  token: string;
  projects: IProject[];
  isModalOpen: boolean;
}

export const key: InjectionKey<Store<IAppStore>> = Symbol();

export const store = createStore<IAppStore>({
  state(): IAppStore {
    return {
      user: null,
      token: "",
      projects: [],
      isModalOpen: false,
    };
  },
  mutations: {
    setUser(state, user: IUser | null) {
      state.user = user;
    },
    setToken(state, token: string) {
      state.token = token;
    },
    setProjects(state, projects: IProject[]) {
      state.projects = projects;
    },
    addProject(state, project: IProject) {
      state.projects.push(project);
    },
    setModal(state, isOpen: boolean) {
      state.isModalOpen = isOpen;
    },
  },
});
