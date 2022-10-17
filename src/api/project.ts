import { IProject } from "../interfaces/IProject";
import { IResponse } from "../interfaces/IResponse";
import { serverRequest } from "../utils/request";

export const createProject = async (name: string, image: string, token: string) => {
  try {
    const req = await serverRequest.post<IResponse<IProject>>(
      "/project/create",
      { name, image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const getAllProjects = async (token: string) => {
  try {
    const req = await serverRequest.get<IResponse<IProject[]>>("/project/my-all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const joinProject = async (projectId: string, token: string) => {
  try {
    const req = await serverRequest.post<IResponse<IProject>>(
      "/project/join",
      { projectId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};
