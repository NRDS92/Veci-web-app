import { geoapifyProvider } from "./geoapify.provider";

export const locationService = {
    search(query: string) {
        return geoapifyProvider.search(query);
    },

    searchCities(query: string) {
        return geoapifyProvider.searchCities(query);
    },

    searchCountries(query: string) {
        return geoapifyProvider.searchCountries(query);
    },

    reverseGeocode(latitude: number, longitude: number) {
        return geoapifyProvider.reverseGeocode(latitude, longitude);
    },
};