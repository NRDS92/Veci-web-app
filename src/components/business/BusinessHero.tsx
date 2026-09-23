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
                                h-64
                                w-full
                                object-cover
                                sm:h-72
                                md:h-80
                            "
                        />
                    </div>
                ) : (
                    <div
                        className="
                            h-64
                            w-full
                            rounded-3xl
                            bg-gray-100
                            sm:h-72
                            md:h-80
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
                            h-28
                            w-28
                            overflow-hidden
                            rounded-full
                            border-4
                            border-white
                            bg-white
                            shadow-lg
                            sm:h-32
                            sm:w-32
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
                    pt-20
                    sm:px-8
                    sm:pt-24
                "
            >
                <p
                    className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-wide
                        text-gray-500
                    "
                >
                    {category}
                </p>

                <h1
                    className="
                        mt-2
                        text-4xl
                        font-bold
                        tracking-tight
                        text-gray-900
                        md:text-5xl
                    "
                >
                    {name}
                </h1>

                {subCategory && (
                    <p
                        className="
                            mt-3
                            text-lg
                            text-gray-500
                        "
                    >
                        {subCategory}
                    </p>
                )}
            </div>
        </section>
    );
}