import { describe, expect, it } from "vitest";
import { CreateBusinessRequestSchema, UpdateBusinessRequestSchema, type OwnerBusiness } from "@ndrs92/contracts";
import {
    buildBusinessPricing,
    buildCreateBusinessRequest,
    buildUpdateBusinessRequest,
    getEditableBusinessLocation,
    isCompleteBusinessLocation,
    isValidBusinessName,
} from "@/features/business/business-form.helpers";
import { ownerBusinessFixture } from "@/test/fixtures/business";

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
        const { location: selectedLocation, ...businessFields } = formValues;
        const request = buildUpdateBusinessRequest(businessFields, ownerBusiness);

        expect(selectedLocation.formattedAddress).toBe("Example Str. 1");
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
        });
        expect(request).not.toHaveProperty("location");
        expect(UpdateBusinessRequestSchema.safeParse(request).success).toBe(true);
    });

    it("serializes a changed street address with its city, country, and real coordinates", () => {
        const ownerBusiness: OwnerBusiness = ownerBusinessFixture;
        const { location, ...businessFields } = formValues;
        const request = buildUpdateBusinessRequest(businessFields, ownerBusiness, {
            ...location,
            city: "Köln",
            formattedAddress: "Gotenring 16, 50679 Köln, Germany",
            latitude: 50.9348,
            longitude: 6.9762,
        });

        expect(request.location).toEqual({
            address: "Gotenring 16, 50679 Köln, Germany",
            cityId: "Köln",
            country: "Germany",
            latitude: 50.9348,
            longitude: 6.9762,
        });
        expect(UpdateBusinessRequestSchema.safeParse(request).success).toBe(true);
    });

    it("initializes legacy OwnerBusiness locations without fabricating coordinates or place IDs", () => {
        const ownerBusiness = {
            _id: "business-legacy",
            location: { cityId: "Köln", address: "Gotenring 16", country: "Germany" },
        } as OwnerBusiness;
        const location = getEditableBusinessLocation(ownerBusiness);

        expect(location).toEqual({
            city: "Köln",
            country: "Germany",
            formattedAddress: "Gotenring 16",
        });
        expect(isCompleteBusinessLocation(location)).toBe(false);
        expect(location).not.toHaveProperty("latitude");
        expect(location).not.toHaveProperty("longitude");
    });

    it("rejects an intentionally changed location that lacks coordinates", () => {
        const incomplete = {
            city: "Köln",
            country: "Germany",
            formattedAddress: "Gotenring 16, Köln",
        };

        expect(isCompleteBusinessLocation(incomplete)).toBe(false);
        expect(UpdateBusinessRequestSchema.safeParse({
            location: {
                address: incomplete.formattedAddress,
                cityId: incomplete.city,
                country: incomplete.country,
            },
        }).success).toBe(false);
    });
});
