import axios from "axios";
import { rootApi } from "../constants";
import { IResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";

export const getUserByToken = async (token: string) => {
  try {
    const req = await axios.post<IResponse<IUser>>(`${rootApi}/auth/validate`, { token });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const getUserByAuth = async (username: string, password: string) => {
  try {
    const req = await axios.post<IResponse<{ token: string; user: IUser }>>(`${rootApi}/auth`, { username, password });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};

export const signup = async (username: string, password: string, name: string, secondName: string) => {
  try {
    const req = await axios.post<IResponse<{ token: string; user: IUser }>>(`${rootApi}/auth/signup`, {
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
