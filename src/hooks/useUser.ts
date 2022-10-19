import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { createUser, getUserByAuth, getUserByToken, registerConnection } from "../api/user";
import { IUser } from "../interfaces/IUser";
import { key } from "../store";
import { getFromAppStorage, setToAppStorage } from "../utils/appStorage";

export const useUser = () => {
  const router = useRouter();
  const store = useStore(key);

  const saveToStore = (user: IUser, token: string) => {
    store.commit("setUser", user);
    store.commit("setToken", token);
  };

  const loginByToken = async () => {
    const token = await getFromAppStorage<string>("cached_token");
    if (token) {
      const userResp = await getUserByToken(token);
      if (userResp.value) {
        const user = userResp.value;
        saveToStore(user, token);
        registerConnection(token);
        router.push("/");
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  };

  const loginByAuth = async (username: string, password: string) => {
    const loginResp = await getUserByAuth(username, password);
    if (loginResp.value) {
      const { user, token } = loginResp.value;
      saveToStore(user, token);
      registerConnection(token);
      await setToAppStorage("cached_token", { token });
      router.push("/");
    } else {
      return loginResp.message;
    }
  };

  const signup = async (username: string, password: string, name: string, secondName: string) => {
    const signupResp = await createUser(username, password, name, secondName);
    if (signupResp.value) {
      const { user, token } = signupResp.value;
      saveToStore(user, token);
      router.push("/");
    } else {
      return signupResp.message;
    }
  };

  const logout = () => {
    store.commit("setUser", null);
    store.commit("setToken", "");
    store.commit("setProjects", []);
    router.push("/login");
  };

  const user = computed(() => store.state.user);

  return { loginByToken, loginByAuth, logout, signup, user };
};
