"use client";

import EventCard from "../../components/events/EventCard";
import type {
    DiscoverEvent,
} from "../../features/discover/discover.types";
import { useDiscover } from "../../features/discover/useDiscover";

export default function EventsDiscovery() {
    const {
        data,
        isLoading,
        error,
    } = useDiscover({
        type: "events",
        page: 1,
        limit: 20,
    });

    const events =
        data?.recommended.filter(
            (item): item is DiscoverEvent =>
                item.type === "event"
        ) ?? [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="h-[420px] animate-pulse rounded-3xl bg-gray-200 md:col-span-2" />

                <div className="h-[420px] animate-pulse rounded-3xl bg-gray-200 md:col-span-1" />

                <div className="h-[420px] animate-pulse rounded-3xl bg-gray-200 md:col-span-1" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-gray-500">
                    No hay eventos disponibles.
                </p>
            </div>
        );
    }

    return (
    <div
        className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-4
            md:auto-rows-[280px]
            md:grid-flow-dense
        "
    >
        {events.map((event, index) => {

            const isFeatured =
                index === 0 ||
                index === 5 ||
                index === 10;

            return (
                <div
                    key={event._id}
                    className={
                        isFeatured
                            ? "md:col-span-2"
                            : "md:col-span-1"
                    }
                >
                    <EventCard
                        event={event}
                        variant={
                            isFeatured
                                ? "featured"
                                : "default"
                        }
                    />
                </div>
            );
        })}
    </div>
);
}