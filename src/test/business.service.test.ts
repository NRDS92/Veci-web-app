import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api", () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        delete: vi.fn(),
        put: vi.fn(),
    },
}));

import api from "@/lib/api";
import { businessService } from "@/features/business/business.service";

describe("businessService.updateBusiness", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("sends the parsed update payload with PUT to the business endpoint", async () => {
        vi.mocked(api.put).mockResolvedValue({} as never);

        await businessService.updateBusiness("business-123", {
            profile: { languages: ["es"] },
        });

        expect(api.put).toHaveBeenCalledWith("/business/business-123", {
            profile: {
                services: [],
                specialties: [],
                languages: ["es"],
                serviceArea: [],
            },
        });
    });

    it("rejects an empty update without making an HTTP request", async () => {
        await expect(
            businessService.updateBusiness("business-123", {})
        ).rejects.toThrow();

        expect(api.put).not.toHaveBeenCalled();
    });

    it("rejects invalid update data without making an HTTP request", async () => {
        await expect(
            businessService.updateBusiness("business-123", { name: "x" })
        ).rejects.toThrow();

        expect(api.put).not.toHaveBeenCalled();
    });
});

describe("businessService engagement API", () => {
    beforeEach(() => vi.clearAllMocks());

    it("loads and validates follow status, and sends follow/unfollow requests", async () => {
        const status = { success: true, data: { businessId: "business-123", isFollowing: true } };
        vi.mocked(api.get).mockResolvedValue({ data: status } as never);
        vi.mocked(api.post).mockResolvedValue({ data: status } as never);
        vi.mocked(api.delete).mockResolvedValue({ data: { ...status, data: { ...status.data, isFollowing: false } } } as never);

        await expect(businessService.getBusinessFollowStatus("business-123")).resolves.toEqual(status.data);
        await expect(businessService.followBusiness("business-123")).resolves.toEqual(status.data);
        await expect(businessService.unfollowBusiness("business-123")).resolves.toEqual({ businessId: "business-123", isFollowing: false });

        expect(api.get).toHaveBeenCalledWith("/business/business-123/follow-status");
        expect(api.post).toHaveBeenCalledWith("/business/business-123/follow");
        expect(api.delete).toHaveBeenCalledWith("/business/business-123/follow");
    });

    it("validates behavior payloads and posts the real menu URL", async () => {
        vi.mocked(api.post).mockResolvedValue({ data: { success: true } } as never);

        await businessService.trackBusinessBehavior("business-123", {
            event: "menu_download",
            documentUrl: "https://cdn.example/menu.pdf",
        });
        expect(api.post).toHaveBeenCalledWith("/business/business-123/behavior", {
            event: "menu_download",
            documentUrl: "https://cdn.example/menu.pdf",
        });

        vi.mocked(api.post).mockClear();
        await expect(businessService.trackBusinessBehavior("business-123", {
            event: "menu_download",
        } as never)).rejects.toThrow();
        expect(api.post).not.toHaveBeenCalled();
    });

    it("loads and validates owner stats", async () => {
        const stats = {
            businessId: "business-123",
            followersCount: 7,
            eventsCount: 3,
            businessViews: 41,
            menuDownloadAttempts: 5,
            periodDays: 90,
        };
        vi.mocked(api.get).mockResolvedValue({ data: { success: true, data: stats } } as never);

        await expect(businessService.getOwnerBusinessStats("business-123")).resolves.toEqual(stats);
        expect(api.get).toHaveBeenCalledWith("/business/business-123/stats");
    });
});
