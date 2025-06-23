export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  refreshToken?: string;
  accessToken: string;
}
