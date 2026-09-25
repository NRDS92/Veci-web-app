"use client";

import { useDiscover } from "../../../features/discover/useDiscover";
import EventBento from "../../../components/events/EventBento";
import type { DiscoverEvent } from "../../../features/discover/discover.types";

export default function AllEventsSection() {
    const {
        data,
        isLoading,
        error,
    } = useDiscover({
        type: "events",
        page: 1,
        limit: 6,
    });
    console.log("📦 DISCOVER EVENTS RESPONSE:", data);
    if (isLoading) {
        return (
            <section>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#111827]">
                        Eventos cerca de ti
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-64 animate-pulse rounded-2xl bg-gray-200"
                        />
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <h2 className="mb-6 text-2xl font-bold text-[#111827]">
                    Eventos cerca de ti
                </h2>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
                    No pudimos cargar los eventos.
                </div>
            </section>
        );
    }

    const events = (data?.recommended ?? []).filter(
        (item): item is DiscoverEvent => item.type === "event"
    );

    if (events.length === 0) {
        return (
            <section>
                <h2 className="mb-6 text-2xl font-bold text-[#111827]">
                    Eventos cerca de ti
                </h2>

                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                    <p className="text-gray-500">
                        No hay eventos disponibles en este momento.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#111827]">
                        Eventos cerca de ti
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Descubre lo que está pasando en tu comunidad.
                    </p>
                </div>
            </div>

            <EventBento events={events} />
        </section>
    );
}