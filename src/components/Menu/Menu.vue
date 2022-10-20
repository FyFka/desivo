<script setup lang="ts">
import { PropType } from "vue";
import { useRoute } from "vue-router";
import { MenuEnum } from "../../interfaces/IMenu";

const props = defineProps({ menuRoute: { type: Number as PropType<MenuEnum>, required: true } });

const route = useRoute();
</script>

<template>
  <div class="menu">
    <ul class="menu__list">
      <li>
        <RouterLink
          :class="{ active: props.menuRoute === MenuEnum.DISCUSSION }"
          class="menu__link"
          :to="`/project/${route.params.id}/discussion`"
          >Discussion</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :class="{ active: props.menuRoute === MenuEnum.TASKS }"
          class="menu__link"
          :to="`/project/${route.params.id}/tasks`"
          >Tasks</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu {
  width: 100%;
  border-bottom: 0.063rem solid var(--secondary-color);
}
.menu__list {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1rem;
  margin: 0;
  list-style: none;
}
.menu__link {
  position: relative;
  color: var(--secondary-light-color);
}
.active {
  color: var(--neutral-color);
}
.active::before {
  content: "";
  position: absolute;
  bottom: -0.75rem;
  left: 0;
  width: 100%;
  height: 0.2rem;
  background-color: var(--neutral-color);
  border-top-left-radius: 5rem;
  border-top-right-radius: 5rem;
}
</style>
