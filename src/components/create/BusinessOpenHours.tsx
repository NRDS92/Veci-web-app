"use client";

import { useState } from "react";

import {
    BusinessOpeningHours as BusinessOpeningHoursType,
    BusinessOpeningHoursDay,
} from "@/features/business/business.types";


// ======================================================
// TYPES
// ======================================================

interface BusinessOpeningHoursProps {
    value: BusinessOpeningHoursType;
    onChange: (value: BusinessOpeningHoursType) => void;
    loading: boolean;
}


// ======================================================
// DAYS
// ======================================================

const days: {
    key: keyof BusinessOpeningHoursType;
    label: string;
    shortLabel: string;
    icon: string;
}[] = [
    {
        key: "monday",
        label: "Monday",
        shortLabel: "Mon",
        icon: "fa-calendar-day",
    },
    {
        key: "tuesday",
        label: "Tuesday",
        shortLabel: "Tue",
        icon: "fa-calendar-day",
    },
    {
        key: "wednesday",
        label: "Wednesday",
        shortLabel: "Wed",
        icon: "fa-calendar-day",
    },
    {
        key: "thursday",
        label: "Thursday",
        shortLabel: "Thu",
        icon: "fa-calendar-day",
    },
    {
        key: "friday",
        label: "Friday",
        shortLabel: "Fri",
        icon: "fa-calendar-day",
    },
    {
        key: "saturday",
        label: "Saturday",
        shortLabel: "Sat",
        icon: "fa-calendar-day",
    },
    {
        key: "sunday",
        label: "Sunday",
        shortLabel: "Sun",
        icon: "fa-calendar-day",
    },
];


// ======================================================
// DEFAULT INTERVAL
// ======================================================

const createDefaultInterval = () => ({
    open: "09:00",
    close: "17:00",
});


// ======================================================
// COMPONENT
// ======================================================

export default function BusinessOpeningHours({
    value,
    onChange,
    loading,
}: BusinessOpeningHoursProps) {

    // ==================================================
    // ACTIVE DAY
    // ==================================================

    const [activeDay, setActiveDay] =
        useState<keyof BusinessOpeningHoursType>("monday");


    // ==================================================
    // UPDATE DAY
    // ==================================================

    const updateDay = (
        dayKey: keyof BusinessOpeningHoursType,
        updates: Partial<BusinessOpeningHoursDay>
    ) => {
        onChange({
            ...value,
            [dayKey]: {
                ...value[dayKey],
                ...updates,
            },
        });
    };


    // ==================================================
    // TOGGLE DAY
    // ==================================================

    const handleToggleDay = (
        dayKey: keyof BusinessOpeningHoursType
    ) => {

        const day = value[dayKey];

        if (day.isOpen) {
            updateDay(dayKey, {
                isOpen: false,
                intervals: [],
            });

            return;
        }

        updateDay(dayKey, {
            isOpen: true,
            intervals:
                day.intervals.length > 0
                    ? day.intervals
                    : [createDefaultInterval()],
        });
    };


    // ==================================================
    // UPDATE INTERVAL
    // ==================================================

    const updateInterval = (
        dayKey: keyof BusinessOpeningHoursType,
        intervalIndex: number,
        field: "open" | "close",
        newValue: string
    ) => {

        const day = value[dayKey];

        const intervals = day.intervals.map(
            (interval, index) =>
                index === intervalIndex
                    ? {
                          ...interval,
                          [field]: newValue,
                      }
                    : interval
        );

        updateDay(dayKey, {
            intervals,
        });
    };


    // ==================================================
    // ADD INTERVAL
    // ==================================================

    const addInterval = (
        dayKey: keyof BusinessOpeningHoursType
    ) => {

        const day = value[dayKey];

        updateDay(dayKey, {
            intervals: [
                ...day.intervals,
                createDefaultInterval(),
            ],
        });
    };


    // ==================================================
    // REMOVE INTERVAL
    // ==================================================

    const removeInterval = (
        dayKey: keyof BusinessOpeningHoursType,
        intervalIndex: number
    ) => {

        const day = value[dayKey];

        const intervals = day.intervals.filter(
            (_, index) => index !== intervalIndex
        );

        updateDay(dayKey, {
            intervals,
        });
    };


    // ==================================================
    // ACTIVE DAY DATA
    // ==================================================

    const activeDayData = value[activeDay];

    const activeDayLabel =
        days.find(
            (day) => day.key === activeDay
        )?.label ?? "Day";


    // ==================================================
    // RENDER
    // ==================================================

    return (
        <section className="space-y-4">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex items-start justify-between gap-4">

                <div>

                    <div className="flex items-center gap-2">

                        <i className="fa-solid fa-clock text-[#FF7A00]" />

                        <h2 className="text-lg font-semibold text-gray-900">
                            Opening hours
                        </h2>

                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        Set when your business is open.
                    </p>

                </div>

            </div>


            {/* ==================================================
                DAY SELECTOR
            ================================================== */}

            <div className="flex gap-2 overflow-x-auto pb-1">

                {days.map((day) => {

                    const dayValue =
                        value[day.key];

                    const isActive =
                        activeDay === day.key;

                    return (
                        <button
                            key={day.key}
                            type="button"
                            onClick={() =>
                                setActiveDay(day.key)
                            }
                            disabled={loading}
                            className={`
                                relative flex min-w-[72px] shrink-0
                                flex-col items-center gap-1
                                rounded-xl border px-3 py-2.5
                                transition
                                ${
                                    isActive
                                        ? "border-[#FF7A00] bg-[#FF7A00]/5 text-[#FF7A00]"
                                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                                }
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            `}
                        >

                            <i
                                className={`fa-solid ${day.icon} text-sm`}
                            />

                            <span className="text-xs font-medium">
                                {day.shortLabel}
                            </span>


                            {/* STATUS DOT */}

                            <span
                                className={`
                                    absolute right-1.5 top-1.5
                                    h-1.5 w-1.5 rounded-full
                                    ${
                                        dayValue.isOpen
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }
                                `}
                            />

                        </button>
                    );
                })}

            </div>


            {/* ==================================================
                ACTIVE DAY
            ================================================== */}

            <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4">

                {/* ==================================================
                    DAY HEADER
                ================================================== */}

                <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm">

                            <i className="fa-solid fa-calendar-day" />

                        </div>

                        <div>

                            <h3 className="text-sm font-semibold text-gray-900">
                                {activeDayLabel}
                            </h3>

                            <p className="text-xs text-gray-400">
                                {activeDayData.isOpen
                                    ? "Business is open"
                                    : "Business is closed"}
                            </p>

                        </div>

                    </div>


                    {/* ==================================================
                        OPEN / CLOSED
                    ================================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            handleToggleDay(activeDay)
                        }
                        disabled={loading}
                        className={`
                            inline-flex items-center gap-2
                            rounded-full border px-3 py-1.5
                            text-xs font-medium transition
                            ${
                                activeDayData.isOpen
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : "border-gray-200 bg-white text-gray-500"
                            }
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        `}
                    >

                        <span
                            className={`
                                h-1.5 w-1.5 rounded-full
                                ${
                                    activeDayData.isOpen
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                }
                            `}
                        />

                        {activeDayData.isOpen
                            ? "Open"
                            : "Closed"}

                    </button>

                </div>


                {/* ==================================================
                    INTERVALS
                ================================================== */}

                {activeDayData.isOpen && (

                    <div className="mt-4 space-y-2">

                        {activeDayData.intervals.map(
                            (interval, index) => (

                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >

                                    {/* CLOCK */}

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400">

                                        <i className="fa-regular fa-clock text-sm" />

                                    </div>


                                    {/* OPEN */}

                                    <input
                                        type="time"
                                        value={interval.open}
                                        onChange={(event) =>
                                            updateInterval(
                                                activeDay,
                                                index,
                                                "open",
                                                event.target.value
                                            )
                                        }
                                        disabled={loading}
                                        aria-label={`${activeDayLabel} opening time`}
                                        className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />


                                    <span className="text-gray-400">
                                        →
                                    </span>


                                    {/* CLOSE */}

                                    <input
                                        type="time"
                                        value={interval.close}
                                        onChange={(event) =>
                                            updateInterval(
                                                activeDay,
                                                index,
                                                "close",
                                                event.target.value
                                            )
                                        }
                                        disabled={loading}
                                        aria-label={`${activeDayLabel} closing time`}
                                        className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />


                                    {/* REMOVE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeInterval(
                                                activeDay,
                                                index
                                            )
                                        }
                                        disabled={loading}
                                        aria-label={`Remove ${activeDayLabel} interval`}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                        <i className="fa-solid fa-trash-can text-xs" />

                                    </button>

                                </div>
                            )
                        )}


                        {/* ==================================================
                            ADD INTERVAL
                        ================================================== */}

                        <button
                            type="button"
                            onClick={() =>
                                addInterval(activeDay)
                            }
                            disabled={loading}
                            className="mt-2 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-white hover:text-[#FF7A00] disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            <i className="fa-solid fa-plus" />

                            <span>
                                Add another time
                            </span>

                        </button>

                    </div>

                )}


                {/* ==================================================
                    CLOSED STATE
                ================================================== */}

                {!activeDayData.isOpen && (

                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm text-gray-400">

                        <i className="fa-solid fa-moon text-xs" />

                        <span>
                            Closed on {activeDayLabel}
                        </span>

                    </div>

                )}

            </div>

        </section>
    );
}