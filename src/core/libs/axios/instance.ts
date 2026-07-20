import axios from "axios";
import axiosRetry from "axios-retry";
import { useEnvStore } from "core/store";
import { generatorRandomString } from "core/utils";
import { handleRetryCondition } from "./config";

import type { AxiosInstance } from "axios";

const getEnv = () => useEnvStore.getState().env;

const getToastId = (): string => `axios-${generatorRandomString(10)}`;
const getBaseURL = (): string => {
  const SERVER_URL = getEnv().SERVER_URL;
  return SERVER_URL.startsWith("http://") || SERVER_URL.startsWith("https://") ? SERVER_URL : `http://${SERVER_URL}`;
};
const needLog = () => getEnv().ENV === "Development" && getEnv().SERVER_LOGGING;

const instance: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: getEnv().SERVER_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  transitional: {
    clarifyTimeoutError: true,
  },
});

axiosRetry(instance, {
  retries: getEnv().SERVER_RETRY_COUNT,
  shouldResetTimeout: true,
  retryCondition: (err) => handleRetryCondition(err, axiosRetry),
  retryDelay: () => axiosRetry.exponentialDelay(),
});

export { getEnv, getToastId, instance, needLog };
export const BASE_ENDPOINT = () => getEnv().SERVER_BASE_PATH;
export const SECRET_KEY = () => getEnv().SERVER_PUBLIC_KEY;
export const NEED_HEADER = () => getEnv().SERVER_NEED_HEADER_WHILE_REQUEST;
