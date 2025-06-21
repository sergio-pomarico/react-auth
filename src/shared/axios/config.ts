import { type AxiosRequestConfig, type RawAxiosRequestHeaders } from "axios";

/**
 *
 * @param {string} url
 * @return {AxiosRequestConfig}
 */
export const buidConfig = (
  url: string,
  customHeaders?: RawAxiosRequestHeaders
): AxiosRequestConfig => {
  const commonHeaders = {
    "Content-Type": "application/json",
  };

  /**
   * build Axios config request
   */
  const config: AxiosRequestConfig = {
    baseURL: url,
    withCredentials: false,
    timeout: 30000,
    headers: { ...commonHeaders, ...customHeaders },
  };
  return config;
};
