<template>
  <div class="menu">
    <ul class="menu__list">
      <li class="menu__item">Discussion</li>
      <li class="menu__item">Tasks</li>
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
.menu__item {
  color: var(--secondary-light-color);
}
</style>
