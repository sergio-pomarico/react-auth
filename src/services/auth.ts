import type { AxiosRequestConfig } from "axios";
import { HTTPClient } from "../shared/axios/axios";
import { buidConfig } from "../shared/axios/config";
import type {
  LoginPayload,
  LoginResponse,
  MfaSetupResponse,
} from "@/types/auth";
import type { RestorePayload } from "@/pages/ForgotPassword/schemas/restore-password";

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
  logout = async (): Promise<{ status: string; message: string }> => {
    const result = await this.http.post<
      { status: string; message: string },
      unknown
    >("/auth/logout", {});
    this.http.clearAuthorizationToken();
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
  getUserInfo = async (): Promise<{ status: string; user: User }> => {
    const result = await this.http.get<{ status: string; user: User }>(
      "/auth/me",
      {}
    );
    return result.data;
  };
  refreshToken = async (): Promise<{ status: string; accessToken: string }> => {
    const result = await this.http.post<
      { status: string; accessToken: string },
      unknown
    >("/auth/refresh", {});
    return result.data;
  };
  forgotPassword = async (
    email: string
  ): Promise<{ status: string; email: string }> => {
    const result = await this.http.post<
      { status: string; email: string },
      {
        email: string;
      }
    >("/user/forgot-password", { email });
    return result.data;
  };
  restorePassword = async (
    value: RestorePayload,
    userId: string
  ): Promise<{ status: string; message: string }> => {
    const result = await this.http.post<
      { status: string; message: string },
      RestorePayload
    >(`/user/reset-password/${userId}/${value.code}`, value);
    return result.data;
  };
}

const authServices = new AuthService(_config);

export default authServices;
