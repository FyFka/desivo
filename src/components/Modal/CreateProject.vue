<script setup lang="ts">
import { reactive, ref } from "vue";
import { useProjects } from "../../hooks/useProjects";
import { useImageReader } from "../../hooks/useImageReader";
import { useModal } from "../../hooks/useModal";

const state = reactive({ name: "", image: "", imageName: "", error: "" });
const uploadImageRef = ref();
const { addProject } = useProjects();
const { readImage } = useImageReader(handleReadedImage);
const { hideModal } = useModal();

const handleCreateProject = async () => {
  const addProjectResult = await addProject(state.name, state.image);
  if (addProjectResult) {
    state.error = addProjectResult;
  } else {
    hideModal();
  }
};

const delegateEvent = () => {
  uploadImageRef.value.click();
};

function handleReadedImage(error: string | null, image: string, name: string) {
  if (error) {
    state.error = error;
  } else {
    state.image = image;
    state.imageName = name;
  }
}

const handleImageUpload = async (evt: Event) => {
  readImage((evt.target as HTMLInputElement).files);
};
</script>

<template>
  <form @submit.prevent="handleCreateProject" class="create-project">
    <h3 class="create-project__title">Create Project</h3>
    <input v-model="state.name" class="create-project__field" placeholder="Name" required />
    <div class="create-project__row">
      <label for="create-project[image]">Image</label>
      <button @click="delegateEvent" class="create-project__upload" type="button">
        Upload <b v-if="state.imageName">{{ state.imageName }}</b>
      </button>
      <input
        id="create-project[image]"
        tabindex="-1"
        ref="uploadImageRef"
        type="file"
        class="create-project__upload--hidden"
        accept="image/*"
        @change="handleImageUpload"
      />
    </div>
    <button type="submit" class="create-project__submit">Create</button>
    <p class="create-project__error" v-if="state.error">{{ state.error }}</p>
  </form>
</template>

<style scoped>
.create-project {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.create-project__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}
.create-project__submit {
  background-color: var(--highlight-color);
  width: 100%;
}
.create-project__row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}
.create-project__field {
  width: 100%;
  margin-bottom: 1rem;
}
.create-project__upload--hidden {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  padding: 0;
  border: none;
  background: transparent;
  overflow: hidden;
  user-select: none;
}
.create-project__upload {
  width: 100%;
  white-space: nowrap;
  max-width: 15rem;
  background-color: var(--secondary-color);
  overflow: hidden;
  text-overflow: ellipsis;
}
.create-project__error {
  width: 100%;
  text-align: center;
  color: var(--highlight-danger-color);
  margin: 0.5rem 0 0;
}
</style>
