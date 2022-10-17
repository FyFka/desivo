<script setup lang="ts">
import { appWindow } from "@tauri-apps/api/window";
import Footer from "./Footer.vue";

const handleClose = () => {
  appWindow.close();
};

const handleToggleMaximize = () => {
  appWindow.toggleMaximize();
};

const handleMinimize = () => {
  appWindow.minimize();
};
</script>

<template>
  <header data-tauri-drag-region class="frame">
    <h1 data-tauri-drag-region class="frame__app-name">Task-manager</h1>
    <div class="frame__controls">
      <button class="frame__minimize" @click="handleMinimize">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect fill="currentColor" width="10" height="1" x="1" y="6"></rect>
        </svg>
      </button>
      <button class="frame__toggle-maximize" @click="handleToggleMaximize">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor"></rect>
        </svg>
      </button>
      <button class="frame__close" @click="handleClose">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <polygon
            fill="currentColor"
            fill-rule="evenodd"
            points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"
          ></polygon>
        </svg>
      </button>
    </div>
  </header>
  <main id="dynamic" class="frame__content">
    <slot />
  </main>
  <Footer />
</template>

<style scoped>
.frame {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 1.5rem;
  background-color: var(--the-darkest-color);
}
.frame__app-name {
  font-size: 0.75rem;
  margin: 0 0.5rem;
  user-select: none;
  color: var(--secondary-color);
}
.frame__minimize,
.frame__toggle-maximize,
.frame__close {
  height: 1.5rem;
  width: 1.75rem;
  padding: 0.25rem;
  border-radius: 0;
}
.frame__minimize:hover,
.frame__toggle-maximize:hover {
  background-color: var(--secondary-color);
}
.frame__close:hover {
  background-color: var(--highlight-danger-color);
}
.frame__content {
  height: calc(100vh - 1.5rem);
  position: relative;
  overflow: hidden;
}
</style>
