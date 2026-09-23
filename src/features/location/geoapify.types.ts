export interface GeoapifyFeature {
    properties: {
        place_id: string;

        city?: string;

        town?: string;

        village?: string;

        municipality?: string;

        state?: string;

        country: string;

        country_code: string;

        formatted: string;

        lat: number;

        lon: number;
    };
}

export interface GeoapifyAutocompleteResponse {
    features: GeoapifyFeature[];
}