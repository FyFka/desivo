<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { createProject } from "../api/project";

const state = reactive({ name: "", image: new Uint8Array(), imageName: "", error: "" });
const uploadImageRef = ref();

const router = useRouter();

const handleCreateProject = async () => {
  console.log(state.image.length);
  const createProjResp = await createProject(state.name, state.image.length > 0 ? state.image : undefined);
  if (createProjResp.value) {
    router.push("/projects");
  } else {
    state.error = createProjResp.message!;
  }
};

const delegateEvent = () => {
  uploadImageRef.value.click();
};

const handleImageUpload = async (e: Event) => {
  const pattern = /image*/;
  const file = (e.target as HTMLInputElement).files![0];
  if (!file.type.match(pattern)) {
    state.error = "Invalid image format";
    return;
  }
  let buffer = await file.arrayBuffer();
  state.image = new Uint8Array(buffer);
  state.imageName = file.name;
};
</script>

<template>
  <form @submit.prevent="handleCreateProject" class="create-project">
    <h3 class="create-project__title">Create Project</h3>
    <input v-model="state.name" class="create-project__inp" type="text" placeholder="Name" required />
    <div class="create-project__row">
      <label for="create-project[image]">Image</label>
      <button @click="delegateEvent" class="create-project__upload" type="button">
        Upload <b v-if="state.imageName">{{ state.imageName }}</b>
      </button>
      <input
        id="create-project[image]"
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
.create-project__inp {
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
.create-project__signup {
  display: inline-block;
  margin-left: 0.25rem;
}
.create-project__not-member {
  margin: 0;
  color: var(--secondary-light-color);
}
</style>
