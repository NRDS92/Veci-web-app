
"use client";

import { useCallback, useEffect, useState } from "react";

import { accountService } from "./account.service";
import type { MyBusiness } from "./account.types";
import { getAccountErrorMessage } from "./account.utils";

export const useMyBusinesses = () => {
    const [businesses, setBusinesses] = useState<MyBusiness[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBusinesses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await accountService.getMyBusinesses();
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
    }, []);

    useEffect(() => {
        void fetchBusinesses();
    }, [fetchBusinesses]);

    return {
        businesses,
        loading,
        error,
        refetch: fetchBusinesses,
    };
};
