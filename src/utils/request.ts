import axios, { AxiosResponse } from "axios";
import { ROOT_API } from "../constants";

export const serverRequest = axios.create({ baseURL: ROOT_API });

const errorHandler = async (error: any) => {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const expiredTokenEvt = new CustomEvent("token-expired");
    window.dispatchEvent(expiredTokenEvt);
    return serverRequest(originalRequest);
  }
  return Promise.reject(error);
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

serverRequest.interceptors.response.use(responseHandler, errorHandler);
