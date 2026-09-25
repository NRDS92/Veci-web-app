"use client";

import type { DiscoverEvent } from "../../features/discover/discover.types"
import EventCard from "./EventCard";

interface EventBentoProps {
    events: DiscoverEvent[];
}

export default function EventBento({
    events,
}: EventBentoProps) {
    if (!events.length) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">

            {/* Featured event */}

            {events[0] && (
                <div className="md:col-span-2 md:row-span-2">
                    <EventCard
                        event={events[0]}
                        variant="featured"
                    />
                </div>
            )}

            {/* Secondary event */}

            {events[1] && (
                <div className="md:col-span-2">
                    <EventCard
                        event={events[1]}
                        variant="default"
                    />
                </div>
            )}

            {/* Compact event */}

            {events[2] && (
                <EventCard
                    event={events[2]}
                    variant="compact"
                />
            )}

            {/* Compact event */}

            {events[3] && (
                <EventCard
                    event={events[3]}
                    variant="compact"
                />
            )}

        </div>
    );
}