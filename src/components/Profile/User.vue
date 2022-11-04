<script setup lang="ts">
import { computed, reactive } from "vue";
import { IUserProfile } from "../../interfaces/IUser";

const props = defineProps<{
  editable: boolean;
  name: string;
  secondName: string;
  username: string;
  updateProfile: (newProfile: IUserProfile) => Promise<void>;
}>();

const state = reactive({
  name: props.name,
  secondName: props.secondName,
  username: props.username,
});

const handleUpdateProfile = () => {
  props.updateProfile({ name: state.name, secondName: state.secondName, username: state.username });
};

const isProfileChanged = computed(
  () => state.name !== props.name || state.secondName !== props.secondName || state.username !== props.username
);
</script>

<template>
  <div class="user">
    <template v-if="props.editable">
      <div class="user__row">
        <input class="user__info" v-model="state.name" placeholder="Name" />
        <input class="user__info" v-model="state.secondName" placeholder="Second Name" />
      </div>
      <input class="user__info" v-model="state.username" placeholder="Nickname" />
      <button class="user__info-upd" v-if="isProfileChanged" @click="handleUpdateProfile">Update</button>
    </template>
    <template v-else>
      <div class="user__row">
        <h3 class="user__info">{{ name }}</h3>
        <h3 class="user__info">{{ secondName }}</h3>
      </div>
      <h3 class="user__info user__info--username">{{ username }}</h3>
    </template>
  </div>
</template>

<style scoped>
.user {
  position: relative;
}
.user__row {
  display: flex;
  margin-bottom: 0.5rem;
  gap: 1rem;
}
.user__info {
  width: 100%;
  text-align: center;
  margin: 0;
}
.user__info-upd {
  position: absolute;
  bottom: -3rem;
  right: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 0.25rem 0.5rem 0.125rem rgba(16, 18, 19, 0.478);
  background-color: var(--highlight-color);
}
.user__info--username {
  color: var(--secondary-light-color);
}
</style>
