import api from "@/lib/api";

import type {
    AuthUser,
    ApiResponse,
} from "../../features/auth/types";

import type {
    EventCardEvent,
} from "@/features/discover/discover.types";

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

    // ============================================================
    // FAVORITES
    // ============================================================

    getFavorites() {
        return api.get<ApiResponse<EventCardEvent[]>>(
            "/users/favorites"
        );
    },

    toggleFavorite(eventId: string) {
        return api.post<ApiResponse<string[]>>(
            `/users/favorites/${eventId}`
        );
    },
};