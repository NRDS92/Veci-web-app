"use client";

import type { DiscoverBusiness } from "../../features/discover/discover.types";
import BusinessCard from "./BusinessCard";

interface BusinessBentoProps {
    businesses: DiscoverBusiness[];
}

export default function BusinessBento({
    businesses,
}: BusinessBentoProps) {
    if (!businesses.length) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">

            {/* Featured business */}

            {businesses[0] && (
                <div className="md:col-span-2 md:row-span-2">
                    <BusinessCard
                        business={businesses[0]}
                        variant="featured"
                    />
                </div>
            )}

            {/* Secondary business */}

            {businesses[1] && (
                <div className="md:col-span-2">
                    <BusinessCard
                        business={businesses[1]}
                        variant="default"
                    />
                </div>
            )}

            {/* Compact business */}

            {businesses[2] && (
                <BusinessCard
                    business={businesses[2]}
                    variant="compact"
                />
            )}

            {/* Compact business */}

            {businesses[3] && (
                <BusinessCard
                    business={businesses[3]}
                    variant="compact"
                />
            )}

        </div>
    );
}