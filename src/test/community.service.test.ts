import { beforeEach, describe, expect, it, vi } from "vitest";

const apiMock = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock("@/lib/api", () => ({ default: apiMock }));

import { CreateCommunityRequestSchema } from "@ndrs92/contracts";
import api from "@/lib/api";
import { communityService } from "@/features/communities/community.service";

const ownerCommunity = {
    id: "community-123",
    slug: "berlin-latinos",
    name: "Berlin Latinos",
    description: "A local community",
    interests: ["culture"],
    cityId: "Berlin",
    country: "Germany",
    images: {
        profile: "https://cdn.example/profile.png",
        cover: "https://cdn.example/cover.png",
        gallery: ["https://cdn.example/gallery.png"],
    },
    contact: {
        website: "https://example.com",
        instagram: "@berlinlatinos",
        whatsapp: "+49123456789",
        email: "hello@example.com",
    },
    memberCount: 1,
    createdAt: "2026-11-24T12:00:00.000Z",
    ownerId: "owner-1",
    membershipPolicy: "approval" as const,
    moderationStatus: "pending" as const,
    status: "active" as const,
    updatedAt: "2026-11-24T12:00:00.000Z",
};

describe("communityService.createCommunity", () => {
    beforeEach(() => vi.clearAllMocks());

    it("validates the request, posts to the authenticated Community endpoint and parses OwnerCommunity", async () => {
        vi.mocked(api.post).mockResolvedValue({
            status: 201,
            data: { success: true, data: ownerCommunity },
        } as never);
        const input = {
            name: "  Berlin Latinos  ",
            cityId: "Berlin",
            country: "Germany",
            membershipPolicy: "approval" as const,
        };

        const created = await communityService.createCommunity(input);

        expect(api.post).toHaveBeenCalledOnce();
        expect(api.post).toHaveBeenCalledWith("/communities", CreateCommunityRequestSchema.parse(input));
        expect(created).toEqual(ownerCommunity);
        expect(created.moderationStatus).toBe("pending");
    });

    it("rejects invalid requests without making an HTTP request", async () => {
        await expect(communityService.createCommunity({
            name: "x",
            cityId: "",
            country: "Germany",
            membershipPolicy: "approval",
        })).rejects.toThrow();

        expect(api.post).not.toHaveBeenCalled();
    });

    it("rejects an invalid OwnerCommunity response", async () => {
        vi.mocked(api.post).mockResolvedValue({
            status: 201,
            data: { success: true, data: { ...ownerCommunity, moderationStatus: "unknown" } },
        } as never);

        await expect(communityService.createCommunity({
            name: "Berlin Latinos",
            cityId: "Berlin",
            country: "Germany",
            membershipPolicy: "approval",
        })).rejects.toThrow();
    });
});
