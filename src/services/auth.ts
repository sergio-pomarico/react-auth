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

class AuthService extends HTTPClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const result = await this.post<LoginResponse, LoginPayload>(
      "/auth/login",
      payload
    );
    return result.data;
  };
  setupMfa = async (): Promise<MfaSetupResponse> => {
    const result = await this.post<MfaSetupResponse, unknown>("/mfa/setup", {});
    return result.data;
  };
}

const authServices = new AuthService(_config);

export default authServices;
