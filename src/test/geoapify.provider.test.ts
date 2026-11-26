import { describe, expect, it } from "vitest";
import type { GeoapifyFeature } from "@/features/location/geoapify.types";
import { mapFeatureToLocation } from "@/features/location/geoapify.provider";

const feature = (properties: Partial<GeoapifyFeature["properties"]>): GeoapifyFeature => ({
    properties: {
        place_id: "geo-place-1",
        city: "Köln",
        country: "Germany",
        country_code: "de",
        formatted: "Gotenring 16, 50679 Köln, Germany",
        lat: 50.9348,
        lon: 6.9762,
        ...properties,
    },
});

describe("Geoapify Business location mapping", () => {
    it("preserves a street-level result, correct city, and coordinates", () => {
        expect(mapFeatureToLocation(feature({}))).toEqual({
            placeId: "geo-place-1",
            city: "Köln",
            country: "Germany",
            countryCode: "DE",
            state: undefined,
            formattedAddress: "Gotenring 16, 50679 Köln, Germany",
            latitude: 50.9348,
            longitude: 6.9762,
        });
    });

    it("preserves a second street-level result without collapsing it to a city", () => {
        const mapped = mapFeatureToLocation(feature({
            place_id: "geo-place-2",
            city: "München",
            formatted: "Marienplatz 1, 80331 München, Germany",
            lat: 48.1372,
            lon: 11.5756,
        }));

        expect(mapped).toMatchObject({
            city: "München",
            formattedAddress: "Marienplatz 1, 80331 München, Germany",
            latitude: 48.1372,
            longitude: 11.5756,
        });
    });

    it("uses a supplied administrative municipality when city is absent", () => {
        expect(mapFeatureToLocation(feature({ city: undefined, municipality: "Köln" })))
            .toMatchObject({ city: "Köln" });
    });

    it.each([
        { town: "Cologne" },
        { village: "Altstadt" },
    ])("supports Geoapify locality variant $", (locality) => {
        const mapped = mapFeatureToLocation(feature({ city: undefined, ...locality }));
        expect(mapped?.city).toBe(Object.values(locality)[0]);
    });

    it("does not mislabel a suburb, district, or county as a city", () => {
        expect(mapFeatureToLocation(feature({
            city: undefined,
            suburb: "Deutz",
            district: "Innenstadt",
            county: "Köln",
        }))).toBeNull();
    });

    it("rejects incomplete geocoding results rather than fabricating required values", () => {
        expect(mapFeatureToLocation(feature({ city: undefined, municipality: undefined }))).toBeNull();
        expect(mapFeatureToLocation(feature({ lat: undefined }))).toBeNull();
        expect(mapFeatureToLocation(feature({ country_code: undefined }))).toBeNull();
    });

    it("maps city-only results through the same canonical shape", () => {
        expect(mapFeatureToLocation(feature({
            formatted: "Cologne, Germany",
            city: "Cologne",
            lat: 50.9375,
            lon: 6.9603,
        }))).toMatchObject({
            city: "Cologne",
            formattedAddress: "Cologne, Germany",
            latitude: 50.9375,
            longitude: 6.9603,
        });
    });
});
