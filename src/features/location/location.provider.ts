import { LocationData } from "./location.types";

export interface LocationProvider {
    search(query: string): Promise<LocationData[]>;

    reverseGeocode(
        latitude: number,
        longitude: number
    ): Promise<LocationData | null>;
}