import { notFound } from "next/navigation";
import type { Metadata } from "next";

import EventJsonLd from "../../../components/seo/EventJsonLd";


interface Publication {
    _id: string;

    entityType: string;

    entityId: string;

    status: string;

    slug: string;

    seoTitle?: string;

    seoDescription?: string;

    publishedAt?: string;
}


interface Event {
    _id: string;

    title: string;

    description?: string;

    eventType:
        | "official"
        | "community";

    category: string;

    images: string[];

    cityId: string;

    address: string;

    dateStart: string;

    dateEnd?: string;

    location?: {
        type: "Point";

        coordinates: [
            number,
            number
        ];
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


/**
 * Public VECI API.
 *
 * Expected value:
 *
 * https://veci-api-pm1e.onrender.com/api/v1
 */
const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://veci-api-pm1e.onrender.com/api/v1";


/**
 * Public VECI website URL.
 *
 * This is the canonical domain used for
 * SEO, Open Graph and structured data.
 */
const PUBLIC_SITE_URL =
    "https://veci-latin.com";


/**
 * Build the canonical URL for an event.
 */
const buildEventUrl = (
    slug: string
): string => {

    return `${PUBLIC_SITE_URL}/events/${slug}`;

};


/**
 * Fetch a published event through
 * the Public Content Platform.
 *
 * The slug is the public identity.
 *
 * slug
 *   ↓
 * Publication
 *   ↓
 * Event
 */
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


    /**
     * A 404 means the public content
     * does not exist or is not published.
     */
    if (
        response.status === 404
    ) {

        return null;

    }


    /**
     * Any other unsuccessful response
     * should be treated as an actual
     * API error.
     */
    if (
        !response.ok
    ) {

        throw new Error(
            "Failed to fetch public event."
        );

    }


    const data:
        PublicContentResponse =
        await response.json();


    if (
        !data.success ||
        !data.data?.entity ||
        !data.data?.publication
    ) {

        return null;

    }


    return data.data;

}


/**
 * Generate SEO metadata dynamically
 * from the published VECI content.
 */
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


    /**
     * If the event does not exist,
     * Next.js will render the page metadata
     * for the not-found state.
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


    const title =
        publication.seoTitle ||
        `${entity.title} | VECI`;


    const description =
        publication.seoDescription ||
        entity.description ||
        `Discover ${entity.title} on VECI.`;


    const image =
        entity.images?.[0];


    const canonicalUrl =
        buildEventUrl(
            publication.slug
        );


    return {

        title,

        description,


        /**
         * Canonical URL.
         *
         * This tells search engines
         * which URL represents the
         * canonical version of this event.
         */
        alternates: {

            canonical:
                canonicalUrl,

        },


        /**
         * Public pages should be
         * indexable by search engines.
         */
        robots: {

            index: true,

            follow: true,

        },


        /**
         * Open Graph metadata.
         */
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


        /**
         * Twitter / social previews.
         */
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


/**
 * Public Event Page.
 *
 * Example:
 *
 * /events/prueba-4
 */
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


    /**
     * Content is not publicly available.
     */
    if (!data) {

        notFound();

    }


    const {
        publication,
        entity,
    } = data;


    /**
     * Use exactly the same canonical URL
     * for:
     *
     * - canonical metadata
     * - Open Graph
     * - JSON-LD
     */
    const canonicalUrl =
        buildEventUrl(
            publication.slug
        );


    return (

        <main className="min-h-screen">


            {/*

                Structured data

                Tells search engines that
                this page represents an Event.

            */}

            <EventJsonLd
                event={entity}
                url={canonicalUrl}
            />


            <article
                className="
                    mx-auto
                    max-w-5xl
                    px-6
                    py-12
                "
            >


                {/*

                    HERO IMAGE

                */}

                {entity.images?.[0] && (

                    <img
                        src={
                            entity.images[0]
                        }
                        alt={
                            entity.title
                        }
                        className="
                            mb-8
                            aspect-video
                            w-full
                            rounded-2xl
                            object-cover
                        "
                    />

                )}


                {/*

                    EVENT HEADER

                */}

                <header>


                    <p
                        className="
                            mb-2
                            text-sm
                            font-medium
                            uppercase
                            tracking-wide
                            text-gray-500
                        "
                    >

                        {entity.category}

                    </p>


                    <h1
                        className="
                            text-4xl
                            font-bold
                            tracking-tight
                            md:text-5xl
                        "
                    >

                        {entity.title}

                    </h1>


                    <p
                        className="
                            mt-4
                            text-gray-500
                        "
                    >

                        {entity.cityId}

                    </p>

                </header>


                {/*

                    EVENT INFORMATION

                */}

                <section
                    className="
                        mt-10
                        grid
                        gap-8
                        md:grid-cols-2
                    "
                >


                    {/* DATE */}

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

                    </div>


                    {/* LOCATION */}

                    <div>

                        <h2
                            className="
                                text-xl
                                font-semibold
                            "
                        >

                            Where

                        </h2>


                        <p
                            className="
                                mt-2
                                text-gray-600
                            "
                        >

                            {entity.address}

                        </p>


                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                            "
                        >

                            {entity.cityId}

                        </p>

                    </div>

                </section>


                {/*

                    DESCRIPTION

                */}

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


                {/*

                    GOOD TO KNOW

                */}

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
                                        key={
                                            `${item}-${index}`
                                        }
                                    >
                                        {item}
                                    </li>

                                )
                            )}

                        </ul>

                    </section>

                )}


                {/*

                    CONTACT

                */}

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