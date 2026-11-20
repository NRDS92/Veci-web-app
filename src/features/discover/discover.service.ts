import api from "@/lib/api";
import { PublicBusinessSchema } from "@ndrs92/contracts";

import {
    DiscoverQuery,
    DiscoverData,
} from "./discover.types";

import { ApiResponse } from "@/features/auth/types";

export const discoverService = {

    async getDiscoverFeed(
        params: DiscoverQuery = {}
    ) {
        const response = await api.get<ApiResponse<DiscoverData>>(
            "/discover",
            {
                params,
            }
        );

        if (!response.data.success) return response;

        return {
            ...response,
            data: {
                ...response.data,
                data: {
                    ...response.data.data,
                    recommended: response.data.data.recommended.map((item) => {
                        if (item.type !== "business") return item;
                        const { type, ...business } = item;
                        return {
                            ...PublicBusinessSchema.parse(business),
                            type,
                        };
                    }),
                },
            },
        };
    },

};
