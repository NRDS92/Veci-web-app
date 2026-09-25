"use client";

import { useState } from "react";
import DiscoveryTabs from "./DiscoveryTabs";
import AllDiscovery from "./all/AllDiscovery";

export type DiscoveryType =
    | "all"
    | "events"
    | "business";

export default function Discovery() {
    const [activeType, setActiveType] =
        useState<DiscoveryType>("all");
    return (
        <section className="w-full">
            {/* Main navigation */}
            <DiscoveryTabs
                activeType={activeType}
                onChange={setActiveType}
            />
            {/* Discovery content */}
            <div className="mx-auto max-w-7xl px-6">
                {activeType === "all" && (
                    <AllDiscovery />
                )}
                {activeType === "events" && (
                    <div>EVENTS</div>
                )}
                {activeType === "business" && (
                    <div>BUSINESS</div>
                )}
            </div>
        </section>
    );
}