<script setup lang="ts">
import { reactive } from "vue";
import { setToAppStorage } from "../utils/appStorage";

const { login, password } = reactive({
  login: "",
  password: "",
});

const handleLogin = async () => {
  const t = await setToAppStorage("cached_token", `${login} -> ${password}`);
  console.log(t);
};
</script>

<template>
  <div class="welcome">
    <div class="welcome__container">
      <h1 class="welcome__title">Welcome</h1>
      <input v-model="login" class="welcome__login" type="text" placeholder="Login" />
      <input v-model="password" class="welcome__password" type="text" placeholder="Password" />
      <button @click="handleLogin" class="welcome__log-in">Log in</button>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
}
.welcome__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
.welcome__title {
  margin: 0 0 1rem;
  font-size: 2rem;
}
.welcome__log-in {
  background-color: var(--highlight-color);
  width: 100%;
}
.welcome__login,
.welcome__password {
  width: 100%;
}
</style>
