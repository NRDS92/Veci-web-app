import api from "@/lib/api";

import {
    DiscoverQuery,
    DiscoverData,
} from "./discover.types";

import { ApiResponse } from "@/features/auth/types";

export const discoverService = {

    async getDiscoverFeed(
        params: DiscoverQuery = {}
    ) {
        return api.get<ApiResponse<DiscoverData>>(
            "/discover",
            {
                params,
            }
        );
    },

};