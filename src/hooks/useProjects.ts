import { computed } from "vue";
import { useStore } from "vuex";
import { createProject, getAllProjects } from "../api/project";
import { key } from "../store";

export const useProjects = () => {
  const store = useStore(key);

  const refreshProjects = async () => {
    if (!store.state.token) return;
    const projects = await getAllProjects(store.state.token);
    if (projects.value && projects.value.length > 1) {
      store.commit("setProjects", projects.value);
    }
  };

  const addProject = async (name: string, image: string) => {
    const createProjResp = await createProject(name, image, store.state.token);
    if (createProjResp.value) {
      store.commit("addProject", createProjResp.value);
    } else {
      return createProjResp.message;
    }
  };

  const projects = computed(() => store.state.projects);

  return { refreshProjects, addProject, projects };
};
