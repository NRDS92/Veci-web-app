"use client";

import { useEffect, useState } from "react";
import { getEvents } from "../services/admin.service";
import { AdminEvent } from "../types/event";

export function useEvents() {
    const [events, setEvents] = useState<AdminEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    return {
        events,
        loading,
    };
}