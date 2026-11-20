import api from "@/lib/api";
import {
    BusinessFollowStatusResponseSchema,
    OwnerBusinessStatsResponseSchema,
    TrackBusinessBehaviorRequestSchema,
    UpdateBusinessRequestSchema,
    type CreateBusinessRequest,
    type OwnerBusinessResponse,
    type TrackBusinessBehaviorRequest,
    type UpdateBusinessRequest,
} from "@ndrs92/contracts";

import { ApiResponse } from "@/features/auth/types";

import {
    MyBusiness,
} from "./business.types";


export const businessService = {

    // ==================================================
    // CREATE BUSINESS
    // ==================================================

    async createBusiness(
        data: CreateBusinessRequest
    ) {
        return api.post<OwnerBusinessResponse>(
            "/business",
            data
        );
    },


    // ==================================================
    // GET MY BUSINESSES
    // ==================================================

    async getMyBusinesses() {
        return api.get<ApiResponse<MyBusiness[]>>(
            "/business/me"
        );
    },


    // ==================================================
    // GET BUSINESS BY ID
    // ==================================================

    async getBusinessById(
        id: string
    ) {
        return api.get<OwnerBusinessResponse>(
            `/business/${id}`
        );
    },

    async updateBusiness(
        id: string,
        payload: UpdateBusinessRequest
    ) {
        const validatedPayload = UpdateBusinessRequestSchema.parse(payload);

        return api.put<OwnerBusinessResponse>(
            `/business/${id}`,
            validatedPayload
        );
    },

    async getBusinessFollowStatus(id: string) {
        const response = await api.get(`/business/${id}/follow-status`);
        return BusinessFollowStatusResponseSchema.parse(response.data).data;
    },

    async followBusiness(id: string) {
        const response = await api.post(`/business/${id}/follow`);
        return BusinessFollowStatusResponseSchema.parse(response.data).data;
    },

    async unfollowBusiness(id: string) {
        const response = await api.delete(`/business/${id}/follow`);
        return BusinessFollowStatusResponseSchema.parse(response.data).data;
    },

    async trackBusinessBehavior(id: string, payload: TrackBusinessBehaviorRequest) {
        const validatedPayload = TrackBusinessBehaviorRequestSchema.parse(payload);
        return api.post(`/business/${id}/behavior`, validatedPayload);
    },

    async getOwnerBusinessStats(id: string) {
        const response = await api.get(`/business/${id}/stats`);
        return OwnerBusinessStatsResponseSchema.parse(response.data).data;
    },
};
