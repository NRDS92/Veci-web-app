"use client";

import { Link } from "@/i18n/navigation";
import type { DiscoverBusiness } from "../../features/discover/discover.types";

interface BusinessCardProps {
    business: DiscoverBusiness;
    variant?: "featured" | "default" | "compact";
}

export default function BusinessCard({
    business,
    variant = "default",
}: BusinessCardProps) {

    const image =
        business.images?.cover ||
        business.images?.profile;

    const rating = business.rating?.average;

    const reviewsCount = business.rating?.count;

    const location =
        business.location?.cityId ||
        business.location?.address;

    return (
        <Link
            href={`/business/${business.slug}`}
            className={[
                "group relative block h-full min-h-[200px]",
                "overflow-hidden rounded-3xl bg-gray-200",
                "shadow-sm transition duration-300",
                "hover:-translate-y-1 hover:shadow-xl",

                variant === "featured"
                    ? "min-h-[420px]"
                    : variant === "compact"
                        ? "min-h-[200px]"
                        : "min-h-[280px]",
            ].join(" ")}
        >

            {/* Image */}

            {image ? (
                <img
                    src={image}
                    alt={business.name}
                    className="
                        absolute inset-0
                        h-full w-full
                        object-cover
                        transition duration-500
                        group-hover:scale-105
                    "
                />
            ) : (
                <div className="absolute inset-0 bg-gray-200" />
            )}

            {/* Gradient */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Content */}

            <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-5 text-white">

                {/* Category */}

                {business.category && (
                    <span className="mb-3 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                        {business.category}
                    </span>
                )}

                {/* Name */}

                <h3
                    className={
                        variant === "featured"
                            ? "text-2xl font-bold leading-tight"
                            : "text-lg font-bold leading-tight"
                    }
                >
                    {business.name}
                </h3>

                {/* Description */}

                {variant !== "compact" &&
                    business.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-white/80">
                            {business.description}
                        </p>
                    )}

                {/* Meta */}

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">

                    {rating !== undefined && (
                        <span>
                            ⭐ {rating.toFixed(1)}
                        </span>
                    )}

                    {reviewsCount !== undefined && (
                        <span>
                            {reviewsCount} reseñas
                        </span>
                    )}

                    {location && (
                        <span>
                            📍 {location}
                        </span>
                    )}

                </div>

            </div>

        </Link>
    );
}