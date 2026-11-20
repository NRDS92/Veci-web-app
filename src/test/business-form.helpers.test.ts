import { describe, expect, it } from "vitest";
import { CreateBusinessRequestSchema, UpdateBusinessRequestSchema, type OwnerBusiness } from "@ndrs92/contracts";
import {
    buildBusinessPricing,
    buildCreateBusinessRequest,
    buildUpdateBusinessRequest,
    isValidBusinessName,
} from "@/features/business/business-form.helpers";

const openingHours = {
    monday: { isOpen: true, intervals: [{ open: "09:00", close: "17:00" }] },
    tuesday: { isOpen: false, intervals: [] },
    wednesday: { isOpen: false, intervals: [] },
    thursday: { isOpen: false, intervals: [] },
    friday: { isOpen: false, intervals: [] },
    saturday: { isOpen: false, intervals: [] },
    sunday: { isOpen: false, intervals: [] },
};

const formValues = {
    name: " Café Sol ",
    description: " Family café ",
    category: "food" as const,
    subCategory: "cafe" as const,
    languages: ["es", "en"],
    openingHours,
    pricing: { type: "starting_at" as const, amount: "12.50", minAmount: "", maxAmount: "", description: " Brunch " },
    profileImage: "https://cdn.example/profile.jpg",
    coverImage: "https://cdn.example/cover.jpg",
    galleryImages: ["https://cdn.example/gallery.jpg"],
    documents: [{ type: "menu" as const, url: "https://cdn.example/menu.pdf", name: "Menu" }],
    location: { placeId: "place-1", city: "berlin", country: "Germany", countryCode: "DE", formattedAddress: "Example Str. 1", latitude: 52.52, longitude: 13.405 },
    email: " hello@example.com ",
    phone: " +491234567 ",
    website: " https://example.com ",
    instagram: " cafe.sol ",
    whatsapp: " +491234567 ",
    isLatinoOwned: true,
    countryOfOrigin: " Colombia ",
    tags: ["coffee", "brunch"],
};

describe("Business create form helpers", () => {
    it("requires at least two trimmed name characters", () => {
        expect(isValidBusinessName(" Café ")).toBe(true);
        expect(isValidBusinessName(" A ")).toBe(false);
        expect(isValidBusinessName("   ")).toBe(false);
    });

    it("omits pricing when the user supplied no price details", () => {
        expect(buildBusinessPricing({
            type: "starting_at", amount: "", minAmount: "", maxAmount: "", description: " ",
        })).toBeUndefined();
    });

    it("preserves pricing units and EUR currency", () => {
        expect(buildBusinessPricing(formValues.pricing)).toEqual({
            type: "starting_at", currency: "EUR", amount: 12.5, description: "Brunch",
        });
    });

    it("builds the complete transport payload without dropping captured fields", () => {
        const request = buildCreateBusinessRequest(formValues);
        expect(request).toMatchObject({
            name: "Café Sol",
            description: "Family café",
            providerType: "business",
            category: "food",
            subCategory: "cafe",
            profile: {
                languages: ["es", "en"],
                openingHours,
                pricing: { type: "starting_at", currency: "EUR", amount: 12.5, description: "Brunch" },
            },
            images: { profile: formValues.profileImage, cover: formValues.coverImage, gallery: formValues.galleryImages },
            documents: formValues.documents,
            location: { address: "Example Str. 1", cityId: "berlin", country: "Germany", latitude: 52.52, longitude: 13.405 },
            contact: { email: "hello@example.com", phone: "+491234567", website: "https://example.com", instagram: "cafe.sol", whatsapp: "+491234567" },
            community: { isLatinoOwned: true, countryOfOrigin: "Colombia" },
            tags: ["coffee", "brunch"],
        });
    });

    it("builds a payload accepted by the shared Create Business contract", () => {
        const request = buildCreateBusinessRequest(formValues);
        expect(CreateBusinessRequestSchema.safeParse(request).success).toBe(true);
    });

    it("preserves owner profile fields hidden from the edit form in a valid update payload", () => {
        const ownerBusiness = {
            _id: "business-123",
            profile: {
                headline: "Locally owned",
                services: ["catering"],
                specialties: ["vegan"],
                languages: ["de"],
                serviceArea: ["Berlin"],
                availability: { type: "appointment", description: "Call first" },
            },
        } as OwnerBusiness;
        const request = buildUpdateBusinessRequest(buildCreateBusinessRequest(formValues), ownerBusiness);

        expect(request.profile).toMatchObject({
            headline: "Locally owned",
            services: ["catering"],
            specialties: ["vegan"],
            languages: ["es", "en"],
            serviceArea: ["Berlin"],
            availability: { type: "appointment", description: "Call first" },
        });
        expect(request).toMatchObject({
            images: { profile: formValues.profileImage, cover: formValues.coverImage, gallery: formValues.galleryImages },
            documents: formValues.documents,
            location: { address: "Example Str. 1", cityId: "berlin", latitude: 52.52, longitude: 13.405 },
        });
        expect(UpdateBusinessRequestSchema.safeParse(request).success).toBe(true);
    });
});
