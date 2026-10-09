
"use client";

import Link from "next/link";

import { useMyFavorites } from "@/features/account/favorites/useMyFavorites";

export default function MyFavorites() {
    const {
        favorites,
        loading,
        error,
        refetch,
    } = useMyFavorites();

    if (loading) {
        return (
            <section className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-900">
                    My Favorites
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="animate-pulse rounded-2xl border border-gray-200 p-4"
                        >
                            <div className="mb-4 h-40 rounded-xl bg-gray-200" />
                            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                            <div className="h-3 w-1/2 rounded bg-gray-100" />
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
                    Couldn't load your favorites
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

    if (favorites.length === 0) {
        return (
            <section className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                    <i className="fa-regular fa-heart text-2xl text-orange-500" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                    My Favorites
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                    You haven't saved any events yet. Explore the
                    community and save the events you don't want to miss.
                </p>

                <Link
                    href="/events"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF7A00] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    <i className="fa-solid fa-compass" />
                    Explore events
                </Link>
            </section>
        );
    }

    return (
        <section className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        My Favorites
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {favorites.length} saved{" "}
                        {favorites.length === 1 ? "event" : "events"}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => void refetch()}
                    aria-label="Refresh favorites"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                >
                    <i className="fa-solid fa-rotate-right" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((event) => {
                    const image = event.images?.[0];

                    return (
                        <article
                            key={event._id}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <Link
                                href={
                                    event.slug
                                        ? `/events/${event.slug}`
                                        : `/events/${event._id}`
                                }
                                className="block"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    {image ? (
                                        <img
                                            src={image}
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

                                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm">
                                        <i className="fa-solid fa-heart" />
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
                                        {new Date(
                                            event.dateStart
                                        ).toLocaleDateString()}
                                    </p>

                                    {event.businessId &&
                                        typeof event.businessId !== "string" && (
                                            <p className="truncate border-t border-gray-100 pt-3 text-xs text-gray-500">
                                                <i className="fa-solid fa-store mr-2 text-orange-500" />
                                                {event.businessId.name}
                                            </p>
                                        )}
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

