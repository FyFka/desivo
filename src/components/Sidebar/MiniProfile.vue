<script setup lang="ts">
import { computed } from "vue";
import { useAuth } from "../../hooks/useAuth";
import { useStore } from "../../hooks/useStore";

const { logout } = useAuth();
const store = useStore();

const handleLogout = async () => {
  await logout();
};

const user = computed(() => store.state.user);
</script>

<template>
  <div class="mini-profile">
    <RouterLink class="mini-profile__container" :to="`/profile/${user?.username}`" v-bind:title="user?.username">
      <img class="mini-profile__avatar" v-bind:src="user?.avatar" alt="avatar" />
    </RouterLink>
    <button @click="handleLogout" class="mini-profile__logout" title="logout">
      <img class="mini-profile__logout-img" src="../../assets/logout.svg" alt="logout" />
    </button>
  </div>
</template>

<style scoped>
.mini-profile__container {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
}
.mini-profile__avatar {
  object-fit: cover;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
}

.mini-profile__logout {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 2.5rem;
}
.mini-profile__logout:hover {
  background-color: var(--secondary-color);
}
.mini-profile__logout-img {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
