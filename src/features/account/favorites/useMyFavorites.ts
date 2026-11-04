
"use client";

import { useCallback, useEffect, useState } from "react";

import { accountService } from "./account.service";
import type { FavoriteEvent } from "./account.types";
import { getAccountErrorMessage } from "./account.utils";

export const useMyFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ======================================================
    // LOAD FAVORITES
    // Responsible only for fetching data.
    // ======================================================

    const loadFavorites = useCallback(async (): Promise<FavoriteEvent[]> => {
        return await accountService.getMyFavorites();
    }, []);

    // ======================================================
    // INITIAL DATA FETCH
    // ======================================================

    useEffect(() => {
        let active = true;

        loadFavorites()
            .then((data) => {
                if (!active) return;

                setFavorites(data);
                setError(null);
            })
            .catch((err: unknown) => {
                if (!active) return;

                setError(
                    getAccountErrorMessage(
                        err,
                        "Failed to load favorites."
                    )
                );
            })
            .finally(() => {
                if (!active) return;

                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [loadFavorites]);

    // ======================================================
    // REFETCH
    // Allows consumers to manually reload favorites.
    // ======================================================

    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await loadFavorites();

            setFavorites(data);
        } catch (err: unknown) {
            setError(
                getAccountErrorMessage(
                    err,
                    "Failed to load favorites."
                )
            );
        } finally {
            setLoading(false);
        }
    }, [loadFavorites]);

    return {
        favorites,
        loading,
        error,
        refetch,
    };
};
