<script setup lang="ts">
import MiniProfile from "./MiniProfile.vue";
</script>

<template>
  <aside class="menu">
    <h4 class="menu__menu-title">Menu</h4>
    <ul>
      <li>Cr</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <MiniProfile
      :avatar-url="'https://user-images.githubusercontent.com/76843185/193453608-4dd919d0-ee0f-4b1b-bb7b-fa02544c1cf6.jpg'"
    />
  </aside>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 4.5rem;
  padding: 0.5rem;
  border-right: 0.063rem solid var(--secondary-color);
}
.menu__menu-title {
  margin: 0.5rem 0;
  color: var(--secondary-light-color);
  font-size: 0.75rem;
}
</style>
