<script setup lang="ts">
import ProjectLayout from "./Layouts/ProjectLayout.vue";
import { MenuEnum } from "../interfaces/IMenu";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const shareRef = ref();

const copyToClipboard = (element: HTMLInputElement) => {
  navigator.clipboard.writeText(element.value);
};

const handleShare = () => {
  shareRef.value.select();
  copyToClipboard(shareRef.value as HTMLInputElement);
};
</script>

<template>
  <ProjectLayout :menu-route="MenuEnum.SHARE">
    <div class="share">
      <h3 class="share__title">Send your team project id:</h3>
      <input ref="shareRef" @click="handleShare" class="share__id" :value="route.params.id" readonly />
    </div>
  </ProjectLayout>
</template>

<style scoped>
.share {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.share__id {
  cursor: pointer;
  width: 17rem;
  text-align: center;
  font-size: 1rem;
}
.share__title {
  font-size: 1rem;
  margin: 0 0 0.5rem;
}
</style>
