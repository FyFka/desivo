import { useRouter } from "vue-router";
import { createUser, getUserByAuth, getUserByToken, registerConnection } from "../api/user";
import { IUser } from "../interfaces/IUser";
import { getFromAppStorage, setToAppStorage } from "../utils/appStorage";
import { serverRequest } from "../utils/request";
import { useStore } from "./useStore";

export const useAuth = () => {
  const router = useRouter();
  const store = useStore();

  const _saveUser = (user: IUser, token: string) => {
    store.commit("setUser", user);
    store.commit("setToken", token);
    serverRequest.defaults.headers.Authorization = `Bearer ${token}`;
    registerConnection(token);
  };

  const loginByToken = async () => {
    const token = await getFromAppStorage<string>("cached_token");
    if (token) {
      const userResp = await getUserByToken(token);
      if (userResp.value) {
        const user = userResp.value;
        _saveUser(user, token);
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
      _saveUser(user, token);
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
      _saveUser(user, token);
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

  return { loginByToken, loginByAuth, logout, signup };
};
