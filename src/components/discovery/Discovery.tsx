
"use client";

import { useState } from "react";

import DiscoveryTabs from "./DiscoveryTabs";
import AllDiscovery from "./all/AllDiscovery";
import EventsDiscovery from "../events/EventsDiscovery";
import BusinessDiscovery from "../business/BusinessDiscovery";

import type { DiscoverFilters } from "../../features/discover/discover.types";
import type { LocationData } from "@/features/location/location.types";

export type DiscoveryType = "all" | "events" | "business";

export default function Discovery() {
    const [activeType, setActiveType] =
        useState<DiscoveryType>("all");

    const [location, setLocation] =
        useState<LocationData | null>(null);

    const [date, setDate] = useState("");
    const [category, setCategory] = useState("all");

    const filters: DiscoverFilters = {
        city: location?.city || undefined,
        date: date || undefined,
        category: category === "all" ? undefined : category,
    };

    return (
        <section
            id="discovery"
            aria-label="Descubrir eventos y negocios"
            className="w-full min-w-0"
            >
            <DiscoveryTabs
                activeType={activeType}
                onChange={setActiveType}
                location={location}
                onLocationChange={setLocation}
                date={date}
                onDateChange={setDate}
                category={category}
                onCategoryChange={setCategory}
            />
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {activeType === "all" && (
                    <AllDiscovery filters={filters} />
                )}
                {activeType === "events" && (
                    <EventsDiscovery filters={filters} />
                )}
                {activeType === "business" && (
                    <BusinessDiscovery filters={filters} />
                )}
            </div>
        </section>
    );
}
