import api from "@/lib/api";
import { ApiResponse } from "@/features/auth/types";
import {
    CreateEventRequest,
    Event,
} from "./events.types";

export const eventsService = {
    async createEvent(data: CreateEventRequest) {
        return api.post<ApiResponse<Event>>(
            "/events",
            data
        );
    },

    async getMyEvents() {
        return api.get<ApiResponse<Event[]>>(
            "/events/me"
        );
    },
};