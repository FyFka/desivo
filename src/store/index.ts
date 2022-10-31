import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IProject } from "../interfaces/IProject";
import { IUser } from "../interfaces/IUser";

export interface IAppStore {
  user: IUser | null;
  token: string;
  projects: IProject[];
  isModalOpen: boolean;
  connectionId: string;
}

export const key: InjectionKey<Store<IAppStore>> = Symbol();

export const store = createStore<IAppStore>({
  state(): IAppStore {
    return {
      user: null,
      token: "",
      projects: [],
      isModalOpen: false,
      connectionId: "",
    };
  },
  mutations: {
    setUser(state, user: IUser | null) {
      state.user = user;
    },
    setAvatar(state, avatarUrl: string) {
      if (state.user) {
        console.log("av change");
        state.user.avatar = avatarUrl;
      }
    },
    setProfile(state, profile: { name: string; secondName: string; username: string }) {
      if (state.user) {
        state.user.name = profile.name;
        state.user.secondName = profile.secondName;
        state.user.username = profile.username;
      }
    },
    setToken(state, token: string) {
      state.token = token;
    },
    setProjects(state, projects: IProject[]) {
      state.projects = projects;
    },
    setConnectionId(state, connectionId: string) {
      state.connectionId = connectionId;
    },
    addProject(state, project: IProject) {
      state.projects.push(project);
    },
    setModal(state, isOpen: boolean) {
      state.isModalOpen = isOpen;
    },
  },
});
