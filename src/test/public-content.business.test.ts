import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    getPublicBusinesses,
    getPublicBusinessBySlug,
    getPublicBusinessContentBySlug,
} from "@/lib/api/public-content";
import { publicBusinessFixture } from "./fixtures/business";

const fetchMock = vi.fn();

const jsonResponse = (body: unknown) => ({
    ok: true,
    status: 200,
    json: async () => body,
});

const detailEnvelope = (entity: unknown) => ({
    success: true,
    data: {
        publication: {
            _id: "publication-123",
            entityType: "business",
            entityId: "business-123",
            status: "published",
            slug: "cafe-sol",
        },
        entity,
    },
});

describe("public Business API parsing", () => {
    beforeEach(() => {
        fetchMock.mockReset();
        vi.stubGlobal("fetch", fetchMock);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("validates each entry in the public business list", async () => {
        fetchMock.mockResolvedValue(jsonResponse({
            success: true,
            data: [publicBusinessFixture],
        }));

        await expect(getPublicBusinesses()).resolves.toEqual([publicBusinessFixture]);
    });

    it("rejects the list when a business does not satisfy PublicBusiness", async () => {
        fetchMock.mockResolvedValue(jsonResponse({
            success: true,
            data: [{ ...publicBusinessFixture, category: "invalid-category" }],
        }));

        await expect(getPublicBusinesses()).rejects.toThrow();
    });

    it("validates the entity in both public detail adapters", async () => {
        fetchMock.mockResolvedValue(jsonResponse(detailEnvelope(publicBusinessFixture)));

        await expect(getPublicBusinessBySlug("cafe-sol")).resolves.toEqual(publicBusinessFixture);

        fetchMock.mockResolvedValue(jsonResponse(detailEnvelope(publicBusinessFixture)));
        await expect(getPublicBusinessContentBySlug("cafe-sol")).resolves.toMatchObject({
            entity: publicBusinessFixture,
        });
    });

    it("rejects invalid PublicBusiness detail data", async () => {
        fetchMock.mockResolvedValue(jsonResponse(
            detailEnvelope({ ...publicBusinessFixture, id: undefined }),
        ));

        await expect(getPublicBusinessContentBySlug("cafe-sol")).rejects.toThrow();
    });
});
