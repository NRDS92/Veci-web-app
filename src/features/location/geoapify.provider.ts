import {
    GeoapifyAutocompleteResponse,
    GeoapifyFeature,
} from "./geoapify.types";

import {
    LocationProvider,
} from "./location.provider";

import {
    LocationData,
} from "./location.types";

const GEOAPIFY_API_KEY =
    process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

const AUTOCOMPLETE_URL =
    "https://api.geoapify.com/v1/geocode/autocomplete";

const REVERSE_URL =
    "https://api.geoapify.com/v1/geocode/reverse";

const mapFeatureToLocation = (
    feature: GeoapifyFeature
): LocationData | null => {
    const properties = feature.properties;

    const city =
        properties.city ??
        properties.town ??
        properties.village ??
        properties.municipality;

    if (!city) {
        return null;
    }

    return {
        placeId: properties.place_id,
        city,
        country: properties.country,
        countryCode:
            properties.country_code.toUpperCase(),
        state: properties.state,
        formattedAddress:
            properties.formatted,
        latitude: properties.lat,
        longitude: properties.lon,
    };
};

export const geoapifyProvider: LocationProvider = {
    async search(
        query: string
    ): Promise<LocationData[]> {
        if (!GEOAPIFY_API_KEY) {
            throw new Error(
                "Geoapify API key is not configured."
            );
        }

        const params = new URLSearchParams({
            text: query,
            format: "geojson",
            limit: "6",
            apiKey: GEOAPIFY_API_KEY,
        });

        const response = await fetch(
            `${AUTOCOMPLETE_URL}?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(
                "Geoapify location search failed."
            );
        }

        const data =
            (await response.json()) as GeoapifyAutocompleteResponse;

        return data.features
            .map(mapFeatureToLocation)
            .filter(
                (
                    location
                ): location is LocationData =>
                    location !== null
            );
    },

    async reverseGeocode(
        latitude: number,
        longitude: number
    ): Promise<LocationData | null> {
        if (!GEOAPIFY_API_KEY) {
            throw new Error(
                "Geoapify API key is not configured."
            );
        }

        const params = new URLSearchParams({
            lat: String(latitude),
            lon: String(longitude),
            format: "geojson",
            apiKey: GEOAPIFY_API_KEY,
        });

        const response = await fetch(
            `${REVERSE_URL}?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(
                "Geoapify reverse geocoding failed."
            );
        }

        const data =
            (await response.json()) as GeoapifyAutocompleteResponse;

        const firstFeature =
            data.features[0];

        if (!firstFeature) {
            return null;
        }

        return mapFeatureToLocation(
            firstFeature
        );
    },
};