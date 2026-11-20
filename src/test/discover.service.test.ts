import { beforeEach, describe, expect, it, vi } from "vitest";
import { publicBusinessFixture } from "./fixtures/business";

vi.mock("@/lib/api", () => ({
    default: { get: vi.fn() },
}));

import api from "@/lib/api";
import { discoverService } from "@/features/discover/discover.service";

describe("discoverService Business contract validation", () => {
    beforeEach(() => vi.clearAllMocks());

    it("parses Business feed entries and leaves Event entries unchanged", async () => {
        const event = { _id: "event-1", type: "event", title: "Community night" };
        vi.mocked(api.get).mockResolvedValue({
            data: {
                success: true,
                data: {
                    recommended: [
                        { ...publicBusinessFixture, type: "business" },
                        event,
                    ],
                    page: 1,
                    hasMore: false,
                },
            },
        } as never);

        const response = await discoverService.getDiscoverFeed({ type: "business", limit: 6 });

        expect(api.get).toHaveBeenCalledWith("/discover", { params: { type: "business", limit: 6 } });
        expect(response.data.data.recommended).toEqual([
            { ...publicBusinessFixture, type: "business" },
            event,
        ]);
    });

    it("fails the discovery response when a Business entry violates PublicBusiness", async () => {
        vi.mocked(api.get).mockResolvedValue({
            data: {
                success: true,
                data: {
                    recommended: [{ ...publicBusinessFixture, type: "business", rating: undefined }],
                    page: 1,
                    hasMore: false,
                },
            },
        } as never);

        await expect(discoverService.getDiscoverFeed({ type: "business" })).rejects.toThrow();
    });
});
