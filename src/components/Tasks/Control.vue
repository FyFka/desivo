<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({ isControlOpen: false });
const handleControlOpen = () => {
  state.isControlOpen = !state.isControlOpen;
};
</script>

<template>
  <div class="control">
    <button @click="handleControlOpen" class="control__btn">
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
    </button>
    <ul class="control__menu" v-if="state.isControlOpen">
      <li class="control__item"><button>Delete</button></li>
    </ul>
  </div>
</template>

<style scoped>
.control {
  position: relative;
  line-height: 0;
}
.control__menu {
  position: absolute;
  z-index: 200;
  right: 0;
  background-color: var(--background-color);
  border: 0.063rem solid var(--secondary-color);
  border-radius: 0.5rem;
  min-width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}
.control__item {
  display: block;
  border-bottom: 0.063rem solid var(--secondary-color);
}
.control__item:last-of-type {
  border-bottom: none;
}
.control__btn {
  padding: 0;
  width: 1rem;
  height: 1.5rem;
}
</style>
