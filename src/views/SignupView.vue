<script setup lang="ts">
import { reactive } from "vue";
import router from "../router";
import { useStore } from "vuex";
import { key } from "../store";
import { signup } from "../api/user";

const state = reactive({ username: "", password: "", name: "", secondName: "", error: "" });
const store = useStore(key);

const handleSignup = async () => {
  const signupResp = await signup(state.username, state.password, state.name, state.secondName);
  if (signupResp.value) {
    const signupDto = signupResp.value;
    store.commit("setUser", signupDto.user);
    store.commit("setToken", signupDto.token);
    router.push("/");
  } else {
    state.error = signupResp.message!;
  }
};
</script>

<template>
  <div class="signup">
    <form @submit.prevent="handleSignup" class="signup__container">
      <h1 class="signup__title">Sign up</h1>
      <input v-model="state.username" class="signup__inp" type="text" placeholder="Username" required />
      <input v-model="state.password" class="signup__inp" type="text" placeholder="Password" required />
      <div class="signup__row">
        <input v-model="state.name" class="signup__inp" type="text" placeholder="Name" required />
        <input v-model="state.secondName" class="signup__inp" type="text" placeholder="Second Name" required />
      </div>
      <p class="signup__error" v-if="state.error">{{ state.error }}</p>
      <button type="submit" class="signup__submit">Sign up</button>
      <p class="signup__got-account">
        Already got an account? <router-link class="signup__login" to="/login">Log in</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
}
.signup__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
}
.signup__title {
  margin: 0 0 1rem;
  font-size: 2rem;
}
.signup__row {
  width: 100%;
  display: flex;
  gap: 1rem;
}

.signup__submit {
  background-color: var(--highlight-color);
  width: 100%;
  margin-bottom: 0.5rem;
}

.signup__inp {
  width: 100%;
  margin-bottom: 1rem;
}
.signup__error {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -2rem;
  left: 0;
  color: var(--highlight-danger-color);
  margin: 0;
}
.signup__login {
  display: inline-block;
  margin-left: 0.25rem;
}
.signup__got-account {
  margin: 0;
  color: var(--secondary-light-color);
}
</style>
