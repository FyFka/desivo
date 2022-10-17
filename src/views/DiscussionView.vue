<script setup lang="ts">
import DiscussionHistory from "../components/Discussion/DiscussionHistory.vue";
import { MenuEnum } from "../interfaces/IMenu";
import ProjectLayout from "./Layouts/ProjectLayout.vue";
import UserMessage from "../components/Discussion/UserMessage.vue";
</script>

<template>
  <ProjectLayout :menu-route="MenuEnum.DISCUSSION">
    <div class="discussion">
      <DiscussionHistory />
      <UserMessage />
    </div>
  </ProjectLayout>
</template>

<style scoped>
.discussion {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
