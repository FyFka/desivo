<script setup lang="ts">
import Layout from "./Layouts/PageLayout.vue";
import Menu from "../components/Menu/Menu.vue";
import { MenuEnum } from "../interfaces/IMenu";
</script>

<template>
  <Layout>
    <div class="wrapper">
      <Menu :menu-route="MenuEnum.TASKS" />
      <div>tasks</div>
    </div>
  </Layout>
</template>
