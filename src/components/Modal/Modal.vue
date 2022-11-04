<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { useStore } from "../../hooks/useStore";

const store = useStore();

const handleClose = () => {
  store.commit("setModal", null);
};

const onKeyDown = (evt: KeyboardEvent) => {
  if (evt.key === "Escape") {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <Transition name="modal__transition">
    <div @click.left.self="handleClose" v-if="store.state.modal" class="modal">
      <div class="modal__content">
        <button @click="handleClose" class="modal__close">x</button>
        <component :is="store.state.modal?.component" v-bind="store.state.modal.props" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: calc(100vh - 1.5rem);
  width: 100%;
  z-index: 7999;
  background: rgba(79, 100, 158, 0.8);
}
.modal__close {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border-radius: 0.25rem;
  background: transparent;
}
.modal__content {
  position: relative;
  padding: 1.5rem;
  background-color: var(--dark-color);
  min-width: 15rem;
  max-width: 30rem;
  border-radius: 0.5rem;
}
.modal__transition-enter-active,
.modal__transition-leave-active {
  transition: all 0.25s ease;
}
.modal__transition-enter-from,
.modal__transition-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
