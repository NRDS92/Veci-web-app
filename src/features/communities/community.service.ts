import {
    CreateCommunityRequestSchema,
    OwnerCommunitySchema,
    type CreateCommunityRequest,
    type OwnerCommunity,
} from "@ndrs92/contracts";

import api from "@/lib/api";

export const communityService = {
    async createCommunity(input: CreateCommunityRequest): Promise<OwnerCommunity> {
        const payload = CreateCommunityRequestSchema.parse(input);
        const response = await api.post<unknown>("/communities", payload);

        if (response.status !== 201) {
            throw new Error("The Community API did not return a creation response.");
        }

        if (
            !response.data ||
            typeof response.data !== "object" ||
            !("success" in response.data) ||
            response.data.success !== true ||
            !("data" in response.data)
        ) {
            throw new Error("The Community API returned an invalid response envelope.");
        }

        return OwnerCommunitySchema.parse(response.data.data);
    },
};
