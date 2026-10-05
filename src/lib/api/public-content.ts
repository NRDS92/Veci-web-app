export interface PublicEvent {
    id: string;
    slug: string;
    title: string;
    description?: string;
    category:
        | "party"
        | "food"
        | "culture"
        | "sports"
        | "meetup"
        | "concert"
        | string;
    eventType:
        | "official"
        | "community";
    cityId: string;
    address: string;
    dateStart: string;
    dateEnd?: string;
    images: string[];
}

interface PublicEventsResponse {
    success: boolean;
    data: PublicEvent[];
}

export interface PublicBusiness {

    // ==================================================
    // IDENTITY
    // ==================================================

    id: string;

    slug: string;

    name: string;

    description?: string;


    // ==================================================
    // CLASSIFICATION
    // ==================================================

    category: string;

    subCategory?: string;


    // ==================================================
    // LOCATION
    // ==================================================

    cityId: string;

    country?: string;

    address?: string;

    coordinates?: {
        lat: number;
        lng: number;
    };


    // ==================================================
    // IMAGES
    // ==================================================

    image?: string;

    coverImage?: string;

    gallery: string[];


    // ==================================================
    // CONTACT
    // ==================================================

    website?: string;

    instagram?: string;

    whatsapp?: string;


    // ==================================================
    // PROFILE
    // ==================================================

    profile: {

        headline?: string;

        services: string[];

        specialties: string[];

        languages: string[];

        serviceArea: string[];

        availability?: {

            type:
                | "appointment"
                | "walk_in"
                | "online"
                | "flexible";

            description?: string;
        };

        openingHours?: {

            monday: {
                isOpen: boolean;

                intervals: {
                    open: string;
                    close: string;
                }[];
            };

            tuesday: {
                isOpen: boolean;

                intervals: {
                    open: string;
                    close: string;
                }[];
            };

            wednesday: {
                isOpen: boolean;

                intervals: {
                    open: string;
                    close: string;
                }[];
            };

            thursday: {
                isOpen: boolean;

                intervals: {
                    open: string;
                    close: string;
                }[];
            };

            friday: {
                isOpen: boolean;

                intervals: {
                    open: string;
                    close: string;
                }[];
            };

            saturday: {
                isOpen: boolean;

                intervals: {
                    open: string;
                    close: string;
                }[];
            };

            sunday: {
                isOpen: boolean;

                intervals: {
                    open: string;
                    close: string;
                }[];
            };
        };

        pricing?: {

            type:
                | "fixed"
                | "hourly"
                | "starting_at"
                | "range";

            currency: "EUR";

            amount?: number;

            minAmount?: number;

            maxAmount?: number;

            description?: string;
        };
    };


    // ==================================================
    // DOCUMENTS
    // ==================================================

    documents: {

        type:
            | "menu"
            | "catalog"
            | "portfolio"
            | "brochure";

        url: string;

        name?: string;

    }[];


    // ==================================================
    // DISCOVERY
    // ==================================================

    priceRange?:
        | "$"
        | "$$"
        | "$$$";

    tags: string[];

    languages: string[];


    // ==================================================
    // COMMUNITY
    // ==================================================

    isLatinoOwned: boolean;

    countryOfOrigin?: string;


    // ==================================================
    // RATING
    // ==================================================

    rating: {

        average: number;

        count: number;
    };


    // ==================================================
    // SOCIAL
    // ==================================================

    likesCount: number;

    followersCount: number;

    eventsCount: number;


    // ==================================================
    // VERIFICATION
    // ==================================================

    verificationStatus:
        | "unverified"
        | "pending"
        | "verified"
        | "rejected";
}

interface PublicBusinessesResponse {
    success: boolean;
    data: PublicBusiness[];
}

interface PublicBusinessResponse {
    success: boolean;
    data: {
        publication: {
            _id: string;
            entityType: string;
            entityId: string;
            status: string;
            slug: string;
            seoTitle?: string;
            seoDescription?: string;
            canonicalUrl?: string;
            publishedAt?: string;
            unpublishedAt?: string;
        };
        entity: PublicBusiness;
    };
}

export interface PublicBusinessContent {
    publication: {
        _id: string;
        entityType: string;
        entityId: string;
        status: string;
        slug: string;
        seoTitle?: string;
        seoDescription?: string;
        canonicalUrl?: string;
        publishedAt?: string;
        unpublishedAt?: string;
    };
    entity: PublicBusiness;
}

interface PublicBusinessContentResponse {
    success: boolean;
    data: PublicBusinessContent;
}

const API_URL =
    "https://veci-api-pm1e.onrender.com/api/v1";

export interface GetPublicEventsOptions {
    cityId?: string;
    category?: string;
    excludeEntityId?: string;
    limit?: number;
}

export async function getPublicEvents(
    options: GetPublicEventsOptions = {}
): Promise<PublicEvent[]> {

    const params =
        new URLSearchParams();

    if (options.cityId) {
        params.set(
            "cityId",
            options.cityId
        );
    }

    if (options.category) {
        params.set(
            "category",
            options.category
        );
    }

    if (options.excludeEntityId) {
        params.set(
            "excludeEntityId",
            options.excludeEntityId
        );
    }

    if (options.limit) {
        params.set(
            "limit",
            options.limit.toString()
        );
    }
    const query =
        params.toString();
    const url =
        `${API_URL}/public/events${
            query
                ? `?${query}`
                : ""
        }`;
    const response =
        await fetch(
            url,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

    if (!response.ok) {

        const errorBody =
            await response.text();

        console.error(
            "❌ PUBLIC EVENTS API ERROR",
            {
                url,
                status:
                    response.status,
                statusText:
                    response.statusText,
                body:
                    errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public events: ${response.status}`
        );
    }

    const data:
        PublicEventsResponse =
            await response.json();

    if (!data.success) {
        throw new Error(
            "Public events request failed."
        );
    }

    return data.data;
}

export interface GetPublicBusinessesOptions {
    cityId?: string;
    category?: string;
    excludeEntityId?: string;
    limit?: number;
}

export async function getPublicBusinesses(
    options: GetPublicBusinessesOptions = {}
): Promise<PublicBusiness[]> {

    const params =
        new URLSearchParams();

    if (options.cityId) {
        params.set(
            "cityId",
            options.cityId
        );
    }

    if (options.category) {
        params.set(
            "category",
            options.category
        );
    }

    if (options.excludeEntityId) {
        params.set(
            "excludeEntityId",
            options.excludeEntityId
        );
    }

    if (options.limit) {
        params.set(
            "limit",
            options.limit.toString()
        );
    }

    const query =
        params.toString();

    const url =
        `${API_URL}/public/businesses${
            query
                ? `?${query}`
                : ""
        }`;

    console.log(
        "🔥 PUBLIC BUSINESSES API:",
        url
    );

    const response =
        await fetch(
            url,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

    if (!response.ok) {

        const errorBody =
            await response.text();

        console.error(
            "❌ PUBLIC BUSINESSES API ERROR",
            {
                url,
                status:
                    response.status,
                statusText:
                    response.statusText,
                body:
                    errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public businesses: ${response.status}`
        );
    }

    const data:
        PublicBusinessesResponse =
            await response.json();

    if (!data.success) {
        throw new Error(
            "Public businesses request failed."
        );
    }

    return data.data;
}

export async function getPublicBusinessBySlug(
    slug: string
): Promise<PublicBusiness | null> {

    const url =
        `${API_URL}/public/content/${encodeURIComponent(slug)}`;

    console.log(
        "🔥 PUBLIC BUSINESS BY SLUG API:",
        url
    );

    const response =
        await fetch(
            url,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

    if (
        response.status === 404
    ) {
        return null;
    }

    if (!response.ok) {

        const errorBody =
            await response.text();

        console.error(
            "❌ PUBLIC BUSINESS BY SLUG API ERROR",
            {
                url,
                status:
                    response.status,
                statusText:
                    response.statusText,
                body:
                    errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public business: ${response.status}`
        );
    }

    const data:
        PublicBusinessResponse =
            await response.json();

    if (!data.success) {
        throw new Error(
            "Public business request failed."
        );
    }

    return data.data.entity;
}

export async function getPublicBusinessContentBySlug(
    slug: string
): Promise<PublicBusinessContent | null> {

    const url =
        `${API_URL}/public/content/${encodeURIComponent(slug)}`;

    console.log(
        "🔥 PUBLIC BUSINESS SEO API:",
        url
    );

    const response =
        await fetch(
            url,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

    if (
        response.status === 404
    ) {
        return null;
    }

    if (!response.ok) {

        const errorBody =
            await response.text();

        console.error(
            "❌ PUBLIC BUSINESS SEO API ERROR",
            {
                url,
                status:
                    response.status,
                statusText:
                    response.statusText,
                body:
                    errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public business content: ${response.status}`
        );
    }

    const data:
        PublicBusinessContentResponse =
            await response.json();

    if (!data.success) {
        throw new Error(
            "Public business content request failed."
        );
    }

    return data.data;
}