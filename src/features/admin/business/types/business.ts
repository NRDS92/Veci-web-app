import { Moderation } from "../../../moderation/types/moderation";

export interface AdminBusiness {
    _id: string;

    name: string;
    description?: string;

    category: string;
    subCategory?: string;

    owner: string;

    images: {
        profile: string;
        cover?: string;
    };

    location: {
        address: string;
        cityId: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };

    contact: {
        email?: string;
        phone?: string;
        website?: string;
        instagram?: string;
        whatsapp?: string;
    };

    tags: string[];
    languages: string[];

    isLatinoOwned: boolean;
    countryOfOrigin?: string;

    rating: {
        average: number;
        count: number;
    };

    likesCount: number;
    followersCount: number;
    eventsCount: number;

    verification: {
        status:
            | "unverified"
            | "pending"
            | "verified"
            | "rejected";
    };

    moderation: Moderation;

    isFeatured: boolean;

    status: "active" | "blocked";

    slug: string;

    visibilityScore: number;

    createdAt: string;
    updatedAt: string;
}