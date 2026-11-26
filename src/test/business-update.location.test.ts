import { beforeEach, describe, expect, it, vi } from "vitest";
import { UpdateBusinessRequestSchema } from "@ndrs92/contracts";

vi.mock("@/lib/api", () => ({
    default: { put: vi.fn(), get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

import api from "@/lib/api";
import { buildUpdateBusinessRequest } from "@/features/business/business-form.helpers";
import { businessService } from "@/features/business/business.service";
import { ownerBusinessFixture } from "@/test/fixtures/business";

const fields = {
    name: "Café Sol",
    description: "Updated description",
    category: "food" as const,
    subCategory: "cafe" as const,
    languages: ["es"],
    openingHours: {
        monday: { isOpen: false, intervals: [] },
        tuesday: { isOpen: false, intervals: [] },
        wednesday: { isOpen: false, intervals: [] },
        thursday: { isOpen: false, intervals: [] },
        friday: { isOpen: false, intervals: [] },
        saturday: { isOpen: false, intervals: [] },
        sunday: { isOpen: false, intervals: [] },
    },
    pricing: { type: "starting_at" as const, amount: "", minAmount: "", maxAmount: "", description: "" },
    profileImage: "https://cdn.example/profile.jpg",
    coverImage: "",
    galleryImages: [],
    documents: [],
    email: "",
    phone: "",
    website: "",
    instagram: "",
    whatsapp: "",
    isLatinoOwned: true,
    countryOfOrigin: "",
    tags: [],
};

const ownerBusiness = ownerBusinessFixture;

describe("Business update location wire serialization", () => {
    beforeEach(() => vi.clearAllMocks());

    it("omits unchanged persisted location when updating other fields", async () => {
        vi.mocked(api.put).mockResolvedValue({} as never);
        const payload = buildUpdateBusinessRequest(fields, ownerBusiness);

        await businessService.updateBusiness("business-123", UpdateBusinessRequestSchema.parse(payload));

        expect(api.put).toHaveBeenCalledWith("/business/business-123", expect.not.objectContaining({ location: expect.anything() }));
        const sentPayload = vi.mocked(api.put).mock.calls[0]?.[1];
        expect(sentPayload).toMatchObject({ name: "Café Sol", description: "Updated description" });
        expect(sentPayload).not.toHaveProperty("location");
    });

    it("sends a complete flat contract location when the user selects a new street address", async () => {
        vi.mocked(api.put).mockResolvedValue({} as never);
        const payload = buildUpdateBusinessRequest(fields, ownerBusiness, {
            placeId: "geo-place-1",
            city: "Köln",
            country: "Germany",
            countryCode: "DE",
            formattedAddress: "Gotenring 16, 50679 Köln, Germany",
            latitude: 50.9348,
            longitude: 6.9762,
        });

        await businessService.updateBusiness("business-123", UpdateBusinessRequestSchema.parse(payload));

        expect(api.put).toHaveBeenCalledWith("/business/business-123", expect.objectContaining({
            location: {
                address: "Gotenring 16, 50679 Köln, Germany",
                cityId: "Köln",
                country: "Germany",
                latitude: 50.9348,
                longitude: 6.9762,
            },
        }));
    });
});
