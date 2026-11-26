export interface LocationSelectionData {
    /** Geoapify place IDs are available for new selections, not persisted Businesses. */
    placeId?: string;
    city: string;
    country: string;
    countryCode?: string;
    state?: string;
    formattedAddress: string;
    latitude?: number;
    longitude?: number;
}

export interface ResolvedLocationData extends LocationSelectionData {
    latitude: number;
    longitude: number;
}

export interface LocationData extends ResolvedLocationData {
    placeId: string;
    countryCode: string;
}

export interface CountryOption {
  placeId: string;
  name: string;
  code: string;
}
