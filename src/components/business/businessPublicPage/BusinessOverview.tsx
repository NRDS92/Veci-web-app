interface BusinessOverviewProps {
    description?: string;
    headline?: string;
    isLatinoOwned: boolean;
    countryOfOrigin?: string;
}

export default function BusinessOverview({
    description,
    headline,
    isLatinoOwned,
    countryOfOrigin,
}: BusinessOverviewProps) {
    const hasCommunityInfo =
        isLatinoOwned || Boolean(countryOfOrigin);

    if (
        !description &&
        !headline &&
        !hasCommunityInfo
    ) {
        return null;
    }

    return (
        <section
            className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                sm:p-8
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-[#FF7A00]" />

                <h2 className="text-2xl font-semibold text-gray-900">
                    About
                </h2>
            </div>

            {/* =================================================
                HEADLINE
            ================================================= */}

            {headline && (
                <p
                    className="
                        mt-4
                        text-lg
                        font-medium
                        text-gray-800
                    "
                >
                    {headline}
                </p>
            )}

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            {description && (
                <p
                    className="
                        mt-4
                        leading-7
                        text-gray-600
                    "
                >
                    {description}
                </p>
            )}

            {/* =================================================
                COMMUNITY
            ================================================= */}

            {hasCommunityInfo && (
                <div className="mt-6 flex flex-wrap gap-3">
                    {isLatinoOwned && (
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-gray-100
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-gray-800
                            "
                        >
                            <i className="fa-solid fa-users" />

                            <span>
                                Latino-owned
                            </span>
                        </div>
                    )}

                    {countryOfOrigin && (
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-gray-200
                                px-4
                                py-2
                                text-sm
                                text-gray-700
                            "
                        >
                            <i className="fa-solid fa-earth-americas text-gray-400" />

                            <span>
                                {countryOfOrigin}-owned
                            </span>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}