
"use client";

import { useCallback, useEffect, useState } from "react";

import { accountService } from "./account.service";
import type { FavoriteEvent } from "./account.types";
import { getAccountErrorMessage } from "./account.utils";

export const useMyFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFavorites = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await accountService.getMyFavorites();
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
    }, []);

    useEffect(() => {
        void fetchFavorites();
    }, [fetchFavorites]);

    return {
        favorites,
        loading,
        error,
        refetch: fetchFavorites,
    };
};

