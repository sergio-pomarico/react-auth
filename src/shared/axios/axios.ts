import axios, {
  type AxiosInstance,
  type AxiosInterceptorManager,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

type AuthStorage = {
  state: {
    isAuth: boolean;
    token: string;
    refresh: string;
  };
};

/**
 * @class HTTP Class is a es6 wrapper class for axios.
 * @param {import("axios").AxiosRequestConfig} config - axios Request Config.
 * @link [AxiosRequestConfig](https://github.com/axios/axios#request-config)
 */
export class HTTPClient {
  private static instance: HTTPClient;
  private axiosInstance: AxiosInstance;

  interceptors: {
    /**
     * The **Request** interceptor will be call rigth before the `http request`
     * @summary
     * This a useful method especially if you need to send a token on each request.
     */
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    /**
     * The **Response** interceptor will be call rigth before the `http request` is received.
     * @summary
     * This a useful method especially if you need to send a token on each request.
     */
    response: AxiosInterceptorManager<AxiosResponse>;
  };

  /**
   * Creates an instance of HTTP.
   * @param {import("axios").AxiosRequestConfig} config
   */
  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
    this.interceptors = this.axiosInstance.interceptors;
    this.loadTokenFromLocalStorage();
  }

  /**
   * This method ensures that only one instance of HTTPClient is created.
   * If an instance already exists, it returns that instance.
   * @static
   * @param {import("axios").AxiosRequestConfig} config
   * @return {HTTPClient} - The singleton instance of HTTPClient.
   */
  public static getInstance(config: AxiosRequestConfig): HTTPClient {
    if (!HTTPClient.instance) {
      HTTPClient.instance = new HTTPClient(config);
    }
    return HTTPClient.instance;
  }

  /**
   * Load token from local storage.
   */
  private loadTokenFromLocalStorage(): void {
    const storage = localStorage.getItem("authentication");
    if (storage) {
      const {
        state: { token = "", refresh = "" },
      } = JSON.parse(storage) as AuthStorage;
      if (token) {
        this.setAuthorizationToken(token, refresh);
      }
    }
  }

  /**
   * Set Authorization header to request.
   * @param {string} token - token.
   * @param {string} refreshToken - token
   * @return void
   */
  public setAuthorizationToken(token: string, refreshToken?: string): void {
    this.axiosInstance.defaults.headers.common["Authorization"] = token;
    if (refreshToken) {
      this.axiosInstance.defaults.headers.common["x-refresh-token"] =
        refreshToken;
    }
  }

  /**
   * Clear Authorization header from request.
   * @return void
   */
  public clearAuthorizationToken(): void {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
    delete this.axiosInstance.defaults.headers.common["x-refresh-token"];
  }

  /**
   * Generic request.
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP axios response payload.
   */
  request<T = unknown, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.request(config);
  }

  /**
   * HTTP GET method.
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} HTTP `axios` response payload.
   */
  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.get<T, R>(url, config);
  }

  /**
   * HTTP POST method.
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   */
  public post<T, B, R = AxiosResponse<T>>(
    url: string,
    data: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.post<B, R>(url, data, config);
  }

  /**
   * HTTP PUT method.
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   */
  put<T, B, R = AxiosResponse<T>>(
    url: string,
    data: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.put<B, R>(url, data, config);
  }

  /**
   * HTTP DELETE method, `statusCode`: 204 No Content.
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   */
  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.delete<T, R>(url, config);
  }
}
