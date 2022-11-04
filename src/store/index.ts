import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IProject } from "../interfaces/IProject";
import { IUser, IUserProfile } from "../interfaces/IUser";

export interface IAppStore {
  user: IUser | null;
  token: string;
  projects: IProject[];
  modal: { component: any; props: any } | null;
  connectionId: string;
}

export const key: InjectionKey<Store<IAppStore>> = Symbol();

export const store = createStore<IAppStore>({
  state(): IAppStore {
    return {
      user: null,
      token: "",
      projects: [],
      connectionId: "",
      modal: null,
    };
  },
  mutations: {
    setUser(state, user: IUser | null) {
      state.user = user;
    },
    setAvatar(state, avatar: string) {
      if (state.user) {
        state.user.avatar = avatar;
      }
    },
    setProfile(state, profile: IUserProfile) {
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
    setModal(state, modal: any | null) {
      state.modal = modal;
    },
  },
});
