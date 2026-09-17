"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Link } from "@/i18n/navigation";
import type { PublicEvent } from "@/lib/api/public-content";


interface EventHeroCarouselProps {
    events: PublicEvent[];
}


export default function EventHeroCarousel({
    events,
}: EventHeroCarouselProps) {

    const eventsWithImages = events.filter(
        (event) =>
            typeof event.image === "string" &&
            event.image.trim().length > 0
    );


    const [currentIndex, setCurrentIndex] =
        useState(0);


    /*
     * ==================================================
     * AUTOPLAY
     * ==================================================
     */

    useEffect(() => {

        if (eventsWithImages.length <= 1) {
            return;
        }


        const interval =
            window.setInterval(() => {

                setCurrentIndex(
                    (current) =>
                        (current + 1) %
                        eventsWithImages.length
                );

            }, 5000);


        return () => {
            window.clearInterval(interval);
        };

    }, [eventsWithImages.length]);


    /*
     * ==================================================
     * EMPTY STATE
     * ==================================================
     */

    if (eventsWithImages.length === 0) {

        return (
            <div
                className="
                    flex
                    aspect-[4/5]
                    w-full
                    items-center
                    justify-center
                    rounded-[2rem]
                    border
                    border-gray-200
                    bg-gray-50
                    text-sm
                    text-gray-400
                "
            >
                No hay imágenes de eventos
            </div>
        );

    }


    /*
     * ==================================================
     * CURRENT EVENT
     * ==================================================
     */

    const event =
        eventsWithImages[
            currentIndex %
            eventsWithImages.length
        ];


    /*
     * ==================================================
     * NAVIGATION
     * ==================================================
     */

    const previousEvent = () => {

        setCurrentIndex(
            (current) => {

                if (current === 0) {
                    return (
                        eventsWithImages.length - 1
                    );
                }

                return current - 1;

            }
        );

    };


    const nextEvent = () => {

        setCurrentIndex(
            (current) =>
                (
                    current + 1
                ) %
                eventsWithImages.length
        );

    };


    /*
     * ==================================================
     * RENDER
     * ==================================================
     */

    return (

        <div
            className="
                relative
                w-full
            "
        >


            {/* ==========================================
                IMAGE
            ========================================== */}

            <div
                className="
                    relative
                    aspect-[4/5]
                    w-full
                    overflow-hidden
                    rounded-[2rem]
                    bg-gray-100
                "
            >

                <AnimatePresence
                    mode="wait"
                >

                    <motion.img
                        key={event.id}
                        src={event.image}
                        alt={event.title}
                        initial={{
                            opacity: 0,
                            scale: 1.03,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.02,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />

                </AnimatePresence>


                {/* ======================================
                    GRADIENT
                ====================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-1/2
                        bg-gradient-to-t
                        from-black/85
                        via-black/30
                        to-transparent
                    "
                />


                {/* ======================================
                    EVENT INFORMATION
                ====================================== */}

                <div
                    className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-7
                        text-white
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-white/70
                        "
                    >
                        {event.category}
                    </p>


                    <Link
                        href={`/events/${event.slug}`}
                        className="
                            block
                            transition
                            hover:opacity-80
                        "
                    >

                        <h2
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                md:text-3xl
                            "
                        >
                            {event.title}
                        </h2>

                    </Link>


                    <div
                        className="
                            mt-4
                            flex
                            flex-col
                            gap-1
                            text-sm
                            text-white/80
                        "
                    >

                        <span>
                            📍 {event.cityId}
                        </span>


                        <span>
                            📅{" "}
                            {new Date(
                                event.dateStart
                            ).toLocaleDateString(
                                "es-ES",
                                {
                                    dateStyle: "medium",
                                }
                            )}
                        </span>

                    </div>

                </div>


                {/* ======================================
                    PREVIOUS
                ====================================== */}

                {eventsWithImages.length > 1 && (

                    <button
                        type="button"
                        onClick={previousEvent}
                        aria-label="Evento anterior"
                        className="
                            absolute
                            left-4
                            top-1/2
                            flex
                            h-11
                            w-11
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-white/90
                            text-lg
                            text-gray-900
                            shadow-lg
                            backdrop-blur
                            transition
                            hover:scale-105
                            hover:bg-white
                        "
                    >
                        ←
                    </button>

                )}


                {/* ======================================
                    NEXT
                ====================================== */}

                {eventsWithImages.length > 1 && (

                    <button
                        type="button"
                        onClick={nextEvent}
                        aria-label="Siguiente evento"
                        className="
                            absolute
                            right-4
                            top-1/2
                            flex
                            h-11
                            w-11
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-white/90
                            text-lg
                            text-gray-900
                            shadow-lg
                            backdrop-blur
                            transition
                            hover:scale-105
                            hover:bg-white
                        "
                    >
                        →
                    </button>

                )}

            </div>


            {/* ==========================================
                DOTS
            ========================================== */}

            {eventsWithImages.length > 1 && (

                <div
                    className="
                        mt-5
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >

                    {eventsWithImages.map(
                        (item, index) => (

                            <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                    setCurrentIndex(index)
                                }
                                aria-label={`Mostrar ${item.title}`}
                                className={`
                                    h-2
                                    rounded-full
                                    transition-all
                                    duration-300
                                    ${
                                        index === currentIndex
                                            ? "w-8 bg-gray-900"
                                            : "w-2 bg-gray-300"
                                    }
                                `}
                            />

                        )
                    )}

                </div>

            )}

        </div>

    );
}