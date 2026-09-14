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
    image?: string;
}

interface PublicEventsResponse {
    success: boolean;
    data: PublicEvent[];
}

export interface PublicBusiness {
    id: string;
    slug: string;
    name: string;
    description?: string;
    category: string;
    subCategory?: string;
    cityId: string;
    country?: string;
    address?: string;
    image?: string;
    coverImage?: string;
    website?: string;
    instagram?: string;
    whatsapp?: string;
    priceRange?:
        | "$"
        | "$$"
        | "$$$";
    tags: string[];
    languages: string[];
    isLatinoOwned: boolean;
    countryOfOrigin?: string;
    rating: {
        average: number;
        count: number;
    };
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

    console.log(
        "🔥 PUBLIC CONTENT API:",
        `${API_URL}/public/events`
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