import axios, { AxiosResponse } from "axios";
import { ROOT_API } from "../constants";

export const serverRequest = axios.create({ baseURL: ROOT_API });

const handleInternalError = async (error: any) => {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const expiredTokenEvt = new CustomEvent("token-expired");
    window.dispatchEvent(expiredTokenEvt);
    return serverRequest(originalRequest);
  }
  return Promise.reject(error);
};

const handleResponse = (response: AxiosResponse) => {
  return response;
};

serverRequest.interceptors.response.use(handleResponse, handleInternalError);
