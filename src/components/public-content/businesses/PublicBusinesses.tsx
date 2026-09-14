import Link from "next/link";

import {
    getPublicBusinesses,
} from "@/lib/api/public-content";


interface PublicBusinessesProps {

    cityId?: string;

    category?: string;

    limit?: number;

}


export default async function PublicBusinesses({
    cityId,
    category,
    limit = 6,
}: PublicBusinessesProps) {

    const businesses =
        await getPublicBusinesses({

            cityId,

            category,

            limit,

        });


    console.log(
        "🔥 PUBLIC BUSINESSES:",
        businesses
    );


    if (
        businesses.length === 0
    ) {

        return (
            <section className="px-6 py-16">

                <p>
                    No public businesses found.
                </p>

            </section>
        );

    }


    return (

        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                py-16
            "
        >

            <div
                className="
                    mb-8
                    flex
                    items-end
                    justify-between
                    gap-4
                "
            >

                <div>

                    <p
                        className="
                            text-sm
                            font-medium
                            uppercase
                            tracking-wide
                            text-gray-500
                        "
                    >
                        VECI
                    </p>


                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                        "
                    >
                        Discover businesses
                    </h2>

                </div>


            </div>


            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >

                {businesses.map(
                    business => (

                        <Link
                            key={
                                business.id
                            }
                            href={
                                `/business/${business.slug}`
                            }
                            className="
                                group
                                overflow-hidden
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                transition
                                hover:-translate-y-1
                                hover:shadow-lg
                            "
                        >

                            {business.image && (

                                <div
                                    className="
                                        overflow-hidden
                                    "
                                >

                                    <img
                                        src={
                                            business.image
                                        }
                                        alt={
                                            business.name
                                        }
                                        className="
                                            aspect-video
                                            w-full
                                            object-cover
                                            transition
                                            duration-300
                                            group-hover:scale-105
                                        "
                                    />

                                </div>

                            )}


                            <div
                                className="
                                    p-5
                                "
                            >

                                <p
                                    className="
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-wide
                                        text-gray-500
                                    "
                                >
                                    {
                                        business.category
                                    }
                                </p>


                                <h3
                                    className="
                                        mt-2
                                        text-xl
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    {
                                        business.name
                                    }
                                </h3>


                                {business.subCategory && (

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        {
                                            business.subCategory
                                        }
                                    </p>

                                )}


                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    {
                                        business.cityId
                                    }
                                </p>


                                {business.priceRange && (

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            font-medium
                                            text-gray-600
                                        "
                                    >
                                        {
                                            business.priceRange
                                        }
                                    </p>

                                )}

                            </div>

                        </Link>

                    )
                )}

            </div>

        </section>

    );

}