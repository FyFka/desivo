import { IProject } from "../interfaces/IProject";
import { IResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";
import { serverRequest } from "../utils/request";

export const getUserByUsername = async (username: string) => {
  try {
    const req = await serverRequest.get<IResponse<IUser>>(`/user/profile/${username}`);
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const getUserProjectsByUsername = async (username: string) => {
  try {
    const req = await serverRequest.get<IResponse<IProject[]>>(`/user/projects/${username}`);
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const changeProfileAvatar = async (avatar: string, token: string) => {
  try {
    const req = await serverRequest.post<IResponse<string>>(
      "/user/change/avatar",
      { avatar },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const changeUserProfile = async (name: string, secondName: string, username: string, token: string) => {
  try {
    const req = await serverRequest.post<IResponse<{ name: string; secondName: string; username: string }>>(
      "/user/change/profile",
      { name, secondName, username },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};
