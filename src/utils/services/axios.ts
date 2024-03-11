import axiosClient, { AxiosError, AxiosResponse } from "axios";
import type { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const instance = axiosClient.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

const onRequest = (config: any): any => {
  if (config.url !== "/auth/login")
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  if (error?.response?.status === 401) {
    localStorage.clear();
    window.location.pathname = "/login";
  }
  return Promise.reject(error);
};

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const axios = <T>(cfg: AxiosRequestConfig) => instance.request<unknown, T>(cfg);
axiosRetry(instance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: axiosRetry.isRetryableError,
});

export default axios;
