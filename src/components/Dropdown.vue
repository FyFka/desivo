<script setup lang="ts">
import { reactive, StyleValue } from "vue";

const props = defineProps<{ htmlButtonOptions?: StyleValue }>();

const state = reactive({ isControlOpen: false });

const handleCloseControl = () => {
  state.isControlOpen = false;
  document.removeEventListener("click", handleCloseControl);
  document.removeEventListener("keydown", onKeyDown);
};

const openControl = () => {
  if (!state.isControlOpen) {
    state.isControlOpen = true;
    document.addEventListener("click", handleCloseControl);
    document.addEventListener("keydown", onKeyDown);
  } else {
    handleCloseControl();
  }
};

const onKeyDown = (evt: KeyboardEvent) => {
  if (evt.key === "Escape") {
    handleCloseControl();
  }
};
</script>

<template>
  <div class="dropdown">
    <button @click.stop="openControl" class="dropdown__open" :style="props.htmlButtonOptions">
      <slot name="button">
        <svg width="100%" height="100%">
          <g transform="rotate(90 12 12)">
            <circle
              cx="1"
              cy="1"
              r="1"
              transform="translate(5 11)"
              stroke="currentColor"
              fill="currentColor"
              stroke-miterlimit="10"
              stroke-width=".5"
            />
            <circle
              cx="1"
              cy="1"
              r="1"
              transform="translate(11 11)"
              stroke="currentColor"
              fill="currentColor"
              stroke-miterlimit="10"
              stroke-width=".5"
            />
            <circle
              cx="1"
              cy="1"
              r="1"
              transform="translate(17 11)"
              stroke="currentColor"
              fill="currentColor"
              stroke-miterlimit="10"
              stroke-width=".5"
            />
          </g>
        </svg>
      </slot>
    </button>
    <div class="dropdown__content" v-if="state.isControlOpen">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  height: 100%;
  width: 100%;
  position: relative;
  line-height: 0;
  flex: 1;
}
.dropdown__open {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-width: 1rem;
  width: 100%;
  height: 100%;
}
.dropdown__content {
  position: absolute;
  z-index: 200;
  right: 0;
  background-color: var(--dark-color);
  border: 0.063rem solid var(--secondary-color);
  border-radius: 0.5rem;
  min-width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
