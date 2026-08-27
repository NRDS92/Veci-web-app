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

const API_URL = "https://veci-api-pm1e.onrender.com/api/v1";

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
        params.set(
            "limit",
            options.limit.toString()
        );
    }

    const query = params.toString();

    const url =
        `${API_URL}/public/events${
            query ? `?${query}` : ""
        }`;

        

    console.log(
        "🔥 PUBLIC CONTENT API:",
        `${API_URL}/public/events`
    );



    const response = await fetch(url, {
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {

        const errorBody =
            await response.text();

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

    return data.data;
}