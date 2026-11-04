
"use client";

import { useCallback, useEffect, useState } from "react";

import { accountService } from "./account.service";
import type { MyEvent } from "./account.types";
import { getAccountErrorMessage } from "./account.utils";

export const useMyEvents = () => {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ======================================================
    // LOAD EVENTS
    // Responsible only for fetching data.
    // ======================================================

    const loadEvents = useCallback(async (): Promise<MyEvent[]> => {
        return accountService.getMyEvents();
    }, []);

    // ======================================================
    // INITIAL DATA FETCH
    // ======================================================

    useEffect(() => {
        let active = true;

        loadEvents()
            .then((data) => {
                if (!active) return;

                setEvents(data);
                setError(null);
            })
            .catch((err: unknown) => {
                if (!active) return;

                setError(
                    getAccountErrorMessage(
                        err,
                        "Failed to load events."
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
    }, [loadEvents]);

    // ======================================================
    // REFETCH
    // Allows consumers to manually reload events.
    // ======================================================

    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await loadEvents();

            setEvents(data);
        } catch (err: unknown) {
            setError(
                getAccountErrorMessage(
                    err,
                    "Failed to load events."
                )
            );
        } finally {
            setLoading(false);
        }
    }, [loadEvents]);

    return {
        events,
        loading,
        error,
        refetch,
    };
};
