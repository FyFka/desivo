<template>
  <div class="loader">
    <svg class="loader__container" width="100px" height="100px" viewBox="-3 -4 39 39">
      <polygon
        class="loader__triangle"
        fill="transparent"
        stroke="#fefefe"
        stroke-width="1"
        points="16,0 32,32 0,32"
      ></polygon>
    </svg>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.loader__container {
  transform-origin: 50% 65%;
}
.loader__triangle {
  stroke-dasharray: 17;
  animation: dash-animation 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
}
@keyframes dash-animation {
  to {
    stroke-dashoffset: 136;
  }
}
</style>
