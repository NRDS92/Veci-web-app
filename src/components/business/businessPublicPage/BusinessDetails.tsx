interface BusinessDetailsProps {
    services?: string[];
    specialties?: string[];
    languages?: string[];
    serviceArea?: string[];
}

interface DetailGroupProps {
    title: string;
    icon: string;
    items: string[];
}

function DetailGroup({
    title,
    icon,
    items,
}: DetailGroupProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center gap-2">
                <i
                    className={`${icon} text-sm text-[#FF7A00]`}
                />

                <h3 className="text-base font-semibold text-gray-900">
                    {title}
                </h3>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <span
                        key={`${item}-${index}`}
                        className="
                            inline-flex
                            items-center
                            rounded-full
                            bg-gray-50
                            px-3
                            py-1.5
                            text-sm
                            text-gray-700
                        "
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function BusinessDetails({
    services = [],
    specialties = [],
    languages = [],
    serviceArea = [],
}: BusinessDetailsProps) {
    const hasDetails =
        services.length > 0 ||
        specialties.length > 0 ||
        languages.length > 0 ||
        serviceArea.length > 0;

    if (!hasDetails) {
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

            <div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-[#FF7A00]" />

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Details
                    </h2>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Services, specialties, languages and
                    service area.
                </p>
            </div>

            {/* =================================================
                DETAILS
            ================================================= */}

            <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2">
                <DetailGroup
                    title="Services"
                    icon="fa-solid fa-briefcase"
                    items={services}
                />
                <DetailGroup
                        title="Service area"
                        icon="fa-solid fa-location-dot"
                        items={serviceArea}
                    />
                <DetailGroup
                    title="Specialties"
                    icon="fa-solid fa-star"
                    items={specialties}
                />

                <DetailGroup
                    title="Languages"
                    icon="fa-solid fa-language"
                    items={languages}
                />

                
            </div>
        </section>
    );
}