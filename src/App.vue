<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { getFromAppStorage } from "./utils/appStorage";
import VueFrame from "./components/Frame.vue";
import Loader from "./components/Loader.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive } from "vue";
import { key } from "./store";
import { getUserByToken } from "./api/user";
import { IUser } from "./interfaces/IUser";

const router = useRouter();
const store = useStore(key);
const state = reactive({ isLoaded: false });

const setUser = (user: IUser) => {
  store.commit("setUser", user);
  store.commit("setToken", user);
};

onMounted(async () => {
  const token = await getFromAppStorage<string>("cached_token");
  if (token) {
    const userResp = await getUserByToken(token);
    if (userResp.value) {
      setUser(userResp.value);
    } else {
      router.push("/login");
    }
  } else {
    router.push("/login");
  }
  state.isLoaded = true;
});
</script>

<template>
  <VueFrame>
    <router-view v-if="state.isLoaded" />
    <Loader v-else />
  </VueFrame>
</template>
