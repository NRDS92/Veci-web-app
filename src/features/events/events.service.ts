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

    uploadEventAttachment: async (
        eventId: string,
        file: File
    ) => {
        const formData = new FormData();

        formData.append("attachment", file);

        return api.post(
            `/events/${eventId}/attachment`,
            formData
        );
    },

    async getMyEvents() {
        return api.get<ApiResponse<Event[]>>(
            "/events/me"
        );
    },
};