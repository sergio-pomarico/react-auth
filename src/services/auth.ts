import type { AxiosRequestConfig } from "axios";
import { HTTPClient } from "../shared/axios/axios";
import { buidConfig } from "../shared/axios/config";
import type {
  LoginPayload,
  LoginResponse,
  MfaSetupResponse,
} from "@/types/auth";

const API_URL = "http://localhost:3000";

const _config = buidConfig(API_URL);

class AuthService {
  http: HTTPClient;
  constructor(config: AxiosRequestConfig) {
    this.http = HTTPClient.getInstance(config);
  }

  login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const result = await this.http.post<LoginResponse, LoginPayload>(
      "/auth/login",
      payload
    );
    const {
      credentials: { accessToken },
    } = result.data;
    this.http.setAuthorizationToken(accessToken);
    return result.data;
  };
  setupMfa = async (): Promise<MfaSetupResponse> => {
    const result = await this.http.post<MfaSetupResponse, unknown>(
      "/mfa/setup",
      {}
    );
    return result.data;
  };
  mfaVerify = async (token: string): Promise<LoginResponse> => {
    const result = await this.http.post<LoginResponse, { token: string }>(
      "/mfa/verify",
      { token }
    );
    const {
      credentials: { accessToken },
    } = result.data;
    this.http.setAuthorizationToken(accessToken);
    return result.data;
  };
  resetMfa = async (): Promise<{ status: string; message: string }> => {
    const result = await this.http.post<
      { status: string; message: string },
      unknown
    >("/mfa/reset", {});
    return result.data;
  };
  getUserInfo = async (): Promise<unknown> => {
    const result = await this.http.get<{ status: string; message: string }>(
      "/auth/me",
      {}
    );
    return result.data;
  };
}

const authServices = new AuthService(_config);

export default authServices;
