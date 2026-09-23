export type BusinessCategory =
    | "food"
    | "entertainment"
    | "services"
    | "shopping"
    | "education"
    | "health";

export type BusinessSubCategory =
    | "restaurant"
    | "cafe"
    | "bar"
    | "bakery"
    | "club"
    | "event_venue"
    | "cultural_center"
    | "beauty_salon"
    | "barbershop"
    | "repair"
    | "agency"
    | "latin_store"
    | "supermarket"
    | "clothing"
    | "language_school"
    | "academy"
    | "clinic"
    | "gym";

export type BusinessPriceRange = "$" | "$$" | "$$$";

export interface CreateBusinessRequest {
    name: string;
    description?: string;

    category: BusinessCategory;
    subCategory?: BusinessSubCategory;

    images: {
        profile: string;
        cover?: string;
    };

    location: {
        address: string;
        cityId: string;
        country: string;
        latitude: number;
        longitude: number;
    };

    contact: {
        email?: string;
        phone?: string;
        website?: string;
        instagram?: string;
        whatsapp?: string;
    };

    menu?: string;
    priceRange?: BusinessPriceRange;

    tags: string[];
    languages: string[];

    isLatinoOwned: boolean;
    countryOfOrigin?: string;
}