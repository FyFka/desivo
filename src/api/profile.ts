import { IProject } from "../interfaces/IProject";
import { IResponse } from "../interfaces/IResponse";
import { IUser, IUserProfile } from "../interfaces/IUser";
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

export const changeProfileAvatar = async (avatar: string) => {
  try {
    const req = await serverRequest.post<IResponse<string>>("/user/change/avatar", { avatar });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const changeUserProfile = async (userProfile: IUserProfile) => {
  try {
    const req = await serverRequest.post<IResponse<IUserProfile>>("/user/change/profile", userProfile);
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};
