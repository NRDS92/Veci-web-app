"use client";

import { useEffect, useState } from "react";

import {
    discoverService,
} from "./discover.service";

import {
    DiscoverData,
    DiscoverQuery,
} from "./discover.types";

export function useDiscover(
    params: DiscoverQuery = {}
) {
    const [data, setData] =
        useState<DiscoverData | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        let cancelled = false;

        const fetchDiscovery = async () => {

            try {

                setIsLoading(true);
                setError(null);

                const response =
                    await discoverService.getDiscoverFeed(
                        params
                    );

                if (cancelled) return;

                if (response.data.success) {

                    setData(
                        response.data.data
                    );

                } else {

                    setError(
                        "Failed to load discovery"
                    );

                }

            } catch (error) {

                if (cancelled) return;

                console.error(
                    "DISCOVER ERROR:",
                    error
                );

                setError(
                    "Failed to load discovery"
                );

            } finally {

                if (!cancelled) {
                    setIsLoading(false);
                }

            }
        };

        fetchDiscovery();

        return () => {
            cancelled = true;
        };

    }, [
        params.type,
        params.city,
        params.category,
        params.excludeCategory,
        params.search,
        params.date,
        params.lat,
        params.lng,
        params.page,
        params.limit,
    ]);

    return {
        data,
        isLoading,
        error,
    };
}