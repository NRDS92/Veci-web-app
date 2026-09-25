"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(
    () => import("./LocationMap"),
    {
        ssr: false,
    }
);

interface LocationMapClientProps {
    coordinates?: [number, number];
    address?: string;
    title?: string;
}

export default function LocationMapClient({
    coordinates,
    address,
    title,
}: LocationMapClientProps) {
    if (
        !coordinates ||
        coordinates.length !== 2 ||
        coordinates.some(
            (coordinate) =>
                typeof coordinate !== "number" ||
                !Number.isFinite(coordinate)
        )
    ) {
        return (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-500">
                Ubicación no disponible
            </div>
        );
    }

    return (
        <LocationMap
            coordinates={coordinates}
            address={address}
            title={title}
        />
    );
}