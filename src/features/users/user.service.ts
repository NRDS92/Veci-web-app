import api from "@/lib/api";

import type {
  AuthUser,
  ApiResponse,
} from "../../features/auth/types";

export interface UpdateUserRequest {
  name: string;
  cityId: string;
  originCountry: string;
  bio: string;
}

export const userService = {
  getMe() {
    return api.get<ApiResponse<AuthUser>>(
      "/users/me"
    );
  },

  updateMe(data: UpdateUserRequest) {
    return api.post<ApiResponse<AuthUser>>(
      "/users/me",
      data
    );
  },

  uploadProfileImage(file: File) {
    const formData = new FormData();

    formData.append("image", file);

    return api.post<ApiResponse<AuthUser>>(
      "/users/upload-profile-image",
      formData
    );
  },
};