<script setup lang="ts">
const props = defineProps<{ confirm: () => void; title: string }>();
const emit = defineEmits(["close"]);

const handleDelete = async () => {
  props.confirm();
  emit("close");
};
</script>

<template>
  <div class="delete">
    <h3 class="delete__title">{{ `Delete '${props.title}'` }}</h3>
    <p class="delete__description">
      Are you sure you want to delete <span class="delete__highlight">{{ props.title }}</span
      >?
    </p>
    <p class="delete__warning">This action cannot be undone.</p>
    <div class="delete__row">
      <button type="submit" class="delete__cancel" @click="emit('close')">Cancel</button>
      <button type="submit" class="delete__confirm" @click="handleDelete">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.delete {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.delete__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}
.delete__description {
  margin: 0;
}
.delete__warning {
  margin: 0 0 1rem;
  color: var(--highlight-danger-color);
  font-weight: 700;
}
.delete__highlight {
  font-weight: 700;
}
.delete__cancel {
  background-color: var(--highlight-color);
  width: 100%;
}
.delete__row {
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
}
.delete__confirm {
  width: 100%;
  background-color: var(--highlight-danger-color);
}
</style>
