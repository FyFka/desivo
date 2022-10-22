<script setup lang="ts">
import Layout from "./Layouts/PageLayout.vue";
import Menu from "../components/Menu/Menu.vue";
import { MenuEnum } from "../interfaces/IMenu";
import Column from "../components/Tasks/Column.vue";
</script>

<template>
  <Layout>
    <div class="wrapper">
      <Menu :menu-route="MenuEnum.TASKS" />
      <div class="tasks">
        <Column />
        <Column />
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.tasks {
  padding: 0.5rem;
  display: flex;
  gap: 0.75rem;
  height: 100%;
  width: 100%;
}
</style>
