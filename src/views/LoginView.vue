<script setup lang="ts">
import { reactive } from "vue";
import router from "../router";
import { useStore } from "vuex";
import { key } from "../store";
import { getUserByAuth } from "../api/user";

const state = reactive({ username: "", password: "", error: "" });
const store = useStore(key);

const handleLogin = async () => {
  const loginResp = await getUserByAuth(state.username, state.password);
  if (loginResp.value) {
    const authUser = loginResp.value;
    store.commit("setUser", authUser.user);
    store.commit("setToken", authUser.token);
    router.push("/");
  } else {
    state.error = loginResp.message!;
  }
};
</script>

<template>
  <div class="login">
    <div class="login__container">
      <h1 class="login__title">Welcome</h1>
      <input v-model="state.username" class="login__username" type="text" placeholder="Login" />
      <input v-model="state.password" class="login__password" type="text" placeholder="Password" />
      <p class="login__error" v-if="state.error">{{ state.error }}</p>
      <button @click="handleLogin" class="login__log-in">Log in</button>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
}
.login__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
}
.login__title {
  margin: 0 0 1rem;
  font-size: 2rem;
}
.login__log-in {
  background-color: var(--highlight-color);
  width: 100%;
}
.login__username,
.login__password {
  width: 100%;
  margin-bottom: 1rem;
}
.login__error {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -2rem;
  left: 0;
  color: var(--highlight-danger-color);
  margin: 0;
}
</style>
