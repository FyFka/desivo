<script setup lang="ts">
import Layout from "./Layouts/PageLayout.vue";
import Avatar from "../components/Profile/Avatar.vue";
import User from "../components/Profile/User.vue";
import Projects from "../components/Profile/ProjectList.vue";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "../hooks/useStore";
import { useRoute } from "vue-router";
import Loader from "../components/Loader.vue";
import { changeProfileAvatar, changeUserProfile, getUserByUsername, getUserProjectsByUsername } from "../api/profile";
import { IUser, IUserProfile } from "../interfaces/IUser";
import { IProject } from "../interfaces/IProject";
import { useToast } from "vue-toastification";

interface IProfileState {
  user: IUser | null;
  projects: IProject[];
  isProfileChanged: boolean;
}

const store = useStore();
const route = useRoute();
const toast = useToast();
const state = reactive<IProfileState>({ user: null, projects: [], isProfileChanged: false });
const isOwnerProfile = computed(() => store.state.user?.username === route.params.username || state.isProfileChanged);

const getUser = async () => {
  const user = await getUserByUsername(route.params.username.toString());
  if (user.value) {
    state.user = user.value;
  } else if (user.message) {
    toast.error(user.message);
  }
};

const updateAvatar = async (newAvatar: string) => {
  const avatar = await changeProfileAvatar(newAvatar);
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

const updateProfile = async (newProfile: IUserProfile) => {
  const profile = await changeUserProfile(newProfile);
  if (profile.value) {
    const { name, secondName, username } = profile.value;
    store.commit("setProfile", profile.value);
    state.user = { ...state.user!, name, secondName, username };
    state.isProfileChanged = true;
    toast.success("Profile changed!");
  } else if (profile.message) {
    toast.error(profile.message);
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
        <Avatar :avatar="state.user.avatar" :editable="isOwnerProfile" :update-avatar="updateAvatar" />
        <User
          :name="state.user.name"
          :second-name="state.user.secondName"
          :username="state.user.username"
          :editable="isOwnerProfile"
          :update-profile="updateProfile"
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
