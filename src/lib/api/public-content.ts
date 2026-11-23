
import { PublicBusinessSchema, type PublicBusiness } from "@ndrs92/contracts";
import { PublicCommunitySchema, type PublicCommunity } from "@ndrs92/contracts";
import { PublicEventSchema, type PublicEvent } from "@ndrs92/contracts";

export type { PublicBusiness };
export type { PublicCommunity };

// ==================================================
// PUBLIC EVENT
// ==================================================

export type { PublicEvent };

// ==================================================
// API RESPONSE TYPES
// ==================================================

interface PublicEventsResponse {
    success: boolean;
    data: unknown[];
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

// ==================================================
// CONFIGURATION
// ==================================================

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://veci-api-pm1e.onrender.com/api/v1";

export interface PublicCommunityContent {
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
    };
    entity: PublicCommunity;
}

export async function getPublicCommunities(options: { cityId?: string; interest?: string; limit?: number } = {}): Promise<PublicCommunity[]> {
    const params = new URLSearchParams();
    if (options.cityId) params.set("cityId", options.cityId);
    if (options.interest) params.set("interest", options.interest);
    if (options.limit) params.set("limit", String(options.limit));
    const query = params.toString();
    const response = await fetch(`${API_URL}/communities/discover${query ? `?${query}` : ""}`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`Failed to fetch public communities: ${response.status}`);
    const result: { success: boolean; data: { items: unknown[] } } = await response.json();
    if (!result.success || !Array.isArray(result.data?.items)) throw new Error("Public communities response is invalid.");
    return result.data.items.map((community) => PublicCommunitySchema.parse(community));
}

export async function getPublicCommunityContentBySlug(slug: string): Promise<PublicCommunityContent | null> {
    const response = await fetch(`${API_URL}/public/content/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Failed to fetch public community: ${response.status}`);
    const result: { success: boolean; data: PublicCommunityContent } = await response.json();
    if (!result.success || !result.data?.entity) throw new Error("Public community response is invalid.");
    return { ...result.data, entity: PublicCommunitySchema.parse(result.data.entity) };
}

// ==================================================
// PUBLIC EVENTS
// ==================================================

export interface GetPublicEventsOptions {
    cityId?: string;
    category?: string;
    excludeEntityId?: string;
    limit?: number;
}

export async function getPublicEvents(
    options: GetPublicEventsOptions = {}
): Promise<PublicEvent[]> {
    const params = new URLSearchParams();

    if (options.cityId) {
        params.set("cityId", options.cityId);
    }

    if (options.category) {
        params.set("category", options.category);
    }

    if (options.excludeEntityId) {
        params.set(
            "excludeEntityId",
            options.excludeEntityId
        );
    }

    if (options.limit) {
        params.set("limit", options.limit.toString());
    }

    const query = params.toString();

    const url =
        `${API_URL}/public/events${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();

        console.error(
            "❌ PUBLIC EVENTS API ERROR",
            {
                url,
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public events: ${response.status}`
        );
    }

    const data: PublicEventsResponse =
        await response.json();

    if (!data.success) {
        throw new Error(
            "Public events request failed."
        );
    }

    return data.data.map((event) => PublicEventSchema.parse(event));
}

export async function getPublicCommunityEvents(communityId: string, limit = 20): Promise<PublicEvent[]> {
    const params = new URLSearchParams({ limit: String(limit) });
    const response = await fetch(`${API_URL}/public/communities/${encodeURIComponent(communityId)}/events?${params}`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`Failed to fetch Community events: ${response.status}`);
    const result: { success: boolean; data: unknown[] } = await response.json();
    if (!result.success || !Array.isArray(result.data)) throw new Error("Community events response is invalid.");
    return result.data.map((event) => PublicEventSchema.parse(event));
}

// ==================================================
// PUBLIC BUSINESSES
// ==================================================

export interface GetPublicBusinessesOptions {
    cityId?: string;
    category?: string;
    excludeEntityId?: string;
    limit?: number;
}

export async function getPublicBusinesses(
    options: GetPublicBusinessesOptions = {}
): Promise<PublicBusiness[]> {
    const params = new URLSearchParams();

    if (options.cityId) {
        params.set("cityId", options.cityId);
    }

    if (options.category) {
        params.set("category", options.category);
    }

    if (options.excludeEntityId) {
        params.set(
            "excludeEntityId",
            options.excludeEntityId
        );
    }

    if (options.limit) {
        params.set("limit", options.limit.toString());
    }

    const query = params.toString();

    const url =
        `${API_URL}/public/businesses${query ? `?${query}` : ""}`;

    console.log(
        "🔥 PUBLIC BUSINESSES API:",
        url
    );

    const response = await fetch(url, {
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();

        console.error(
            "❌ PUBLIC BUSINESSES API ERROR",
            {
                url,
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public businesses: ${response.status}`
        );
    }

    const data: PublicBusinessesResponse =
        await response.json();

    if (!data.success) {
        throw new Error(
            "Public businesses request failed."
        );
    }

    return data.data.map((business) => PublicBusinessSchema.parse(business));
}

// ==================================================
// PUBLIC BUSINESS BY SLUG
// ==================================================

export async function getPublicBusinessBySlug(
    slug: string
): Promise<PublicBusiness | null> {
    const url =
        `${API_URL}/public/content/${encodeURIComponent(slug)}`;

    console.log(
        "🔥 PUBLIC BUSINESS BY SLUG API:",
        url
    );

    const response = await fetch(url, {
        next: {
            revalidate: 60,
        },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        const errorBody = await response.text();

        console.error(
            "❌ PUBLIC BUSINESS BY SLUG API ERROR",
            {
                url,
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public business: ${response.status}`
        );
    }

    const data: PublicBusinessResponse =
        await response.json();

    if (!data.success) {
        throw new Error(
            "Public business request failed."
        );
    }

    return PublicBusinessSchema.parse(data.data.entity);
}

// ==================================================
// PUBLIC BUSINESS CONTENT (SEO)
// ==================================================

export async function getPublicBusinessContentBySlug(
    slug: string
): Promise<PublicBusinessContent | null> {
    const url =
        `${API_URL}/public/content/${encodeURIComponent(slug)}`;

    console.log(
        "🔥 PUBLIC BUSINESS SEO API:",
        url
    );

    const response = await fetch(url, {
        next: {
            revalidate: 60,
        },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        const errorBody = await response.text();

        console.error(
            "❌ PUBLIC BUSINESS SEO API ERROR",
            {
                url,
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            }
        );

        throw new Error(
            `Failed to fetch public business content: ${response.status}`
        );
    }

    const data: PublicBusinessContentResponse =
        await response.json();

    if (!data.success) {
        throw new Error(
            "Public business content request failed."
        );
    }

    return {
        ...data.data,
        entity: PublicBusinessSchema.parse(data.data.entity),
    };
}
