<script setup lang="ts">
import Layout from "./Layouts/PageLayout.vue";
import Avatar from "../components/Profile/Avatar.vue";
import User from "../components/Profile/User.vue";
import Projects from "../components/Profile/Projects.vue";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "../hooks/useStore";
import { useRoute } from "vue-router";
import Loader from "../components/Loader.vue";
import { changeProfileAvatar, changeUserProfile, getUserByUsername, getUserProjectsByUsername } from "../api/profile";
import { IUser } from "../interfaces/IUser";
import { IProject } from "../interfaces/IProject";
import { useToast } from "vue-toastification";

const store = useStore();
const route = useRoute();
const toast = useToast();
const state = reactive<{ user: IUser | null; projects: IProject[] }>({ user: null, projects: [] });
const isOwnerProfile = computed(() => store.state.user?.username === route.params.username);

const getUser = async () => {
  const user = await getUserByUsername(route.params.username.toString());
  if (user.value) {
    state.user = user.value;
  } else {
    console.log(user.message);
  }
};

const changeAvatar = async (newAvatar: string) => {
  const avatar = await changeProfileAvatar(newAvatar, store.state.token);
  if (avatar.value) {
    store.commit("setAvatar", avatar.value);
    state.user!.avatar = avatar.value;
    toast.success("Avatar changed!");
  } else if (avatar.message) {
    toast.error(avatar.message);
  }
};

const getProjects = async () => {
  const projects = await getUserProjectsByUsername(route.params.username.toString());
  if (projects.value) {
    state.projects = projects.value;
  } else if (projects.message) {
    toast.error(projects.message);
  }
};

const changeProfile = async (name: string, secondName: string, username: string) => {
  const updatedProfile = await changeUserProfile(name, secondName, username, store.state.token);
  if (updatedProfile.value) {
    store.commit("setProfile", {
      name: updatedProfile.value.name,
      secondName: updatedProfile.value.secondName,
      username: updatedProfile.value.username,
    });
    state.user!.name = updatedProfile.value.name;
    state.user!.secondName = updatedProfile.value.secondName;
    state.user!.username = updatedProfile.value.username;
    toast.success("Profile changed!");
  } else if (updatedProfile.message) {
    toast.error(updatedProfile.message);
  }
};

onMounted(async () => {
  await getUser();
  await getProjects();
});
</script>

<template>
  <Layout>
    <div class="profile__container">
      <template v-if="state.user">
        <Avatar :avatar="state.user.avatar" :editable="isOwnerProfile" :change-avatar="changeAvatar" />
        <User
          :name="state.user.name"
          :second-name="state.user.secondName"
          :username="state.user.username"
          :editable="isOwnerProfile"
          :change-profile="changeProfile"
        />
        <Projects :projects="state.projects" />
      </template>
      <Loader v-else />
    </div>
  </Layout>
</template>

<style scoped>
.profile__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  gap: 1.25rem;
  height: 100%;
  overflow-y: auto;
}
</style>
