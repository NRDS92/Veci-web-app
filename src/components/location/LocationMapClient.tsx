"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(
    () => import("./LocationMap"),
    {
        ssr: false,
    }
);

interface LocationMapClientProps {
    coordinates: [number, number];
    address?: string;
    title?: string;
}

export default function LocationMapClient({
    coordinates,
    address,
    title,
}: LocationMapClientProps) {
    return (
        <LocationMap
            coordinates={coordinates}
            address={address}
            title={title}
        />
    );
}