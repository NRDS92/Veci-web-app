import type { PublicBusiness } from "@ndrs92/contracts";

export type DiscoverType =
    | "all"
    | "events"
    | "business";

export interface DiscoverQuery {
    type?: DiscoverType;
    city?: string;
    category?: string;
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

export type DiscoverBusiness = PublicBusiness & {
    type: "business";
};

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

/* =========================================================
   EVENT CARD
========================================================= */

export interface EventCardEvent {
    _id: string;
    slug?: string;
    title: string;
    category?: string;
    images?: string[];
    cityId?: string;
    dateStart?: string;
}

export interface DiscoverFilters {
  city?: string;
  category?: string;
  date?: string;
  search?: string;
}
