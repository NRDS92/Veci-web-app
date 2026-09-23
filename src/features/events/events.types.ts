export type EventType = "official" | "community";

export type EventCategory =
    | "party"
    | "food"
    | "culture"
    | "sports"
    | "meetup"
    | "concert";

export interface CreateEventRequest {
    title: string;
    description?: string;
    eventType: EventType;
    category: EventCategory;
    cityId: string;
    images: string[];
    address: string;
    latitude: number;
    longitude: number;
    businessId?: string;
    dateStart: string;
    dateEnd?: string;
    contact?: {
        website?: string;
        instagram?: string;
        whatsapp?: string;
    };
    goodToKnow?: string[];
}

export interface Event {
    _id: string;
    title: string;
    description?: string;
    eventType: EventType;
    category: EventCategory;
    cityId: string;
    images: string[];
    address: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    status: "active" | "blocked";
    moderation: {
        status: string;
        reviewedBy?: string;
        reviewedAt?: string;
        rejectionReason?: string;
        rejectionComment?: string;
    };
    dateStart: string;
    dateEnd?: string;
    createdBy: string;
    businessId?: string;
    contact?: {
        website?: string;
        instagram?: string;
        whatsapp?: string;
    };
    goodToKnow: string[];
    createdAt: string;
    updatedAt: string;
}