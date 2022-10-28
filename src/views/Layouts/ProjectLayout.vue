<script setup lang="ts">
import { MenuEnum } from "../../interfaces/IMenu";
import Menu from "../../components/Menu/Menu.vue";
import PageLayout from "./PageLayout.vue";

const props = defineProps<{ menuRoute: MenuEnum }>();
</script>

<template>
  <PageLayout>
    <div class="project-layout">
      <Menu :menu-route="props.menuRoute" />
      <slot />
    </div>
  </PageLayout>
</template>

<style scoped>
.project-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
