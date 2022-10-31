<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useImageReader } from "../../hooks/useImageReader";

const props = defineProps<{ editable: boolean; avatar: string; updateAvatar: (newAvatar: string) => Promise<void> }>();
const uploadAvatarRef = ref();
const toast = useToast();
const { readImage } = useImageReader(handleReadedImage);

const delegateEvent = () => {
  if (props.editable) {
    uploadAvatarRef.value.click();
  }
};

async function handleReadedImage(error: string | null, image: string) {
  if (error) {
    toast.error(error);
  } else {
    props.updateAvatar(image);
  }
}

const handleAvatarRead = async (evt: Event) => {
  readImage((evt.target as HTMLInputElement).files);
};
</script>

<template>
  <button class="avatar" :class="{ edit: !props.editable }" @click="delegateEvent">
    <input
      tabindex="-1"
      ref="uploadAvatarRef"
      type="file"
      class="avatar__upload--hidden"
      accept="image/*"
      @change="handleAvatarRead"
    />
    <div class="avatar__edit">
      <h4 class="avatar__edit-title">Edit avatar</h4>
    </div>
    <img class="avatar__img" v-bind:src="props.avatar" />
  </button>
</template>

<style scoped>
.avatar__edit {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(16, 18, 19, 0.796);
  transition: opacity 0.25s;
}
.avatar__edit-title {
  font-size: 1.5rem;
  margin: 0;
}
.avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 15rem;
  min-height: 15rem;
  border-radius: 100%;
  overflow: hidden;
  padding: 0;
}
.avatar.edit {
  cursor: default;
}
.avatar:not(.edit):hover > .avatar__edit {
  opacity: 1;
}
.avatar__upload--hidden {
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
.avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
