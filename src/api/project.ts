import axios from "axios";
import { rootApi } from "../constants";
import { IResponse } from "../interfaces/IResponse";

export const createProject = async (name: string, image?: Uint8Array) => {
  try {
    const req = await axios.post<IResponse<any>>(`${rootApi}/project/create`, { name, image });
    return req.data;
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Unknown network error" };
  }
};
