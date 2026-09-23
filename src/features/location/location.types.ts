export interface LocationData {
    placeId: string;
    city: string;
    country: string;
    countryCode: string;
    state?: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
}