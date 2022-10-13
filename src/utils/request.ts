import axios, { AxiosResponse } from "axios";
import { rootApi } from "../constants";

export const serverRequest = axios.create({ baseURL: rootApi });

const errorHandler = async (error: any) => {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const expiredTokenEvt = new CustomEvent("expiredToken");
    window.dispatchEvent(expiredTokenEvt);
    return serverRequest(originalRequest);
  }
  return Promise.reject(error);
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

serverRequest.interceptors.response.use(responseHandler, errorHandler);
