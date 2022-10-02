<script setup lang="ts">
const props = defineProps({
  avatarUrl: String,
});

const handleLogout = () => {
  console.log("logout");
};
</script>

<template>
  <div class="mini-profile">
    <button class="mini-profile__profile-container">
      <h4 class="mini-profile__title">Profile</h4>
      <img class="mini-profile__avatar" v-bind:src="avatarUrl" alt="avatar" />
    </button>
    <button @click="handleLogout" class="mini-profile__logout">
      <img src="../../assets/logout.svg" alt="logout" />
    </button>
  </div>
</template>

<style scoped>
.mini-profile {
}
.mini-profile__profile-container {
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
.mini-profile__title {
  margin: 0.5rem 0;
  color: var(--secondary-light-color);
  font-size: 0.75rem;
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
</style>
