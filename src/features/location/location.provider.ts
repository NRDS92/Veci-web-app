import { CountryOption, LocationData } from "./location.types";

export interface LocationProvider {
    search(query: string): Promise<LocationData[]>;
    searchCities(query: string): Promise<LocationData[]>;
    searchCountries(query: string): Promise<CountryOption[]>;
    reverseGeocode(
        latitude: number,
        longitude: number
    ): Promise<LocationData | null>;
}