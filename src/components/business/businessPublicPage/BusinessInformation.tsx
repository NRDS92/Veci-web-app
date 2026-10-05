interface BusinessInformationProps {
    category: string;
    subCategory?: string;
    tags?: string[];

    availability?: {
        type:
            | "appointment"
            | "walk_in"
            | "online"
            | "flexible";
        description?: string;
    };
}

const availabilityLabels: Record<
    NonNullable<BusinessInformationProps["availability"]>["type"],
    string
> = {
    appointment: "By appointment",
    walk_in: "Walk-in",
    online: "Online",
    flexible: "Flexible",
};

export default function BusinessInformation({
    category,
    subCategory,
    tags = [],
    availability,
}: BusinessInformationProps) {
    const hasCategories =
        Boolean(category) ||
        Boolean(subCategory) ||
        tags.length > 0;

    const hasAvailability = Boolean(availability);

    if (!hasCategories && !hasAvailability) {
        return null;
    }

    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6">

            {/* =================================================
                CATEGORIES
            ================================================= */}

            {hasCategories && (
                <div>
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-tags text-sm text-[#FF7A00]" />

                        <h2 className="font-semibold text-gray-900">
                            Categories
                        </h2>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">

                        {category && (
                            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                                {category}
                            </span>
                        )}

                        {subCategory && (
                            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                                {subCategory}
                            </span>
                        )}

                        {tags.map((tag, index) => (
                            <span
                                key={`${tag}-${index}`}
                                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                            >
                                {tag}
                            </span>
                        ))}

                    </div>
                </div>
            )}

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            {hasAvailability && availability && (
                <div
                    className={
                        hasCategories
                            ? "mt-7 border-t border-gray-100 pt-7"
                            : ""
                    }
                >
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-calendar-check text-sm text-[#FF7A00]" />

                        <h2 className="font-semibold text-gray-900">
                            Availability
                        </h2>
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-800">
                        {availabilityLabels[availability.type]}
                    </p>

                    {availability.description && (
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {availability.description}
                        </p>
                    )}
                </div>
            )}

        </section>
    );
}