import axios, { AxiosError } from "axios";
import { rootApi } from "../constants";
import { IResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";

export const getUserByToken = async (token: string) => {
  try {
    const req = await axios.post<IResponse<IUser>>(`${rootApi}/auth/validate`, { token });
    return req.data;
  } catch (err) {
    return { message: err instanceof AxiosError ? err.message : "Unknown network error" };
  }
};

export const getUserByAuth = async (username: string, password: string) => {
  try {
    const req = await axios.post<IResponse<{ token: string; user: IUser }>>(`${rootApi}/auth`, { username, password });
    return req.data;
  } catch (err) {
    return { message: err instanceof AxiosError ? err.message : "Unknown network error" };
  }
};
