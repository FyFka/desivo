<script setup lang="ts">
import { useConnection } from "../hooks/useConnection";

const { connectionId } = useConnection();
</script>

<template>
  <footer class="footer">
    <p class="footer__connection-id">{{ connectionId ? connectionId : "Connection is not established" }}</p>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  right: 0.5rem;
  user-select: none;
  touch-action: none;
  pointer-events: none;
}
.footer__connection-id {
  margin: 0;
  color: rgb(255 255 255 / 15%);
  font-size: 0.5rem;
  mix-blend-mode: difference;
  line-height: 0.8;
}
</style>
