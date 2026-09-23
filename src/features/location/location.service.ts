import {
    geoapifyProvider,
} from "./geoapify.provider";

export const locationService = {
    search(query: string) {
        return geoapifyProvider.search(query);
    },

    reverseGeocode(
        latitude: number,
        longitude: number
    ) {
        return geoapifyProvider.reverseGeocode(
            latitude,
            longitude
        );
    },
};