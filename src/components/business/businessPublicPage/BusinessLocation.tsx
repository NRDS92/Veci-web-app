import LocationMapClient from "../../../components/location/LocationMapClient";

interface BusinessLocationProps {
    address?: string;
    cityId?: string;
    country?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    title: string;
}

export default function BusinessLocation({
    address,
    cityId,
    country,
    coordinates,
    title,
}: BusinessLocationProps) {
    const hasAddress =
        Boolean(address) ||
        Boolean(cityId) ||
        Boolean(country);

    const hasCoordinates =
        coordinates &&
        typeof coordinates.lat === "number" &&
        Number.isFinite(coordinates.lat) &&
        typeof coordinates.lng === "number" &&
        Number.isFinite(coordinates.lng);

    if (!hasAddress && !hasCoordinates) {
        return null;
    }

    return (
        <section
            className="
                overflow-hidden
                rounded-3xl
                border
                border-gray-200
                bg-white
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-[#FF7A00]" />

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Location
                    </h2>
                </div>

                {/* =================================================
                    ADDRESS
                ================================================= */}

                {hasAddress && (
                    <div className="mt-5 space-y-4">
                        {address && (
                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-map-pin mt-1 w-4 text-sm text-gray-400" />

                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        Address
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {address}
                                    </p>
                                </div>
                            </div>
                        )}

                        {(cityId || country) && (
                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-earth-europe mt-1 w-4 text-sm text-gray-400" />

                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        Area
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {[cityId, country]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* =================================================
                MAP
            ================================================= */}

            {hasCoordinates && (
                <div className="h-80 border-t border-gray-200">
                    <LocationMapClient
                        coordinates={[
                            coordinates.lng,
                            coordinates.lat,
                        ]}
                        address={address}
                        title={title}
                    />
                </div>
            )}
        </section>
    );
}