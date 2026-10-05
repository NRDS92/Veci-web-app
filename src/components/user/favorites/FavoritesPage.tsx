"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import EventCard from "@/components/events/EventCard";

import { userService } from "@/features/users/user.service";
import type { EventCardEvent } from "@/features/discover/discover.types";

export default function FavoritesPage() {
    const { user } = useAuth();

    const [favorites, setFavorites] = useState<
        EventCardEvent[]
    >([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!user) {
            return;
        }

        const loadFavorites = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await userService.getFavorites();

                setFavorites(
                    response.data.data
                );
            } catch (error: any) {
                console.error(
                    "FAVORITES ERROR:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                        "Unable to load your favorites."
                );
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [user]);

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-28 sm:px-6">

                <div className="mx-auto max-w-6xl">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="mb-8">

                        <div className="flex items-center gap-3">

                            <i className="fa-solid fa-heart text-xl text-[#FF7A00]" />

                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Your favorites
                            </h1>

                        </div>

                        <p className="mt-2 text-gray-500">
                            Events you saved to discover later.
                        </p>

                    </div>

                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (
                        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loading && (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {[1, 2, 3].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="h-80 animate-pulse rounded-3xl bg-gray-200"
                                    />
                                )
                            )}

                        </div>
                    )}

                    {/* =================================================
                        EMPTY
                    ================================================= */}

                    {!loading &&
                        !error &&
                        favorites.length === 0 && (
                            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                                    <i className="fa-regular fa-heart text-2xl text-[#FF7A00]" />
                                </div>

                                <h2 className="mt-5 text-xl font-semibold text-gray-900">
                                    No favorites yet
                                </h2>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                    Save events you want
                                    to remember and they
                                    will appear here.
                                </p>

                            </div>
                        )}

                    {/* =================================================
                        EVENTS
                    ================================================= */}

                    {!loading &&
                        favorites.length > 0 && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                                {favorites.map(
                                    (event) => (
                                        <div
                                            key={event._id}
                                            className="h-[320px]"
                                        >
                                            <EventCard
                                                event={event}
                                                variant="default"
                                            />
                                        </div>
                                    )
                                )}

                            </div>
                        )}

                </div>

            </main>
        </ProtectedRoute>
    );
}