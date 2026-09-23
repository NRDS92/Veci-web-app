import type { Metadata } from "next";

import {
    getPublicBusinessContentBySlug,
} from "@/lib/api/public-content";

import {
    Ubicacion,
    Mundo,
    Dolar,
} from "@mteherandev/colombia-icons-react";
import BusinessHero from "@/components/business/BusinessHero";
import LocationMapClient from "@/components/location/LocationMapClient";


interface BusinessPageProps {

    params: Promise<{
        slug: string;
    }>;

}


/* =========================================================
   SEO METADATA
========================================================= */

export async function generateMetadata(
    {
        params,
    }: BusinessPageProps
): Promise<Metadata> {

    const {
        slug,
    } = await params;
    
    const content =
        await getPublicBusinessContentBySlug(
            slug
        );

    if (!content) {

        return {

            title:
                "Business not found | VECI",

            robots: {
                index: false,
                follow: false,
            },

        };

    }


    const {
        publication,
        entity,
    } = content;


    const title =
        publication.seoTitle ||
        `${entity.name} | VECI`;


    const description =
        publication.seoDescription ||
        entity.description ||
        `Discover ${entity.name} on VECI.`;


    const canonical =
        publication.canonicalUrl ||
        `https://veci-latin.com/business/${entity.slug}`;


    const image =
        entity.coverImage ||
        entity.image;


    return {

        title,

        description,


        alternates: {

            canonical,

        },


        robots: {

            index: true,

            follow: true,

        },


        openGraph: {

            title,

            description,

            url:
                canonical,

            type:
                "website",

            siteName:
                "VECI",

            ...(image
                ? {

                    images: [

                        {

                            url:
                                image,

                            alt:
                                entity.name,

                        },

                    ],

                }

                : {}
            ),

        },


        twitter: {

            card:
                image
                    ? "summary_large_image"
                    : "summary",

            title,

            description,

            ...(image
                ? {

                    images: [

                        image,

                    ],

                }

                : {}
            ),

        },

    };

}


/* =========================================================
   PAGE
========================================================= */

export default async function BusinessPage(
    {
        params,
    }: BusinessPageProps
) {

    const {
        slug,
    } = await params;


    const content =
        await getPublicBusinessContentBySlug(
            slug
        );


    if (!content) {

        return (
            <main
                className="min-h-screen"
            >
                <section
                    className="
                        mx-auto
                        max-w-5xl
                        px-6
                        pt-36
                        pb-16
                    "
                >
                    <h1
                        className="
                            text-3xl
                            font-bold
                        "
                    >
                        Business not found
                    </h1>


                    <p
                        className="
                            mt-4
                            text-gray-600
                        "
                    >
                        This business could not be found.
                    </p>

                </section>

            </main>

        );

    }


    const {
        publication,
        entity,
    } = content;


    /* =====================================================
       JSON-LD
    ===================================================== */


    const sameAs: string[] = [];


    if (entity.website) {

        sameAs.push(
            entity.website
        );

    }


    if (entity.instagram) {

        sameAs.push(
            entity.instagram
        );

    }


    const jsonLd = {

        "@context":
            "https://schema.org",

        "@type":
            "LocalBusiness",


        name:
            entity.name,


        ...(entity.description
            ? {

                description:
                    entity.description,

            }

            : {}
        ),


        url:
            publication.canonicalUrl ||
            `https://veci-latin.com/business/${entity.slug}`,


        ...(entity.image
            ? {

                image:
                    entity.image,

            }

            : {}
        ),


        ...(entity.address ||
            entity.cityId ||
            entity.country
            ? {

                address: {

                    "@type":
                        "PostalAddress",


                    ...(entity.address
                        ? {

                            streetAddress:
                                entity.address,

                        }

                        : {}
                    ),


                    ...(entity.cityId
                        ? {

                            addressLocality:
                                entity.cityId,

                        }

                        : {}
                    ),


                    ...(entity.country
                        ? {

                            addressCountry:
                                entity.country,

                        }

                        : {}
                    ),

                },

            }

            : {}
        ),


        ...(sameAs.length > 0
            ? {

                sameAs,

            }

            : {}
        ),


        ...(entity.rating.count > 0
            ? {

                aggregateRating: {

                    "@type":
                        "AggregateRating",

                    ratingValue:
                        entity.rating.average,

                    reviewCount:
                        entity.rating.count,

                },

            }

            : {}
        ),

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <main
            className="min-h-screen"
        >


            {/* =============================================
                JSON-LD
            ============================================= */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            jsonLd
                        ),
                }}
            />


            {/* =============================================
                CONTENT
            ============================================= */}

            <section
                className="
                    mx-auto
                    max-w-5xl
                    px-6
                    pt-36
                    pb-16
                "
            >
                {/* =========================================
                    MAIN CARD
                ========================================= */}

                <div
                    className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                    "
                >
                    <BusinessHero
                        name={entity.name}
                        category={entity.category}
                        subCategory={entity.subCategory}
                        image={entity.image}
                        coverImage={entity.coverImage}
                    />
                    <div
                        className="p-8"
                    >
                        {/* =================================
                            DESCRIPTION
                        ================================= */}

                        {entity.description && (

                            <p
                                className="
                                    mt-6
                                    text-base
                                    leading-7
                                    text-gray-700
                                "
                            >
                                {
                                    entity.description
                                }
                            </p>

                        )}


                        {/* =================================
                            BUSINESS INFO
                        ================================= */}

                        <div
                            className="
                                mt-8
                                grid
                                grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            "
                        >

                            {/* LOCATION */}

                            {entity.address && (

                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-4
                                    "
                                >

                                    <Ubicacion
                                        size={24}
                                        color="currentColor"
                                    />

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                font-medium
                                                uppercase
                                                tracking-wide
                                                text-gray-400
                                            "
                                        >
                                            Location
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                font-medium
                                                text-gray-800
                                            "
                                        >
                                            {
                                                entity.address
                                            }
                                        </p>

                                    </div>

                                </div>

                            )}


                            {/* CITY */}

                            {entity.cityId && (

                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-4
                                    "
                                >

                                    <Mundo
                                        size={24}
                                        color="currentColor"
                                    />

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                font-medium
                                                uppercase
                                                tracking-wide
                                                text-gray-400
                                            "
                                        >
                                            City
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                font-medium
                                                text-gray-800
                                            "
                                        >
                                            {
                                                entity.cityId
                                            }
                                        </p>

                                    </div>

                                </div>

                            )}


                            {/* COUNTRY */}

                            {entity.country && (

                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-4
                                    "
                                >

                                    <Mundo
                                        size={24}
                                        color="currentColor"
                                    />

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                font-medium
                                                uppercase
                                                tracking-wide
                                                text-gray-400
                                            "
                                        >
                                            Country
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                font-medium
                                                text-gray-800
                                            "
                                        >
                                            {
                                                entity.country
                                            }
                                        </p>

                                    </div>

                                </div>

                            )}


                            {/* PRICE */}

                            {entity.priceRange && (

                                <div
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-4
                                    "
                                >

                                    <Dolar
                                        size={24}
                                        color="currentColor"
                                    />

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                font-medium
                                                uppercase
                                                tracking-wide
                                                text-gray-400
                                            "
                                        >
                                            Price
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                font-medium
                                                text-gray-800
                                            "
                                        >
                                            {
                                                entity.priceRange
                                            }
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* =================================
                            EXTERNAL LINKS
                        ================================= */}

                        {(entity.website ||
                            entity.instagram ||
                            entity.whatsapp) && (

                            <div
                                className="
                                    mt-8
                                    flex
                                    flex-wrap
                                    gap-4
                                "
                            >


                                {/* =========================
                                    WEBSITE
                                ========================= */}

                                {entity.website && (

                                    <a
                                        href={
                                            entity.website
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-full
                                            border
                                            px-5
                                            py-2
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        Website
                                    </a>

                                )}


                                {/* =========================
                                    INSTAGRAM
                                ========================= */}

                                {entity.instagram && (

                                    <a
                                        href={
                                            entity.instagram
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-full
                                            border
                                            px-5
                                            py-2
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        Instagram
                                    </a>

                                )}


                                {/* =========================
                                    WHATSAPP
                                ========================= */}

                                {entity.whatsapp && (

                                    <a
                                        href={
                                            entity.whatsapp
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-full
                                            border
                                            px-5
                                            py-2
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        WhatsApp
                                    </a>

                                )}

                            </div>

                        )}
                        {entity.coordinates && (
                                <section className="mt-10">
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                        Location
                                    </h2>

                                    <div className="mt-4 overflow-hidden rounded-2xl">
                                        <LocationMapClient
                                            coordinates={[
                                                entity.coordinates.lng,
                                                entity.coordinates.lat,
                                            ]}
                                            address={entity.address}
                                            title={entity.name}
                                        />
                                    </div>
                                </section>
                            )}
                    </div>
                    

                </div>

            </section>

        </main>

    );

}