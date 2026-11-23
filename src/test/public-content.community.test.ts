import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPublicCommunities, getPublicCommunityContentBySlug, getPublicCommunityEvents } from "@/lib/api/public-content";

const fetchMock = vi.fn();
const community = {
    id: "community-1", slug: "berlin-latinos", name: "Berlin Latinos", description: "A local group",
    interests: ["culture"], cityId: "berlin", country: "Germany", images: { gallery: [] }, contact: {},
    memberCount: 12, createdAt: "2026-01-01T00:00:00.000Z",
};
const response = (data: unknown) => ({ ok: true, status: 200, json: async () => data });

describe("public Community API parsing", () => {
    beforeEach(() => {
        fetchMock.mockReset();
        vi.stubGlobal("fetch", fetchMock);
    });
    afterEach(() => vi.unstubAllGlobals());

    it("validates the public Community discovery payload", async () => {
        fetchMock.mockResolvedValue(response({ success: true, data: { items: [community] } }));
        await expect(getPublicCommunities()).resolves.toEqual([community]);
    });

    it("rejects invalid Community records instead of silently omitting them", async () => {
        fetchMock.mockResolvedValue(response({ success: true, data: { items: [{ ...community, memberCount: -1 }] } }));
        await expect(getPublicCommunities()).rejects.toThrow();
    });

    it("validates the public Community entity from the content resolver", async () => {
        fetchMock.mockResolvedValue(response({ success: true, data: {
            publication: { _id: "pub-1", entityType: "community", entityId: community.id, status: "published", slug: community.slug },
            entity: community,
        } }));
        await expect(getPublicCommunityContentBySlug(community.slug)).resolves.toMatchObject({ entity: community });
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining(`/public/content/${community.slug}`), expect.any(Object));
    });

    it("validates the public Community Event DTOs from the related events endpoint", async () => {
        fetchMock.mockResolvedValue(response({ success: true, data: [{
            id: "event-1", slug: "community-dinner", title: "Community dinner", category: "food",
            eventType: "community", cityId: "berlin", address: "Town Hall", dateStart: "2027-06-01T18:00:00.000Z",
            images: [], links: [], goodToKnow: [],
            organizer: { type: "community", id: community.id, slug: community.slug, name: community.name },
        }] }));
        await expect(getPublicCommunityEvents(community.id)).resolves.toHaveLength(1);
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining(`/public/communities/${community.id}/events`), expect.any(Object));
    });
});
