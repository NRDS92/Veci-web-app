
import api from "@/lib/api";

import type {
    FavoriteEvent,
    MyBusiness,
    MyEvent,
} from "./account.types";

export const accountService = {
    async getMyFavorites(): Promise<FavoriteEvent[]> {
        const response = await api.get("/users/favorites");
        return response.data.data;
    },

    async getMyEvents(): Promise<MyEvent[]> {
        const response = await api.get("/events/me");
        return response.data.data;
    },

    async getMyBusinesses(): Promise<MyBusiness[]> {
        const response = await api.get("/business/me");
        return response.data.data;
    },
};


