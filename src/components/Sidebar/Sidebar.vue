<script setup lang="ts">
import MiniProfile from "./MiniProfile.vue";
import Modal from "../Modal/Modal.vue";
import CreateProject from "../Modal/CreateProject.vue";
import { useProjects } from "../../hooks/useProjects";
import { useModal } from "../../hooks/useModal";
import JoinProject from "../Modal/JoinProject.vue";
import { computed, reactive } from "vue";
import { useStore } from "../../hooks/useStore";

enum ModalType {
  JOIN_PROJECT,
  CREATE_PROJECT,
}

const store = useStore();
const state = reactive({ modalType: ModalType.CREATE_PROJECT });
const [isCreateProjectOpen, toggleModal] = useModal();

const handleCreateProject = () => {
  state.modalType = ModalType.CREATE_PROJECT;
  toggleModal(true);
};

const handleJoinToProject = () => {
  state.modalType = ModalType.JOIN_PROJECT;
  toggleModal(true);
};

const projects = computed(() => store.state.projects);
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__container">
      <h4 class="sidebar__menu-title">Sidebar</h4>
      <ul class="sidebar__list">
        <li v-for="project in projects" :key="project.id" class="sidebar__item">
          <RouterLink class="sidebar__control" :to="`/project/${project.id}/tasks`" :title="project.name">
            <img class="sidebar__item-img" v-bind:src="project.image" />
          </RouterLink>
        </li>
        <li class="sidebar__item">
          <button @click="handleCreateProject" class="sidebar__control" title="create project">
            <img class="sidebar__control-img" src="../../assets/new-project.svg" />
          </button>
        </li>
        <li class="sidebar__item">
          <button @click="handleJoinToProject" class="sidebar__control" title="join to project">
            <img class="sidebar__control-img" src="../../assets/join-project.svg" />
          </button>
        </li>
      </ul>
      <div class="sidebar__profile">
        <MiniProfile />
      </div>
    </div>
  </aside>
  <Modal :is-active="isCreateProjectOpen" @close="toggleModal(false)">
    <CreateProject v-if="state.modalType === ModalType.CREATE_PROJECT" @close="toggleModal(false)" />
    <JoinProject v-if="state.modalType === ModalType.JOIN_PROJECT" @close="toggleModal(false)" />
  </Modal>
</template>

<style scoped>
.sidebar {
  height: 100%;
  width: 4.5rem;
  min-width: 4.5rem;
  padding: 0.5rem;
  border-right: 0.063rem solid var(--secondary-color);
  background-color: var(--the-darkest-color);
}
.sidebar__container {
  height: 100%;
  width: 100%;
  text-align: center;
  position: relative;
}
.sidebar__list {
  margin: 0;
  padding: 0;
  list-style: none;
  height: calc(100vh - 3rem - 2rem - 7.75rem);
  overflow-y: overlay;
}
.sidebar__menu-title {
  margin: 0.5rem 0;
  color: var(--secondary-light-color);
  font-size: 0.75rem;
}
.sidebar__control {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
}
.sidebar__control:hover {
  background-color: var(--secondary-color);
}
.sidebar__item-img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.15rem;
}
.sidebar__control-img {
  width: 1.25rem;
  height: 1.25rem;
}
.sidebar__item {
  margin-bottom: 0.5rem;
}
.sidebar__item:last-of-type {
  margin-bottom: 0;
}
.sidebar__profile {
  position: absolute;
  width: 100%;
  bottom: 0.5rem;
  left: 0;
}
</style>
