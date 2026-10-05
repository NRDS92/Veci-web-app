import api from "@/lib/api";

import { ApiResponse } from "@/features/auth/types";

import {
    Business,
    CreateBusinessRequest,
    MyBusiness,
} from "./business.types";


export const businessService = {

    // ==================================================
    // CREATE BUSINESS
    // ==================================================

    async createBusiness(
        data: CreateBusinessRequest
    ) {
        return api.post<ApiResponse<Business>>(
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
        return api.get<ApiResponse<Business>>(
            `/business/${id}`
        );
    },
};