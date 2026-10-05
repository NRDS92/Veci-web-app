interface BusinessHeroProps {
    name: string;
    category: string;
    subCategory?: string;
    image?: string;
    coverImage?: string;
}

export default function BusinessHero({
    name,
    category,
    subCategory,
    image,
    coverImage,
}: BusinessHeroProps) {
    return (
        <section>
            {/* COVER */}
            <div className="relative">
                {coverImage ? (
                    <div className="overflow-hidden rounded-3xl">
                        <img
                            src={coverImage}
                            alt={`${name} cover`}
                            className="
                                h-56
                                w-full
                                object-cover
                                sm:h-64
                                md:h-72
                            "
                        />
                    </div>
                ) : (
                    <div
                        className="
                            h-56
                            w-full
                            rounded-3xl
                            bg-gray-100
                            sm:h-64
                            md:h-72
                        "
                    />
                )}

                {/* LOGO */}
                <div
                    className="
                        absolute
                        bottom-0
                        left-6
                        translate-y-1/2
                        sm:left-8
                    "
                >
                    <div
                        className="
                            h-24
                            w-24
                            overflow-hidden
                            rounded-2xl
                            border-4
                            border-white
                            bg-white
                            shadow-lg
                            sm:h-28
                            sm:w-28
                        "
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={`${name} logo`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                    bg-gray-100
                                    text-2xl
                                    font-semibold
                                    text-gray-400
                                "
                            >
                                {name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* BUSINESS HEADER */}
            <div
                className="
                    px-6
                    pt-16
                    sm:px-8
                    sm:pt-20
                "
            >
                <p
                    className="
                        text-sm
                        font-medium
                        text-gray-500
                    "
                >
                    {category}
                </p>

                <h1
                    className="
                        mt-1
                        text-3xl
                        font-bold
                        tracking-tight
                        text-gray-900
                        sm:text-4xl
                        md:text-5xl
                    "
                >
                    {name}
                </h1>

                {subCategory && (
                    <p
                        className="
                            mt-2
                            text-base
                            text-gray-500
                            sm:text-lg
                        "
                    >
                        {subCategory}
                    </p>
                )}
            </div>
        </section>
    );
}