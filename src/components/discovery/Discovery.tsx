"use client";

import { useState } from "react";
import DiscoveryTabs from "./DiscoveryTabs";
import AllDiscovery from "./all/AllDiscovery";
import EventsDiscovery from "../events/EventsDiscovery";
import BusinessDiscovery from "../business/BusinessDiscovery";

export type DiscoveryType =
    | "all"
    | "events"
    | "business";

export default function Discovery() {
    const [activeType, setActiveType] =
        useState<DiscoveryType>("all");

    return (
        <section className="w-full">

            <DiscoveryTabs
                activeType={activeType}
                onChange={setActiveType}
            />

            <div className="mx-auto max-w-7xl px-6">

                {activeType === "all" && (
                    <AllDiscovery />
                )}

                {activeType === "events" && (
                    <EventsDiscovery />
                )}

                {activeType === "business" && (
                    <BusinessDiscovery />
                )}

            </div>
        </section>
    );
}