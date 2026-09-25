"use client";

import BusinessCard from "../../components/business/BusinessCard";
import type {
    DiscoverBusiness,
} from "../../features/discover/discover.types";
import { useDiscover } from "../../features/discover/useDiscover";

export default function BusinessDiscovery() {
    const {
        data,
        isLoading,
        error,
    } = useDiscover({
        type: "business",
        page: 1,
        limit: 20,
    });

    const businesses =
        data?.recommended.filter(
            (item): item is DiscoverBusiness =>
                item.type === "business"
        ) ?? [];

    if (isLoading) {
        return (
            <div className="space-y-4">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="h-[420px] animate-pulse rounded-3xl bg-gray-200 md:col-span-2" />

                    <div className="h-[280px] animate-pulse rounded-3xl bg-gray-200" />

                    <div className="h-[280px] animate-pulse rounded-3xl bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="h-[280px] animate-pulse rounded-3xl bg-gray-200" />

                    <div className="h-[420px] animate-pulse rounded-3xl bg-gray-200 md:col-span-2" />

                    <div className="h-[280px] animate-pulse rounded-3xl bg-gray-200" />
                </div>

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

    if (businesses.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-gray-500">
                    No hay negocios disponibles.
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
        {businesses.map((business, index) => {

            const isFeatured =
                index === 0 ||
                index === 5 ||
                index === 10;

            return (
                <div
                    key={business._id}
                    className={
                        isFeatured
                            ? "md:col-span-2"
                            : "md:col-span-1"
                    }
                >
                    <BusinessCard
                        business={business}
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