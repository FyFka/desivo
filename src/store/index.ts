import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IProject } from "../interfaces/IProject";
import { IUser } from "../interfaces/IUser";

interface IAppStore {
  user: IUser | null;
  token: string;
  projects: IProject[];
}

export const key: InjectionKey<Store<IAppStore>> = Symbol();

export const store = createStore<IAppStore>({
  state(): IAppStore {
    return {
      user: null,
      token: "",
      projects: [],
    };
  },
  mutations: {
    setUser(state, user: IUser | null) {
      state.user = user;
    },
    setToken(state, token: string) {
      state.token = token;
    },
    addProject(state, project: IProject) {
      state.projects.push(project);
    },
    setProjects(state, projects: IProject[]) {
      state.projects = projects;
    },
  },
});
