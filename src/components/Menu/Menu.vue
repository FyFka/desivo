<script setup lang="ts">
import MiniProfile from "./MiniProfile.vue";
import { reactive } from "vue";
import Modal from "../Modal.vue";
import CreateProject from "../CreateProject.vue";
import { useProjects } from "../../hooks/useProjects";

const { projects } = useProjects();
const state = reactive({ isModalActive: false });

const handleCreateProject = () => {
  state.isModalActive = true;
};
</script>

<template>
  <aside class="menu">
    <div class="menu__container">
      <h4 class="menu__menu-title">Menu</h4>
      <ul class="menu__list">
        <li class="menu__item">
          <button @click="handleCreateProject" class="menu__control" title="create project">
            <img class="menu__item-img" src="../../assets/new-project.svg" />
          </button>
        </li>
        <li v-for="project in projects" :key="project.name" class="menu__item">
          <button class="menu__control" v-bind:title="project.name">
            <img class="menu__item-img" v-bind:src="project.image" />
          </button>
        </li>
      </ul>
      <div class="menu__profile">
        <MiniProfile />
      </div>
    </div>
  </aside>
  <Modal :is-active="state.isModalActive" @close="state.isModalActive = false">
    <CreateProject />
  </Modal>
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
}
</style>
