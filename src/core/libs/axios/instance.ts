import axios from "axios";
import axiosRetry from "axios-retry";
import { generatorRandomString } from "core/utils";
import { useEnvStore } from "~/core/store";
import { handleRetryCondition } from "./config";

import type { AxiosInstance } from "axios";

const newEnv = useEnvStore.getState().env;
const BASE_ENDPOINT = newEnv.SERVER_BASE_PATH;
const SECRET_KEY = newEnv.SERVER_PUBLIC_KEY;
const NEED_HEADER = newEnv.SERVER_NEED_HEADER_WHILE_REQUEST;
const needLog = () => newEnv.ENV === "Development" && newEnv.SERVER_LOGGING;

const getToastId = (): string => `axios-${generatorRandomString(10)}`;
const getBaseURL = (): string =>
  newEnv.SERVER_URL.startsWith("http://") || newEnv.SERVER_URL.startsWith("https://")
    ? newEnv.SERVER_URL
    : `http://${newEnv.SERVER_URL}`;

const instance: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: newEnv.SERVER_TIMEOUT,
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
  retries: newEnv.SERVER_RETRY_COUNT,
  shouldResetTimeout: true,
  retryCondition: (err) => handleRetryCondition(err, axiosRetry),
  retryDelay: () => axiosRetry.exponentialDelay(),
});

export { BASE_ENDPOINT, getToastId, instance, NEED_HEADER, needLog, SECRET_KEY };

