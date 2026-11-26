import type {
    GeoapifyAutocompleteResponse,
    GeoapifyFeature,
} from "./geoapify.types";

import type { LocationProvider } from "./location.provider";
import type {
    CountryOption,
    LocationData,
} from "./location.types";

const GEOAPIFY_API_KEY =
    process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

const AUTOCOMPLETE_URL =
    "https://api.geoapify.com/v1/geocode/autocomplete";

const REVERSE_URL =
    "https://api.geoapify.com/v1/geocode/reverse";

export const mapFeatureToLocation = (
    feature: GeoapifyFeature
): LocationData | null => {
    const properties = feature.properties;

    // Keep Discovery's city value administrative: suburb/district/county can
    // describe a different geography and must not be substituted for a city.
    const city = [
        properties.city,
        properties.town,
        properties.village,
        properties.municipality,
    ].find((value) => typeof value === "string" && value.trim())?.trim();
    const country = properties.country?.trim();
    const countryCode = properties.country_code?.trim().toUpperCase();
    const formattedAddress = properties.formatted?.trim();
    const latitude = properties.lat;
    const longitude = properties.lon;
    const placeId = properties.place_id?.trim();

    if (
        !city ||
        !country ||
        !countryCode ||
        !formattedAddress ||
        !placeId ||
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
    ) {
        return null;
    }

    return {
        placeId,
        city,
        country,
        countryCode,
        state: properties.state?.trim() || undefined,
        formattedAddress,
        latitude,
        longitude,
    };
};

const mapFeaturesToLocations = (
    features: GeoapifyFeature[]
): LocationData[] =>
    features
        .map(mapFeatureToLocation)
        .filter(
            (location): location is LocationData =>
                location !== null
        );

const fetchAutocompleteFeatures = async (
    query: string,
    type?: "city" | "country"
): Promise<GeoapifyFeature[]> => {
    if (!GEOAPIFY_API_KEY) {
        throw new Error("Geoapify API key is not configured.");
    }

    const params = new URLSearchParams({
        text: query,
        format: "geojson",
        limit: "6",
        apiKey: GEOAPIFY_API_KEY,
    });

    if (type) {
        params.set("type", type);
    }

    const response = await fetch(
        `${AUTOCOMPLETE_URL}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Geoapify location search failed.");
    }

    const data =
        (await response.json()) as GeoapifyAutocompleteResponse;

    return data.features;
};

export const geoapifyProvider: LocationProvider = {
    async search(query: string): Promise<LocationData[]> {
        const features =
            await fetchAutocompleteFeatures(query);

        return mapFeaturesToLocations(features);
    },

    async searchCities(query: string): Promise<LocationData[]> {
        const features =
            await fetchAutocompleteFeatures(query, "city");

        return mapFeaturesToLocations(features);
    },

    async searchCountries(query: string): Promise<CountryOption[]> {
        const features =
            await fetchAutocompleteFeatures(query, "country");

        return features.flatMap((feature) => {
            const placeId = feature.properties.place_id?.trim();
            const name = feature.properties.country?.trim();
            const code = feature.properties.country_code?.trim().toUpperCase();
            return placeId && name && code ? [{ placeId, name, code }] : [];
        });
    },

    async reverseGeocode(
        latitude: number,
        longitude: number
    ): Promise<LocationData | null> {
        if (!GEOAPIFY_API_KEY) {
            throw new Error("Geoapify API key is not configured.");
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
            throw new Error("Geoapify reverse geocoding failed.");
        }

        const data =
            (await response.json()) as GeoapifyAutocompleteResponse;

        const firstFeature = data.features[0];

        if (!firstFeature) {
            return null;
        }

        return mapFeatureToLocation(firstFeature);
    },
};
