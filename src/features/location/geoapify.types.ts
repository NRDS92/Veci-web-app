export interface GeoapifyFeature {
    properties: {
        place_id?: string;

        city?: string;

        town?: string;

        village?: string;

        municipality?: string;

        /** Neighborhood fields are deliberately not treated as a city. */
        suburb?: string;

        district?: string;

        county?: string;

        state?: string;

        country?: string;

        country_code?: string;

        formatted?: string;

        lat?: number;

        lon?: number;
    };
}

export interface GeoapifyAutocompleteResponse {
    features: GeoapifyFeature[];
}
