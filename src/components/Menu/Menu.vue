<script setup lang="ts">
import { useRouter } from "vue-router";
import MiniProfile from "./MiniProfile.vue";

const router = useRouter();

const handleProjects = () => {
  router.push("/projects");
};
</script>

<template>
  <aside class="menu">
    <div class="menu__container">
      <h4 class="menu__menu-title">Menu</h4>
      <ul class="menu__list">
        <li class="menu__item">
          <button @click="handleProjects" class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
        <li class="menu__item">
          <button class="menu__control">
            <img class="menu__item-img" src="../../assets/projects.svg" />
          </button>
        </li>
      </ul>
      <div class="menu__profile">
        <MiniProfile />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.menu {
  height: 100%;
  width: 4.5rem;
  min-width: 4.5rem;
  padding: 0.5rem;
  border-right: 0.063rem solid var(--secondary-color);
}
.menu__container {
  height: 100%;
  width: 100%;
  text-align: center;
  position: relative;
}

.menu__list {
  margin: 0;
  padding: 0;
  list-style: none;
  height: calc(100vh - 3rem - 2rem - 7.75rem);
  overflow-y: overlay;
}
.menu__menu-title {
  margin: 0.5rem 0;
  color: var(--secondary-light-color);
  font-size: 0.75rem;
}
.menu__control {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 2.5rem;
}
.menu__control:hover {
  background-color: var(--secondary-color);
}
.menu__item-img {
  width: 1.25rem;
  height: 1.25rem;
}
.menu__item {
  margin-bottom: 0.5rem;
}
.menu__item:last-of-type {
  margin-bottom: 0;
}
.menu__profile {
  position: absolute;
  width: 100%;
  bottom: 0.5rem;
  left: 0;
  background: var(--background-color);
  z-index: 2999;
}
</style>
