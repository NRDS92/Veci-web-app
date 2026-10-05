interface BusinessCommunityProps {
    rating?: {
        average: number;
        count: number;
    };

    likesCount?: number;
    followersCount?: number;
    eventsCount?: number;

    onRate?: () => void;
}

export default function BusinessCommunity({
    rating = {
        average: 0,
        count: 0,
    },
    likesCount = 0,
    followersCount = 0,
    eventsCount = 0,
    onRate,
}: BusinessCommunityProps) {
    const hasRating = rating.count > 0;

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
                <i className="fa-solid fa-users text-[#FF7A00]" />

                <h2 className="text-lg font-semibold text-gray-900">
                    Community
                </h2>
            </div>

            {/* =================================================
                RATING
            ================================================= */}

            <div className="mt-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-yellow-50
                                text-yellow-500
                            "
                        >
                            <i className="fa-solid fa-star" />
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-gray-900">
                                {hasRating
                                    ? rating.average.toFixed(1)
                                    : "No rating"}
                            </p>

                            <p className="text-xs text-gray-500">
                                {hasRating
                                    ? `${rating.count} ${
                                          rating.count ===
                                          1
                                              ? "review"
                                              : "reviews"
                                      }`
                                    : "Be the first to rate"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onRate}
                        className="
                            rounded-full
                            border
                            border-gray-200
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-50
                        "
                    >
                        <i className="fa-regular fa-star mr-2" />

                        Rate
                    </button>
                </div>
            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div
                className="
                    mt-6
                    grid
                    grid-cols-3
                    divide-x
                    divide-gray-200
                    border-t
                    border-gray-200
                    pt-5
                "
            >
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                        {likesCount}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Likes
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                        {followersCount}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Followers
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                        {eventsCount}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Events
                    </p>
                </div>
            </div>
        </section>
    );
}