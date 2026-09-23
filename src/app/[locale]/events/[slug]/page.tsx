import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocationMapClient from "../../../../components/location/LocationMapClient";
import EventHero from "../../../../components/events/EventHero";
import EventJsonLd from "../../../../components/seo/EventJsonLd";

/* =========================================================
   TYPES
========================================================= */

interface Publication {
    _id: string;
    entityType: string;
    entityId: string;
    status: string;
    slug: string;
    seoTitle?: string;
    seoDescription?: string;
    canonicalUrl?: string;
    publishedAt?: string;
}

interface Event {
    id: string;
    slug: string;
    title: string;
    description?: string;

    eventType:
        | "official"
        | "community";

    category: string;

    cityId: string;
    address: string;

    dateStart: string;
    dateEnd?: string;

    image?: string;

    location?: {
        type: "Point";
        coordinates: [number, number];
    };

    createdBy?: {
        _id: string;
        name: string;
        profileImage?: string | null;
    };

    contact?: {
        website?: string;
        instagram?: string;
        whatsapp?: string;
    };

    goodToKnow: string[];

    status: string;

    moderation: {
        status: string;
    };
}

interface PublicContentResponse {
    success: boolean;
    data: {
        publication: Publication;
        entity: Event;
    };
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

/* =========================================================
   CONFIGURATION
========================================================= */

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://veci-api-pm1e.onrender.com/api/v1";

const PUBLIC_SITE_URL =
    "https://veci-latin.com";

/* =========================================================
   CANONICAL URL
========================================================= */

const buildEventUrl = (
    slug: string
): string => {
    return `${PUBLIC_SITE_URL}/events/${slug}`;
};

/* =========================================================
   FETCH PUBLIC EVENT
========================================================= */

async function getEvent(
    slug: string
): Promise<
    PublicContentResponse["data"] | null
> {
    const response =
        await fetch(
            `${API_URL}/public/content/${encodeURIComponent(slug)}`,
            {
                next: {
                    revalidate: 60,
                },
            }
        );

    /*
     * A 404 means the event is not publicly
     * available.
     */

    if (response.status === 404) {
        return null;
    }

    /*
     * Any other unsuccessful response
     * is an actual API error.
     */

    if (!response.ok) {
        throw new Error(
            "Failed to fetch public event."
        );
    }

    const data:
        PublicContentResponse =
        await response.json();
    /*
     * Make sure both publication and
     * entity exist.
     */

    if (
        !data.success ||
        !data.data?.entity ||
        !data.data?.publication
    ) {
        return null;
    }

    return data.data;
}

/* =========================================================
   SEO METADATA
========================================================= */

export async function generateMetadata(
    {
        params,
    }: PageProps
): Promise<Metadata> {
    const {
        slug,
    } = await params;

    const data =
        await getEvent(slug);

    /*
     * Event does not exist.
     */

    if (!data) {
        return {
            title:
                "Event not found | VECI",

            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const {
        publication,
        entity,
    } = data;

    /*
     * SEO title.
     */

    const title =
        publication.seoTitle ||
        `${entity.title} | VECI`;

    /*
     * SEO description.
     */

    const description =
        publication.seoDescription ||
        entity.description ||
        `Discover ${entity.title} on VECI.`;

    /*
     * Social image.
     */

    const image =
        entity.image;

    /*
     * Use the publication canonical
     * when explicitly configured.
     *
     * Otherwise build the canonical
     * from the public slug.
     */

    const canonicalUrl =
        publication.canonicalUrl ||
        buildEventUrl(
            publication.slug
        );

    return {
        title,
        description,
        /* =================================================
           CANONICAL
        ================================================= */
        alternates: {
            canonical:
                canonicalUrl,
        },
        /* =================================================
           ROBOTS
        ================================================= */
        robots: {
            index: true,
            follow: true,
        },
        /* =================================================
           OPEN GRAPH
        ================================================= */
        openGraph: {
            title,
            description,
            url:
                canonicalUrl,
            siteName:
                "VECI",
            type:
                "website",
            images:
                image
                    ? [
                        {
                            url:
                                image,
                            alt:
                                entity.title,
                        },
                    ]
                    : undefined,
        },
        /* =================================================
           TWITTER
        ================================================= */

        twitter: {
            card:
                image
                    ? "summary_large_image"
                    : "summary",
            title,
            description,
            images:
                image
                    ? [image]
                    : undefined,
        },
    };
}
/* =========================================================
   EVENT PAGE
========================================================= */
export default async function EventPage(
    {
        params,
    }: PageProps
) {
    const {
        slug,
    } = await params;
    const data =
        await getEvent(slug);
        
    /*
     * If the event is not public,
     * let Next.js render the 404 page.
     */
    if (!data) {
        notFound();
    }
    const {
        publication,
        entity,
    } = data;
    /*
     * IMPORTANT:
     *
     * Use exactly the same canonical URL
     * used by metadata and Open Graph.
     */
    const canonicalUrl =
        publication.canonicalUrl ||
        buildEventUrl(
            publication.slug
        );
    const jsonLdEvent = {
        _id: entity.id,
        title: entity.title,
        description: entity.description,
        eventType: entity.eventType,
        category: entity.category,
        images: entity.image
            ? [entity.image]
            : [],
        cityId: entity.cityId,
        address: entity.address,
        dateStart: entity.dateStart,
        dateEnd: entity.dateEnd,
        location: entity.location,
        createdBy: entity.createdBy,
        contact: entity.contact,
        goodToKnow: entity.goodToKnow,
        status: entity.status,
        moderation: entity.moderation,
    };
    return (
        <main
            className="
                min-h-screen
            "
        >
            {/* =================================================
                STRUCTURED DATA
            ================================================= */}
            <EventJsonLd
                event={jsonLdEvent}
                url={canonicalUrl}
            />
            {/* =================================================
                EVENT ARTICLE
            ================================================= */}
            <article
                className="
                    mx-auto
                    max-w-5xl
                    px-6
                    py-12
                "
            >
                {/* =================================================
                    EVENT HERO
                ================================================= */}
                <EventHero
                    title={entity.title}
                    category={entity.category}
                    cityId={entity.cityId}
                    image={entity.image}
                />
                {entity.location && (
                    <LocationMapClient
                        coordinates={entity.location.coordinates}
                        address={entity.address}
                        title={entity.title}
                    />
                )}
                {/* =================================================
                    EVENT INFORMATION
                ================================================= */}
                <section
                    className="
                        mt-10
                        grid
                        gap-8
                        md:grid-cols-2
                    "
                >
                    {/* =============================================
                        DATE
                    ============================================= */}
                    <div>
                        <h2
                            className="
                                text-xl
                                font-semibold
                            "
                        >
                            When
                        </h2>
                        <p
                            className="
                                mt-2
                                text-gray-600
                            "
                        >
                            {new Date(
                                entity.dateStart
                            ).toLocaleString(
                                "en-US",
                                {
                                    dateStyle:
                                        "long",

                                    timeStyle:
                                        "short",
                                }
                            )}
                        </p>
                        {entity.dateEnd && (
                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                "
                            >
                                Until{" "}
                                {new Date(
                                    entity.dateEnd
                                ).toLocaleString(
                                    "en-US",
                                    {
                                        dateStyle:
                                            "long",
                                        timeStyle:
                                            "short",
                                    }
                                )}
                            </p>
                        )}
                    </div>
                    {/* =============================================
                        LOCATION
                    ============================================= */}
                    <div>
                        <h2
                            className="
                                text-xl
                                font-semibold
                            "
                        >
                            Where
                        </h2>
                        {entity.address && (
                            <p
                                className="
                                    mt-2
                                    text-gray-600
                                "
                            >
                                {entity.address}
                            </p>
                        )}
                        {entity.cityId && (
                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                "
                            >
                                {entity.cityId}
                            </p>
                        )}
                    </div>
                </section>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                {entity.description && (
                    <section
                        className="
                            mt-10
                        "
                    >
                        <h2
                            className="
                                text-2xl
                                font-semibold
                            "
                        >
                            About this event
                        </h2>

                        <p
                            className="
                                mt-4
                                whitespace-pre-line
                                text-gray-700
                            "
                        >
                            {entity.description}
                        </p>
                    </section>
                )}

                {/* =================================================
                    GOOD TO KNOW
                ================================================= */}

                {entity.goodToKnow?.length > 0 && (
                    <section
                        className="
                            mt-10
                        "
                    >
                        <h2
                            className="
                                text-2xl
                                font-semibold
                            "
                        >
                            Good to know
                        </h2>

                        <ul
                            className="
                                mt-4
                                list-disc
                                space-y-2
                                pl-6
                                text-gray-700
                            "
                        >
                            {entity.goodToKnow.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <li
                                        key={`${item}-${index}`}
                                    >
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </section>
                )}

                {/* =================================================
                    CONTACT
                ================================================= */}

                {entity.contact && (
                    (
                        entity.contact.website ||
                        entity.contact.instagram ||
                        entity.contact.whatsapp
                    ) && (
                        <section
                            className="
                                mt-10
                            "
                        >
                            <h2
                                className="
                                    text-2xl
                                    font-semibold
                                "
                            >
                                Contact
                            </h2>

                            <div
                                className="
                                    mt-4
                                    flex
                                    flex-col
                                    gap-2
                                "
                            >
                                {/* =================================
                                    WEBSITE
                                ================================= */}

                                {entity.contact.website && (
                                    <a
                                        href={
                                            entity.contact.website
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            text-blue-600
                                            hover:underline
                                        "
                                    >
                                        Website
                                    </a>
                                )}

                                {/* =================================
                                    INSTAGRAM
                                ================================= */}

                                {entity.contact.instagram && (
                                    <a
                                        href={
                                            entity.contact.instagram
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            text-blue-600
                                            hover:underline
                                        "
                                    >
                                        Instagram
                                    </a>
                                )}

                                {/* =================================
                                    WHATSAPP
                                ================================= */}

                                {entity.contact.whatsapp && (
                                    <a
                                        href={
                                            entity.contact.whatsapp
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            text-blue-600
                                            hover:underline
                                        "
                                    >
                                        WhatsApp
                                    </a>
                                )}
                            </div>
                        </section>
                    )
                )}
            </article>
        </main>
    );
}