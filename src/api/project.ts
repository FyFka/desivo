import { IProject } from "../interfaces/IProject";
import { IResponse } from "../interfaces/IResponse";
import { serverRequest } from "../utils/request";

export const createProject = async (name: string, image: string, token: string) => {
  try {
    const req = await serverRequest.post<IResponse<any>>(
      "/project/create",
      { name, image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return req.data;
  } catch (err) {
    console.log(err);
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const getAllProjects = async (token: string): Promise<IResponse<IProject[]>> => {
  try {
    const req = await serverRequest.get<IResponse<any>>("/project/my-all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return req.data;
  } catch (err) {
    console.log(err);
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};
