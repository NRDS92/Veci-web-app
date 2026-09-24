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

    images: string[];

    location?: {
        type: "Point";
        coordinates: [number, number];
    };

    price?: {
        type: "free" | "paid";
        amount?: number;
        currency: "EUR";
    };

    links: {
        label: string;
        url: string;
    }[];

    createdBy?: {
        id: string;
        name: string;
        profileImage?: string | null;
    };

    goodToKnow: string[];

    attachment?: {
        url: string;
        name: string;
        size: number;
    };

    /*
     * Kept optional because the current public DTO
     * does not guarantee contact information.
     */
    contact?: {
        website?: string;
        instagram?: string;
        whatsapp?: string;
    };

    status?: string;

    moderation?: {
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
   HELPERS
========================================================= */

const formatDate = (
    value: string
): string => {
    return new Date(value).toLocaleString(
        "en-US",
        {
            dateStyle: "long",
            timeStyle: "short",
        }
    );
};

const formatPrice = (
    price?: Event["price"]
): string => {
    if (!price || price.type === "free") {
        return "Free";
    }

    if (
        typeof price.amount !== "number"
    ) {
        return "Paid";
    }

    return new Intl.NumberFormat(
        "en-DE",
        {
            style: "currency",
            currency: price.currency,
        }
    ).format(price.amount);
};

const formatFileSize = (
    size: number
): string => {
    if (size < 1024) {
        return `${size} B`;
    }

    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(
        size /
        (1024 * 1024)
    ).toFixed(1)} MB`;
};

const formatEventType = (
    eventType: Event["eventType"]
): string => {
    if (eventType === "official") {
        return "Official event";
    }

    return "Community event";
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
        entity.images?.[0];

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

    /*
     * Main image is still used by EventHero.
     * The complete gallery is rendered below it.
     */

    const mainImage =
        entity.images?.[0];

    const galleryImages =
        entity.images ?? [];

    /* =================================================
       STRUCTURED DATA
    ================================================= */

    const jsonLdEvent = {
        _id: entity.id,
        title:
            entity.title,
        description:
            entity.description,
        eventType:
            entity.eventType,
        category:
            entity.category,
        images:
            entity.images ?? [],
        cityId:
            entity.cityId,
        address:
            entity.address,
        dateStart:
            entity.dateStart,
        dateEnd:
            entity.dateEnd,
        location:
            entity.location,
        createdBy:
        entity.createdBy
            ? {
                _id:
                    entity.createdBy.id,
                name:
                    entity.createdBy.name,
                profileImage:
                    entity.createdBy.profileImage,
            }
            : undefined,
        goodToKnow:
            entity.goodToKnow,
        status:
            entity.status,
        moderation:
            entity.moderation,
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
                    image={mainImage}
                />

                {/* =================================================
                    IMAGE GALLERY
                ================================================= */}

                {galleryImages.length > 1 && (
                    <section
                        className="
                            mt-6
                        "
                    >
                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-3
                                md:grid-cols-3
                            "
                        >
                            {galleryImages.map(
                                (
                                    image,
                                    index
                                ) => (
                                    <a
                                        key={`${image}-${index}`}
                                        href={image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            group
                                            overflow-hidden
                                            rounded-2xl
                                            bg-gray-100
                                        "
                                    >
                                        <img
                                            src={image}
                                            alt={`${entity.title} - image ${index + 1}`}
                                            className="
                                                aspect-[4/3]
                                                h-full
                                                w-full
                                                object-cover
                                                transition
                                                duration-300
                                                group-hover:scale-105
                                            "
                                        />
                                    </a>
                                )
                            )}
                        </div>
                    </section>
                )}

                {/* =================================================
                    EVENT SUMMARY
                ================================================= */}

                <section
                    className="
                        mt-10
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {/* CATEGORY */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-gray-200
                            p-5
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-medium
                                text-gray-500
                            "
                        >
                            Category
                        </p>

                        <p
                            className="
                                mt-2
                                text-lg
                                font-semibold
                                capitalize
                            "
                        >
                            {entity.category}
                        </p>
                    </div>

                    {/* EVENT TYPE */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-gray-200
                            p-5
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-medium
                                text-gray-500
                            "
                        >
                            Event type
                        </p>

                        <p
                            className="
                                mt-2
                                text-lg
                                font-semibold
                            "
                        >
                            {formatEventType(
                                entity.eventType
                            )}
                        </p>
                    </div>

                    {/* PRICE */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-gray-200
                            p-5
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-medium
                                text-gray-500
                            "
                        >
                            Price
                        </p>

                        <p
                            className="
                                mt-2
                                text-lg
                                font-semibold
                            "
                        >
                            {formatPrice(
                                entity.price
                            )}
                        </p>
                    </div>

                    {/* CITY */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-gray-200
                            p-5
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-medium
                                text-gray-500
                            "
                        >
                            City
                        </p>

                        <p
                            className="
                                mt-2
                                text-lg
                                font-semibold
                            "
                        >
                            {entity.cityId}
                        </p>
                    </div>
                </section>

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

                    <div
                        className="
                            rounded-2xl
                            bg-gray-50
                            p-6
                        "
                    >
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
                                mt-3
                                text-gray-700
                            "
                        >
                            {formatDate(
                                entity.dateStart
                            )}
                        </p>

                        {entity.dateEnd && (
                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-gray-500
                                "
                            >
                                Until{" "}
                                {formatDate(
                                    entity.dateEnd
                                )}
                            </p>
                        )}
                    </div>

                    {/* =============================================
                        LOCATION
                    ============================================= */}

                    <div
                        className="
                            rounded-2xl
                            bg-gray-50
                            p-6
                        "
                    >
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
                                    mt-3
                                    text-gray-700
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
                    PRICE DETAIL
                ================================================= */}

                {entity.price && (
                    <section
                        className="
                            mt-10
                            rounded-2xl
                            border
                            border-gray-200
                            p-6
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            "
                        >
                            <div>
                                <h2
                                    className="
                                        text-2xl
                                        font-semibold
                                    "
                                >
                                    Price
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    Event admission
                                </p>
                            </div>

                            <p
                                className="
                                    text-2xl
                                    font-bold
                                "
                            >
                                {formatPrice(
                                    entity.price
                                )}
                            </p>
                        </div>
                    </section>
                )}

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
                                leading-7
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
                                space-y-3
                            "
                        >
                            {entity.goodToKnow.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <li
                                        key={`${item}-${index}`}
                                        className="
                                            flex
                                            gap-3
                                            text-gray-700
                                        "
                                    >
                                        <span
                                            className="
                                                mt-1
                                                shrink-0
                                                font-semibold
                                            "
                                        >
                                            ✓
                                        </span>

                                        <span>
                                            {item}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </section>
                )}

                {/* =================================================
                    ORGANIZER
                ================================================= */}

                {entity.createdBy && (
                    <section
                        className="
                            mt-10
                            rounded-2xl
                            border
                            border-gray-200
                            p-6
                        "
                    >
                        <h2
                            className="
                                text-2xl
                                font-semibold
                            "
                        >
                            Organized by
                        </h2>

                        <div
                            className="
                                mt-5
                                flex
                                items-center
                                gap-4
                            "
                        >
                            {entity.createdBy.profileImage ? (
                                <img
                                    src={
                                        entity.createdBy
                                            .profileImage
                                    }
                                    alt={
                                        entity.createdBy.name
                                    }
                                    className="
                                        h-14
                                        w-14
                                        rounded-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gray-200
                                        text-lg
                                        font-semibold
                                        text-gray-600
                                    "
                                >
                                    {entity.createdBy.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}

                            <div>
                                <p
                                    className="
                                        font-semibold
                                    "
                                >
                                    {
                                        entity.createdBy
                                            .name
                                    }
                                </p>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    Event organizer
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* =================================================
                    LINKS
                ================================================= */}

                {entity.links?.length > 0 && (
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
                            Links
                        </h2>

                        <div
                            className="
                                mt-4
                                flex
                                flex-wrap
                                gap-3
                            "
                        >
                            {entity.links.map(
                                (
                                    link,
                                    index
                                ) => (
                                    <a
                                        key={`${link.url}-${index}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-xl
                                            border
                                            border-gray-300
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-medium
                                            transition
                                            hover:bg-gray-50
                                        "
                                    >
                                        {link.label}
                                    </a>
                                )
                            )}
                        </div>
                    </section>
                )}

                {/* =================================================
                    ATTACHMENT
                ================================================= */}

                {entity.attachment && (
                    <section
                        className="
                            mt-10
                            rounded-2xl
                            border
                            border-gray-200
                            p-6
                        "
                    >
                        <h2
                            className="
                                text-2xl
                                font-semibold
                            "
                        >
                            Event document
                        </h2>

                        <div
                            className="
                                mt-4
                                flex
                                flex-col
                                gap-4
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div>
                                <p
                                    className="
                                        font-medium
                                    "
                                >
                                    {entity.attachment.name}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    PDF ·{" "}
                                    {formatFileSize(
                                        entity.attachment
                                            .size
                                    )}
                                </p>
                            </div>

                            <a
                                href={
                                    entity.attachment
                                        .url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-black
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:opacity-80
                                "
                            >
                                Open document
                            </a>
                        </div>
                    </section>
                )}

                {/* =================================================
                    CONTACT
                ================================================= */}

                {entity.contact &&
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
                                    flex-wrap
                                    gap-3
                                "
                            >
                                {entity.contact.website && (
                                    <a
                                        href={
                                            entity.contact
                                                .website
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-xl
                                            border
                                            border-gray-300
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        Website
                                    </a>
                                )}

                                {entity.contact.instagram && (
                                    <a
                                        href={
                                            entity.contact
                                                .instagram
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-xl
                                            border
                                            border-gray-300
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        Instagram
                                    </a>
                                )}

                                {entity.contact.whatsapp && (
                                    <a
                                        href={
                                            entity.contact
                                                .whatsapp
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-xl
                                            border
                                            border-gray-300
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        WhatsApp
                                    </a>
                                )}
                            </div>
                        </section>
                    )}

                {/* =================================================
                    MAP
                ================================================= */}

                {entity.location && (
                    <section
                        className="
                            mt-10
                        "
                    >
                        <h2
                            className="
                                mb-4
                                text-2xl
                                font-semibold
                            "
                        >
                            Location
                        </h2>

                        <LocationMapClient
                            coordinates={
                                entity.location
                                    .coordinates
                            }
                            address={
                                entity.address
                            }
                            title={
                                entity.title
                            }
                        />
                    </section>
                )}
            </article>
        </main>
    );
}