import api from "@/lib/api";
import { ApiResponse } from "@/features/auth/types";
import {
    CreateBusinessRequest,
    MyBusiness,
} from "./business.types";

export const businessService = {
    async createBusiness(data: CreateBusinessRequest) {
        return api.post<ApiResponse<unknown>>(
            "/business",
            data
        );
    },

    async getMyBusinesses() {
        return api.get<ApiResponse<MyBusiness[]>>(
            "/business/me"
        );
    },
};