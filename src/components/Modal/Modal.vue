<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";

const props = defineProps({ isActive: { type: Boolean, required: true } });
const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
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
  <Teleport to="#dynamic">
    <Transition name="modal__transition">
      <div class="modal" v-if="props.isActive" @click.left.self="handleClose">
        <div class="modal__content">
          <button class="modal__close" @click="handleClose">x</button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
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
  background-color: var(--background-color);
  min-width: 15rem;
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
