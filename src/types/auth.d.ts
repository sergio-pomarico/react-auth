export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  credentials: {
    mfaEnabled: boolean;
    refreshToken?: string;
    accessToken: string;
  };
}

interface ErrorResponse {
  statusCode: string;
  status?: string;
  error: {
    message: string;
    code: string;
    description: string;
  };
}
