"use client";

import { useEffect, useState } from "react";
import {
    CalendarDays,
    Clock,
    Eye,
    Heart,
    MapPin,
    Share2,
    Users,
    Check,
} from "lucide-react";

interface EventHeroProps {
    eventId: string;
    title: string;
    category: string;
    cityId: string;
    address?: string;
    dateStart: string;
    image?: string;
    initialViews?: number;
    initialAttendees?: number;
}

interface AttendResponse {
    success?: boolean;
    data?: {
        attendees?: number;
        stats?: {
            attendees?: number;
        };
    };
    message?: string;
}

interface ViewResponse {
    success?: boolean;
    data?: {
        views?: number;
        stats?: {
            views?: number;
        };
    };
}

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://veci-api-pm1e.onrender.com/api/v1";

export default function EventHero({
    eventId,
    title,
    category,
    cityId,
    address,
    dateStart,
    image,
    initialViews = 0,
    initialAttendees = 0,
}: EventHeroProps) {
    const [views, setViews] = useState(initialViews);
    const [attendees, setAttendees] = useState(initialAttendees);
    const [isAttending, setIsAttending] = useState(false);
    const [isAttendingLoading, setIsAttendingLoading] = useState(false);
    const [attendError, setAttendError] = useState<string | null>(null);

    /*
     * Track event view
     */
    useEffect(() => {
        let cancelled = false;

        const trackView = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/events/${eventId}/view`,
                    {
                        method: "POST",
                    }
                );

                if (!response.ok) {
                    return;
                }

                const data: ViewResponse = await response.json();

                const updatedViews =
                    data.data?.views ??
                    data.data?.stats?.views;

                if (
                    !cancelled &&
                    typeof updatedViews === "number"
                ) {
                    setViews(updatedViews);
                }
            } catch (error) {
                console.error(
                    "Failed to track event view:",
                    error
                );
            }
        };

        trackView();

        return () => {
            cancelled = true;
        };
    }, [eventId]);

    /*
     * Attend event
     */
    const handleAttend = async () => {
        if (isAttendingLoading || isAttending) {
            return;
        }

        setIsAttendingLoading(true);
        setAttendError(null);

        try {
            const response = await fetch(
                `${API_URL}/events/${eventId}/attend`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data: AttendResponse =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Unable to attend this event."
                );
            }

            const updatedAttendees =
                data.data?.attendees ??
                data.data?.stats?.attendees;

            if (typeof updatedAttendees === "number") {
                setAttendees(updatedAttendees);
            } else {
                setAttendees((prev) => prev + 1);
            }

            setIsAttending(true);
        } catch (error) {
            console.error(
                "Failed to attend event:",
                error
            );

            setAttendError(
                error instanceof Error
                    ? error.message
                    : "Unable to attend this event."
            );
        } finally {
            setIsAttendingLoading(false);
        }
    };

    /*
     * Share
     */
    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(
                window.location.href
            );
        } catch (error) {
            console.error(
                "Failed to copy event URL:",
                error
            );
        }
    };

    /*
     * Date
     */
    const eventDate = new Date(dateStart);

    const formattedDate = eventDate.toLocaleDateString(
        "de-DE",
        {
            weekday: "short",
            day: "2-digit",
            month: "short",
        }
    );

    const formattedTime = eventDate.toLocaleTimeString(
        "de-DE",
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    return (
        <section className="w-full">
            {/* =====================================================
                HERO IMAGE
            ====================================================== */}

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="
                            aspect-[16/7]
                            w-full
                            object-cover
                            object-center
                            md:aspect-[16/6]
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            aspect-[16/7]
                            w-full
                            items-center
                            justify-center
                            bg-gray-100
                            md:aspect-[16/6]
                        "
                    >
                        <p className="text-sm text-gray-500">
                            No event image available
                        </p>
                    </div>
                )}

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />

                {/* Top actions */}
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() =>
                            window.history.back()
                        }
                        className="
                            rounded-full
                            border
                            border-white/30
                            bg-black/30
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-white
                            backdrop-blur-md
                            transition
                            hover:bg-black/50
                        "
                    >
                        ← Volver a eventos
                    </button>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            aria-label="Compartir evento"
                            onClick={handleShare}
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/30
                                bg-black/30
                                text-white
                                backdrop-blur-md
                                transition
                                hover:bg-black/50
                            "
                        >
                            <Share2 size={16} />
                        </button>

                        <button
                            type="button"
                            aria-label="Guardar evento"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/30
                                bg-black/30
                                text-white
                                backdrop-blur-md
                                transition
                                hover:bg-black/50
                            "
                        >
                            <Heart size={16} />
                        </button>
                    </div>
                </div>

                {/* Hero information */}
                <div className="absolute bottom-5 left-5 right-5 text-white md:bottom-7 md:left-7">
                    <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#F2C94C] px-3 py-1 text-xs font-bold uppercase text-[#111827]">
                            {category}
                        </span>
                    </div>

                    <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                        {title}
                    </h1>

                    <p className="mt-2 text-sm text-white/90 md:text-base">
                        Música en vivo, cultura y comunidad latina.
                    </p>
                </div>
            </div>

            {/* =====================================================
                EVENT META / ACTION BAR
            ====================================================== */}

            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
                {/* Date */}
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2C94C]/20 text-[#111827]">
                        <CalendarDays size={19} />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            Fecha
                        </p>

                        <p className="text-sm font-semibold capitalize">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <MapPin size={19} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-500">
                            Ubicación
                        </p>

                        <p className="truncate text-sm font-semibold">
                            {cityId}
                        </p>

                        {address && (
                            <p className="truncate text-xs text-gray-500">
                                {address}
                            </p>
                        )}
                    </div>
                </div>

                {/* Views / attendees */}
                <div className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                        <Eye
                            size={18}
                            className="text-gray-500"
                        />

                        <div>
                            <p className="text-sm font-bold">
                                {views}
                            </p>

                            <p className="text-xs text-gray-500">
                                visitas
                            </p>
                        </div>
                    </div>

                    <div className="h-8 w-px bg-gray-200" />

                    <div className="flex items-center gap-2">
                        <Users
                            size={18}
                            className="text-gray-500"
                        />

                        <div>
                            <p className="text-sm font-bold">
                                {attendees}
                            </p>

                            <p className="text-xs text-gray-500">
                                asistentes
                            </p>
                        </div>
                    </div>
                </div>

                {/* Attend */}
                <button
                    type="button"
                    disabled={
                        isAttendingLoading ||
                        isAttending
                    }
                    onClick={handleAttend}
                    className={`
                        flex
                        min-h-[72px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-6
                        text-sm
                        font-bold
                        shadow-sm
                        transition
                        ${
                            isAttending
                                ? "bg-green-100 text-green-700"
                                : "bg-[#F2C94C] text-[#111827] hover:bg-[#f5d45e]"
                        }
                    `}
                >
                    {isAttending ? (
                        <>
                            <Check size={18} />
                            ¡Asistiré!
                        </>
                    ) : (
                        <>
                            <Users size={18} />
                            {isAttendingLoading
                                ? "Guardando..."
                                : "¡Asistiré!"}
                        </>
                    )}
                </button>
            </div>

            {/* Attend error */}
            {attendError && (
                <p className="mt-2 text-right text-xs text-red-500">
                    {attendError}
                </p>
            )}
        </section>
    );
}