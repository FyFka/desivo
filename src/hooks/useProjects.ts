import { computed } from "vue";
import { useStore } from "vuex";
import { createProject, getAllProjects, joinProject } from "../api/project";
import { key } from "../store";

export const useProjects = () => {
  const store = useStore(key);

  const refreshProjects = async () => {
    if (!store.state.token) return;
    const projects = await getAllProjects(store.state.token);
    if (Array.isArray(projects.value)) {
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

  const joinToProject = async (projectId: string) => {
    const joinProjResp = await joinProject(projectId, store.state.token);
    if (joinProjResp.value) {
      store.commit("addProject", joinProjResp.value);
    } else {
      return joinProjResp.message;
    }
  };

  const projects = computed(() => store.state.projects);

  return { refreshProjects, addProject, projects, joinToProject };
};
