"use client";

interface OpeningHoursInterval {
    open: string;
    close: string;
}

interface OpeningHoursDay {
    isOpen: boolean;
    intervals: OpeningHoursInterval[];
}

interface BusinessOpeningHours {
    monday: OpeningHoursDay;
    tuesday: OpeningHoursDay;
    wednesday: OpeningHoursDay;
    thursday: OpeningHoursDay;
    friday: OpeningHoursDay;
    saturday: OpeningHoursDay;
    sunday: OpeningHoursDay;
}

interface BusinessAvailabilityCardProps {
    openingHours?: BusinessOpeningHours;
}

const days: {
    key: keyof BusinessOpeningHours;
    label: string;
}[] = [
    {
        key: "monday",
        label: "Monday",
    },
    {
        key: "tuesday",
        label: "Tuesday",
    },
    {
        key: "wednesday",
        label: "Wednesday",
    },
    {
        key: "thursday",
        label: "Thursday",
    },
    {
        key: "friday",
        label: "Friday",
    },
    {
        key: "saturday",
        label: "Saturday",
    },
    {
        key: "sunday",
        label: "Sunday",
    },
];

function getCurrentDayKey(): keyof BusinessOpeningHours {
    const dayIndex = new Date().getDay();

    const dayKeys: (
        keyof BusinessOpeningHours
    )[] = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];

    return dayKeys[dayIndex];
}

function getCurrentTimeInMinutes(): number {
    const now = new Date();

    return (
        now.getHours() * 60 +
        now.getMinutes()
    );
}

function timeToMinutes(
    time: string
): number {
    const [hours, minutes] =
        time.split(":").map(Number);

    return hours * 60 + minutes;
}

function isCurrentlyOpen(
    day: OpeningHoursDay
): boolean {
    if (
        !day.isOpen ||
        day.intervals.length === 0
    ) {
        return false;
    }

    const currentTime =
        getCurrentTimeInMinutes();

    return day.intervals.some(
        (interval) => {
            const open =
                timeToMinutes(interval.open);

            const close =
                timeToMinutes(interval.close);

            return (
                currentTime >= open &&
                currentTime <= close
            );
        }
    );
}

function formatIntervals(
    day: OpeningHoursDay
): string {
    if (
        !day.isOpen ||
        day.intervals.length === 0
    ) {
        return "Closed";
    }

    return day.intervals
        .map(
            (interval) =>
                `${interval.open} – ${interval.close}`
        )
        .join(" · ");
}

export default function BusinessAvailabilityCard({
    openingHours,
}: BusinessAvailabilityCardProps) {
    if (!openingHours) {
        return null;
    }

    const currentDayKey =
        getCurrentDayKey();

    const currentDay =
        openingHours[currentDayKey];

    const isOpen =
        isCurrentlyOpen(currentDay);

    return (
        <section
            className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center gap-2">
                <i className="fa-regular fa-clock text-[#FF7A00]" />

                <h2 className="text-lg font-semibold text-gray-900">
                    Opening hours
                </h2>
            </div>

            {/* =================================================
                CURRENT STATUS
            ================================================= */}

            <div
                className={`
                    mt-5
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    px-4
                    py-3
                    ${
                        isOpen
                            ? "bg-green-50"
                            : "bg-gray-50"
                    }
                `}
            >
                <span
                    className={`
                        h-2.5
                        w-2.5
                        rounded-full
                        ${
                            isOpen
                                ? "bg-green-500"
                                : "bg-gray-400"
                        }
                    `}
                />

                <div>
                    <p
                        className={`
                            text-sm
                            font-semibold
                            ${
                                isOpen
                                    ? "text-green-700"
                                    : "text-gray-700"
                            }
                        `}
                    >
                        {isOpen
                            ? "Open now"
                            : "Closed now"}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                        {days.find(
                            (day) =>
                                day.key ===
                                currentDayKey
                        )?.label}
                    </p>
                </div>
            </div>

            {/* =================================================
                HOURS
            ================================================= */}

            <div className="mt-5 space-y-2">
                {days.map((day) => {
                    const dayData =
                        openingHours[day.key];

                    const isToday =
                        day.key ===
                        currentDayKey;

                    return (
                        <div
                            key={day.key}
                            className={`
                                flex
                                items-center
                                justify-between
                                gap-4
                                rounded-xl
                                px-3
                                py-2.5
                                text-sm
                                ${
                                    isToday
                                        ? "bg-gray-50"
                                        : ""
                                }
                            `}
                        >
                            <span
                                className={`
                                    font-medium
                                    ${
                                        isToday
                                            ? "text-gray-900"
                                            : "text-gray-600"
                                    }
                                `}
                            >
                                {day.label}
                            </span>

                            <span
                                className={`
                                    text-right
                                    ${
                                        dayData.isOpen
                                            ? "text-gray-700"
                                            : "text-gray-400"
                                    }
                                `}
                            >
                                {formatIntervals(
                                    dayData
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}