"use client";

import {
    ChangeEvent,
    useState,
} from "react";

import {
    LocationData,
} from "@/features/location/location.types";

import {
    locationService,
} from "@/features/location/location.service";

import LocationMapClient from "@/components/location/LocationMapClient";

interface LocationSelectorProps {
    value: LocationData | null;
    onChange: (location: LocationData | null) => void;
    disabled?: boolean;
}

export default function LocationSelector({
    value,
    onChange,
    disabled = false,
}: LocationSelectorProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<LocationData[]>(
        []
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(
        null
    );

    const handleSearch = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const nextQuery = event.target.value;

        setQuery(nextQuery);
        setError(null);

        if (nextQuery.trim().length < 3) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);

            const locations =
                await locationService.search(
                    nextQuery.trim()
                );

            setResults(locations);
        } catch (error) {
            console.error(
                "Location search failed:",
                error
            );

            setResults([]);

            setError(
                "Unable to search locations."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (
        location: LocationData
    ) => {
        onChange(location);

        setQuery("");
        setResults([]);
        setError(null);
    };

    const handleClear = () => {
        onChange(null);

        setQuery("");
        setResults([]);
        setError(null);
    };

    return (
        <div className="space-y-4">
            {/* SEARCH */}
            <div className="relative">
                <label
                    htmlFor="location-search"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Search location
                </label>

                <div className="relative">
                    <input
                        id="location-search"
                        type="text"
                        value={
                            value
                                ? value.formattedAddress
                                : query
                        }
                        onChange={handleSearch}
                        disabled={
                            disabled ||
                            Boolean(value)
                        }
                        placeholder="Search for a city or address..."
                        autoComplete="off"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/20 disabled:bg-gray-100"
                    />

                    {loading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#FF7A00]" />
                        </div>
                    )}
                </div>

                {/* RESULTS */}
                {results.length > 0 && (
                    <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                        {results.map(
                            (location) => (
                                <button
                                    key={
                                        location.placeId
                                    }
                                    type="button"
                                    onClick={() =>
                                        handleSelect(
                                            location
                                        )
                                    }
                                    className="block w-full border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
                                >
                                    <div className="font-medium text-gray-900">
                                        {
                                            location.city
                                        }
                                    </div>

                                    <div className="mt-1 text-sm text-gray-500">
                                        {
                                            location.formattedAddress
                                        }
                                    </div>
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* ERROR */}
            {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* SELECTED LOCATION */}
            {value && (
                <div className="space-y-4">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Selected location
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {value.city}
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    {
                                        value.formattedAddress
                                    }
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {value.country}
                                    {value.state
                                        ? ` · ${value.state}`
                                        : ""}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    handleClear
                                }
                                disabled={disabled}
                                className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-gray-900 disabled:opacity-50"
                            >
                                Change
                            </button>
                        </div>
                    </div>

                    {/* MAP */}
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <LocationMapClient
                            coordinates={[
                                value.longitude,
                                value.latitude,
                            ]}
                            address={
                                value.formattedAddress
                            }
                            title={value.city}
                        />
                    </div>
                </div>
            )}

            {/* EMPTY MAP AREA */}
            {!value && !loading && (
                <div className="relative h-64 overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                                <span className="text-2xl">
                                    🗺️
                                </span>
                            </div>

                            <p className="font-medium text-gray-700">
                                Select a location
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Search for a city or address above.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}