
"use client";

import { useCallback, useEffect, useState } from "react";

import { accountService } from "./account.service";
import type { MyEvent } from "./account.types";
import { getAccountErrorMessage } from "./account.utils";

export const useMyEvents = () => {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await accountService.getMyEvents();
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
    }, []);

    useEffect(() => {
        void fetchEvents();
    }, [fetchEvents]);

    return {
        events,
        loading,
        error,
        refetch: fetchEvents,
    };
};

