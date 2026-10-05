import type { Metadata } from "next";
import {
    getPublicBusinessContentBySlug,
} from "@/lib/api/public-content";
import BusinessHero from "@/components/business/businessPublicPage/BusinessHero";
import BusinessActions from "@/components/business/businessPublicPage/BusinessActions";
import BusinessOverview from "@/components/business/businessPublicPage/BusinessOverview";
import BusinessDetails from "@/components/business/businessPublicPage/BusinessDetails";
import BusinessMedia from "@/components/business/businessPublicPage/BusinessMedia";
import BusinessLocation from "@/components/business/businessPublicPage/BusinessLocation";
import BusinessAvailabilityCard from "@/components/business/businessPublicPage/BusinessAvailabilityCard";
import BusinessCommunity from "@/components/business/businessPublicPage/BusinessCommunity";
import BusinessInformation from "@/components/business/businessPublicPage/BusinessInformation";

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
            title: "Business not found | VECI",

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
            url: canonical,
            type: "website",
            siteName: "VECI",

            ...(image
                ? {
                      images: [
                          {
                              url: image,
                              alt: entity.name,
                          },
                      ],
                  }
                : {}),
        },

        twitter: {
            card: image
                ? "summary_large_image"
                : "summary",

            title,
            description,

            ...(image
                ? {
                      images: [image],
                  }
                : {}),
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

    /* =====================================================
       NOT FOUND
    ===================================================== */

    if (!content) {
        return (
            <main className="min-h-screen">
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
                            text-gray-900
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
            : {}),

        url:
            publication.canonicalUrl ||
            `https://veci-latin.com/business/${entity.slug}`,

        ...(entity.image
            ? {
                  image:
                      entity.image,
              }
            : {}),

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
                          : {}),

                      ...(entity.cityId
                          ? {
                                addressLocality:
                                    entity.cityId,
                            }
                          : {}),

                      ...(entity.country
                          ? {
                                addressCountry:
                                    entity.country,
                            }
                          : {}),
                  },
              }
            : {}),

        ...(sameAs.length > 0
            ? {
                  sameAs,
              }
            : {}),

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
            : {}),
    };

    return (
        <main className="min-h-screen">

            {/* =================================================
                JSON-LD
            ================================================= */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            jsonLd
                        ),
                }}
            />

            {/* =================================================
                PAGE CONTAINER
            ================================================= */}

            <section
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    pt-32
                    pb-16
                    sm:px-6
                    lg:px-8
                "
            >

                {/* =================================================
                    HERO
                ================================================= */}

                <BusinessHero
                    name={entity.name}
                    category={entity.category}
                    subCategory={
                        entity.subCategory
                    }
                    image={entity.image}
                    coverImage={
                        entity.coverImage
                    }
                />
                {/* =================================================
                    ACTIONS
                ================================================= */}

                <BusinessActions
                    website={entity.website}
                    instagram={entity.instagram}
                    whatsapp={entity.whatsapp}
                    documents={entity.documents}
                    likesCount={entity.likesCount}
                />
                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div
                    className="
                        mt-8
                        grid
                        gap-8
                        lg:grid-cols-[minmax(0,1fr)_320px]
                    "
                >
                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}
                    <div className="space-y-8">
                        <BusinessOverview
                            description={entity.description}
                            headline={entity.profile?.headline}
                            isLatinoOwned={entity.isLatinoOwned}
                            countryOfOrigin={entity.countryOfOrigin}
                        />
                        <BusinessDetails
                            services={entity.profile?.services}
                            specialties={entity.profile?.specialties}
                            languages={entity.profile?.languages}
                            serviceArea={entity.profile?.serviceArea}
                        />
                        <BusinessMedia
                            gallery={entity.gallery}
                            documents={entity.documents}
                        />
                        <BusinessLocation
                            address={entity.address}
                            cityId={entity.cityId}
                            country={entity.country}
                            coordinates={entity.coordinates}
                            title={entity.name}
                        />                     
                    </div>
                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================= */}
                    <aside
                        className="
                            space-y-6
                            lg:sticky
                            lg:top-24
                            lg:self-start
                        "
                    >
                        <BusinessAvailabilityCard
                                openingHours={
                                    entity.profile?.openingHours
                                }
                            />
                        <BusinessCommunity
                                rating={entity.rating}
                                likesCount={entity.likesCount}
                                followersCount={entity.followersCount}
                                eventsCount={entity.eventsCount}
                            />
                        <BusinessInformation
                                category={entity.category}
                                subCategory={entity.subCategory}
                                tags={entity.tags}
                                availability={entity.profile?.availability}
                            />
                    </aside>
                </div>
            </section>
        </main>
    );
}