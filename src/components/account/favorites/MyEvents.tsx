
"use client";

import Link from "next/link";

import { useMyEvents } from "../../../features/account/favorites/useMyEvents";

export default function MyEvents() {
    const {
        events,
        loading,
        error,
        refetch,
    } = useMyEvents();

    if (loading) {
        return (
            <section className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-900">
                    My Events
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="animate-pulse overflow-hidden rounded-2xl border border-gray-200"
                        >
                            <div className="h-44 bg-gray-200" />

                            <div className="space-y-3 p-4">
                                <div className="h-4 w-3/4 rounded bg-gray-200" />
                                <div className="h-3 w-1/2 rounded bg-gray-100" />
                                <div className="h-8 rounded bg-gray-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <i className="fa-solid fa-triangle-exclamation mb-3 text-2xl text-red-500" />

                <h2 className="font-semibold text-gray-900">
                    Couldn't load your events
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() => void refetch()}
                    className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                    Try again
                </button>
            </section>
        );
    }

    if (events.length === 0) {
        return (
            <section className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                    <i className="fa-regular fa-calendar-plus text-2xl text-orange-500" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                    My Events
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                    You haven't created any events yet. Share an
                    experience and bring the Latin community together.
                </p>

                <Link
                    href="/events/create"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF7A00] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    <i className="fa-solid fa-plus" />
                    Create an event
                </Link>
            </section>
        );
    }

    return (
        <section className="space-y-5 mt-25 px-30">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        My Events
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {events.length}{" "}
                        {events.length === 1 ? "event" : "events"} created
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => void refetch()}
                    aria-label="Refresh events"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                >
                    <i className="fa-solid fa-rotate-right" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                    const eventDate = new Date(event.dateStart);
                    const validDate = !Number.isNaN(
                        eventDate.getTime()
                    );

                    return (
                        <article
                            key={event._id}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="relative h-44 bg-gray-100">
                                {event.images?.[0] ? (
                                    <img
                                        src={event.images[0]}
                                        alt={event.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-400">
                                        <i className="fa-regular fa-image text-3xl" />
                                    </div>
                                )}

                                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-gray-700 shadow-sm">
                                    {event.category}
                                </span>

                                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-gray-700 shadow-sm">
                                    {event.eventType === "official"
                                        ? "Official"
                                        : "Community"}
                                </span>
                            </div>

                            <div className="space-y-3 p-4">
                                <h3 className="line-clamp-2 font-semibold text-gray-900">
                                    {event.title}
                                </h3>

                                <p className="flex items-start gap-2 text-sm text-gray-500">
                                    <i className="fa-solid fa-location-dot mt-1 text-orange-500" />

                                    <span className="line-clamp-2">
                                        {event.address}
                                    </span>
                                </p>

                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <i className="fa-regular fa-calendar text-orange-500" />

                                    {validDate
                                        ? eventDate.toLocaleDateString()
                                        : "Date unavailable"}
                                </p>

                                <div className="flex items-center gap-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
                                    <span>
                                        <i className="fa-regular fa-eye mr-1.5 text-orange-500" />
                                        {event.stats?.views ?? 0} views
                                    </span>

                                    <span>
                                        <i className="fa-solid fa-users mr-1.5 text-orange-500" />
                                        {event.stats?.attendees ?? 0} attendees
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    <Link
                                        href={
                                            event.slug
                                                ? `/events/${event.slug}`
                                                : `/events/${event._id}`
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <i className="fa-regular fa-eye" />
                                        View
                                    </Link>

                                    <Link
                                        href={`/events/edit/${event._id}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF7A00] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                                    >
                                        <i className="fa-solid fa-pen" />
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

