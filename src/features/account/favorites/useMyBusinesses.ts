
"use client";

import { useCallback, useEffect, useState } from "react";

import { accountService } from "./account.service";
import type { MyBusiness } from "./account.types";
import { getAccountErrorMessage } from "./account.utils";

export const useMyBusinesses = () => {
    const [businesses, setBusinesses] = useState<MyBusiness[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ======================================================
    // LOAD BUSINESSES
    // Responsible only for fetching data.
    // ======================================================

    const loadBusinesses = useCallback(async (): Promise<MyBusiness[]> => {
        return await accountService.getMyBusinesses();
    }, []);

    // ======================================================
    // INITIAL DATA FETCH
    // ======================================================

    useEffect(() => {
        let active = true;

        loadBusinesses()
            .then((data) => {
                if (!active) return;

                setBusinesses(data);
                setError(null);
            })
            .catch((err: unknown) => {
                if (!active) return;

                setError(
                    getAccountErrorMessage(
                        err,
                        "Failed to load businesses."
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
    }, [loadBusinesses]);

    // ======================================================
    // REFETCH
    // Allows consumers to manually reload businesses.
    // ======================================================

    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await loadBusinesses();

            setBusinesses(data);
        } catch (err: unknown) {
            setError(
                getAccountErrorMessage(
                    err,
                    "Failed to load businesses."
                )
            );
        } finally {
            setLoading(false);
        }
    }, [loadBusinesses]);

    return {
        businesses,
        loading,
        error,
        refetch,
    };
};
