export type DiscoverType =
    | "all"
    | "events"
    | "business";

export interface DiscoverQuery {
    type?: DiscoverType;
    city?: string;
    category?: string;
    excludeCategory?: string;
    search?: string;
    date?: string;
    lat?: number;
    lng?: number;
    page?: number;
    limit?: number;
}

/* =========================================================
   EVENT
========================================================= */

export interface DiscoverEvent {
    _id: string;
    slug?: string;
    type: "event";
    title: string;
    description?: string;
    eventType?: "official" | "community";
    category?: string;
    images?: string[];
    cityId?: string;
    address?: string;
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
    dateStart?: string;
    dateEnd?: string;
    createdBy?: string;
    businessId?: string;
    stats?: {
        views?: number;
        attendees?: number;
    };
    contact?: {
        website?: string;
        instagram?: string;
        whatsapp?: string;
    };
    goodToKnow?: string;
    status?: string;
    moderation?: {
        status?: string;
    };
}

/* =========================================================
   BUSINESS
========================================================= */

export interface DiscoverBusiness {
    _id: string;
    type: "business";
    name: string;
    slug?: string;
    description?: string;
    category?: string;
    subCategory?: string;
    images?: {
        profile?: string;
        cover?: string;
    };
    location?: {
        coordinates?: {
            lat?: number;
            lng?: number;
        };
        address?: string;
        cityId?: string;
        country?: string;
    };
    rating?: {
        average?: number;
        count?: number;
    };
    website?: string;
    instagram?: string;
    whatsapp?: string;
    priceRange?: string;
    status?: string;
    isFeatured?: boolean;
    isLatinoOwned?: boolean;
    followersCount?: number;
    eventsCount?: number;
    likesCount?: number;
}

/* =========================================================
   ITEM
========================================================= */

export type DiscoverItem =
    | DiscoverEvent
    | DiscoverBusiness;

/* =========================================================
   RESPONSE
========================================================= */

export interface DiscoverData {
    recommended: DiscoverItem[];

    page: number;

    hasMore: boolean;
}