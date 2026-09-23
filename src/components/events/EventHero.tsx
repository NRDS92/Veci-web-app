interface EventHeroProps {
    title: string;
    category: string;
    cityId: string;
    image?: string;
}

export default function EventHero({
    title,
    category,
    cityId,
    image,
}: EventHeroProps) {
    return (
        <section>
            {image ? (
                <img
                    src={image}
                    alt={title}
                    className="mb-8 aspect-video w-full rounded-2xl object-cover"
                />
            ) : (
                <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-2xl bg-gray-100">
                    <p className="text-sm text-gray-500">
                        No event image available
                    </p>
                </div>
            )}

            <header>
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                    {category}
                </p>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    {title}
                </h1>

                {cityId && (
                    <p className="mt-4 text-gray-500">
                        {cityId}
                    </p>
                )}
            </header>
        </section>
    );
}