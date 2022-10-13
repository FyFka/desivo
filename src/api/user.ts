import { IResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";
import { serverRequest } from "../utils/request";

export const getUserByToken = async (token: string) => {
  try {
    const req = await serverRequest.post<IResponse<IUser>>("/auth/validate", { token });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const getUserByAuth = async (username: string, password: string) => {
  try {
    const req = await serverRequest.post<IResponse<{ token: string; user: IUser }>>("/auth", { username, password });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const createUser = async (username: string, password: string, name: string, secondName: string) => {
  try {
    const req = await serverRequest.post<IResponse<{ token: string; user: IUser }>>("/auth/signup", {
      username,
      password,
      name,
      secondName,
    });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};
