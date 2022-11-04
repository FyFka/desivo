<script setup lang="ts">
import { reactive } from "vue";
import { useAuth } from "../hooks/useAuth";

const state = reactive({ username: "", password: "", error: "" });
const { loginByAuth } = useAuth();

const handleLogin = async () => {
  const loginResult = await loginByAuth(state.username, state.password);
  if (loginResult) {
    state.error = loginResult;
  }
};
</script>

<template>
  <div class="login">
    <form @submit.prevent="handleLogin" class="login__container">
      <h1 class="login__title">Login</h1>
      <input v-model="state.username" class="login__field" placeholder="Login" required />
      <input v-model="state.password" class="login__field" placeholder="Password" required />
      <p class="login__error" v-if="state.error">{{ state.error }}</p>
      <button type="submit" class="login__submit">Log in</button>
      <p class="login__not-member">
        Not a member yet?<RouterLink class="login__signup" to="/signup">Sign up for free</RouterLink>
      </p>
    </form>
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
.login__submit {
  background-color: var(--highlight-color);
  width: 100%;
  margin-bottom: 0.5rem;
}

.login__field {
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
.login__signup {
  display: inline-block;
  margin-left: 0.25rem;
}
.login__not-member {
  margin: 0;
  color: var(--secondary-light-color);
}
</style>
