import api from "@/lib/api";
import type { ChangePasswordRequest } from "@ndrs92/contracts";

import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  LoginResponse,
  ApiResponse,
  AuthUser,
} from "../../features/auth/types";

export const authService = {
  login(data: LoginRequest) {
    return api.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      data
    );
  },

  getMe() {
    return api.get<ApiResponse<AuthUser>>(
      "/auth/me"
    );
  },

  register(data: RegisterRequest) {
    return api.post(
      "/auth/register",
      data
    );
  },

  forgotPassword(
    data: ForgotPasswordRequest
  ) {
    return api.post(
      "/auth/forgot-password",
      data
    );
  },
  googleLogin: async (idToken: string) => {
    return api.post("/auth/google", { idToken });
  },

  resetPassword(
    data: ResetPasswordRequest
  ) {
    return api.post(
      "/auth/reset-password",
      data
    );
  },

  changePassword(data: ChangePasswordRequest) {
    return api.patch<ApiResponse<{ token: string }>>(
      "/auth/change-password",
      data
    );
  },
};
