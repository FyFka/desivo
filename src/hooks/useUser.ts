import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { createUser, getUserByAuth, getUserByToken } from "../api/user";
import { key } from "../store";
import { getFromAppStorage, setToAppStorage } from "../utils/appStorage";

export const useUser = () => {
  const router = useRouter();
  const store = useStore(key);

  const loginByToken = async () => {
    const token = await getFromAppStorage<string>("cached_token");
    if (token) {
      const userResp = await getUserByToken(token);
      if (userResp.value) {
        const userDto = userResp.value;
        store.commit("setUser", userDto);
        store.commit("setToken", token);
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
      const authUser = loginResp.value;
      store.commit("setUser", authUser.user);
      store.commit("setToken", authUser.token);
      await setToAppStorage("cached_token", { token: authUser.token });
      router.push("/");
    } else {
      return loginResp.message;
    }
  };

  const signup = async (username: string, password: string, name: string, secondName: string) => {
    const signupResp = await createUser(username, password, name, secondName);
    if (signupResp.value) {
      const signupDto = signupResp.value;
      store.commit("setUser", signupDto.user);
      store.commit("setToken", signupDto.token);
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
