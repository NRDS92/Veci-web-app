
export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface MyEvent {
    _id: string;
    title: string;
    slug?: string;
    description?: string;
    eventType: "official" | "community";
    category:
        | "party"
        | "food"
        | "culture"
        | "sports"
        | "meetup"
        | "concert";
    cityId: string;
    images: string[];
    address: string;
    dateStart: string;
    dateEnd?: string;
    status: "active" | "blocked";
    createdBy: string;
    businessId?: string;
    stats: {
        views: number;
        attendees: number;
    };
}

export interface MyBusiness {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    providerType: "business" | "community";
    category:
        | "food"
        | "entertainment"
        | "services"
        | "shopping"
        | "education"
        | "health";
    subCategory?: string;
    images: {
        profile: string;
        cover?: string;
        gallery: string[];
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
    rating: {
        average: number;
        count: number;
    };
    eventsCount: number;
    followersCount: number;
    status: "active" | "blocked";
}

export interface FavoriteCreator {
    _id: string;
    name: string;
    profileImage?: string;
}

export interface FavoriteBusiness {
    _id: string;
    name: string;
    category: MyBusiness["category"];
    images: MyBusiness["images"];
}

export type FavoriteEvent = Omit<
    MyEvent,
    "createdBy" | "businessId"
> & {
    createdBy: FavoriteCreator | string;
    businessId?: FavoriteBusiness | string;
};

