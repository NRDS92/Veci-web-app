"use client";

import { Link } from "@/i18n/navigation";
import type { DiscoverEvent } from "../../features/discover/discover.types";

interface EventCardProps {
    event: DiscoverEvent;
    variant?: "featured" | "default" | "compact";
}

export default function EventCard({
    event,
    variant = "default",
}: EventCardProps) {
    const image = event.images?.[0];

    const date = event.dateStart
        ? new Date(event.dateStart)
        : null;

    const formattedDate = date
        ? date.toLocaleDateString("es-DE", {
            day: "numeric",
            month: "short",
        })
        : null;

    const formattedTime = date
        ? date.toLocaleTimeString("es-DE", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;

    return (
        <Link
            href={`/events/${event.slug}`}
            
            className={[
                "group relative block h-full overflow-hidden rounded-3xl",
                "bg-gray-200 shadow-sm",
                "transition duration-300 hover:-translate-y-1 hover:shadow-xl",
            ].join(" ")}
        >
            {/* Image */}

            {image ? (
                <img
                    src={image}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 bg-gray-200" />
            )}

            {/* Gradient */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Content */}

            <div className="relative flex h-full flex-col justify-end p-5 text-white">

                {/* Category */}

                {event.category && (
                    <span className="mb-3 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                        {event.category}
                    </span>
                )}

                {/* Title */}

                <h3
                    className={
                        variant === "featured"
                            ? "text-2xl font-bold leading-tight"
                            : "text-lg font-bold leading-tight"
                    }
                >
                    {event.title}
                </h3>

                {/* Meta */}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/85">

                    {formattedDate && (
                        <span>
                            📅 {formattedDate}
                        </span>
                    )}

                    {formattedTime && (
                        <span>
                            🕐 {formattedTime}
                        </span>
                    )}

                    {event.cityId && (
                        <span>
                            📍 {event.cityId}
                        </span>
                    )}

                </div>

            </div>
        </Link>
    );
}