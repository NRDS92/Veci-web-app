import {
    getPublicBusinessBySlug,
} from "@/lib/api/public-content";


interface BusinessPageProps {

    params: Promise<{
        locale: string;
        slug: string;
    }>;

}


export default async function BusinessPage({
    params,
}: BusinessPageProps) {

    const {
        slug,
    } = await params;


    const business =
        await getPublicBusinessBySlug(
            slug
        );


    if (!business) {

        return (

            <main className="min-h-screen">

                <section
                    className="
                        mx-auto
                        max-w-4xl
                        px-6
                        py-20
                    "
                >

                    <h1
                        className="
                            text-3xl
                            font-bold
                        "
                    >
                        Business not found
                    </h1>

                </section>

            </main>

        );

    }


    return (

        <main className="min-h-screen">

            <section
                className="
                    mx-auto
                    max-w-5xl
                    px-6
                    py-16
                "
            >

                {business.coverImage && (

                    <div
                        className="
                            mb-8
                            overflow-hidden
                            rounded-3xl
                        "
                    >

                        <img
                            src={
                                business.coverImage
                            }
                            alt={
                                business.name
                            }
                            className="
                                aspect-[3/1]
                                w-full
                                object-cover
                            "
                        />

                    </div>

                )}


                <div
                    className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
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
                                "
                            />

                        </div>

                    )}


                    <div className="p-8">

                        <p
                            className="
                                text-sm
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


                        <h1
                            className="
                                mt-2
                                text-4xl
                                font-bold
                                text-gray-900
                            "
                        >
                            {
                                business.name
                            }
                        </h1>


                        {business.subCategory && (

                            <p
                                className="
                                    mt-2
                                    text-lg
                                    text-gray-500
                                "
                            >
                                {
                                    business.subCategory
                                }
                            </p>

                        )}


                        {business.description && (

                            <p
                                className="
                                    mt-6
                                    text-base
                                    leading-7
                                    text-gray-700
                                "
                            >
                                {
                                    business.description
                                }
                            </p>

                        )}


                        <div
                            className="
                                mt-8
                                space-y-3
                                text-sm
                                text-gray-600
                            "
                        >

                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {
                                    business.address
                                }
                            </p>


                            <p>
                                <strong>
                                    City:
                                </strong>{" "}
                                {
                                    business.cityId
                                }
                            </p>


                            {business.country && (

                                <p>
                                    <strong>
                                        Country:
                                    </strong>{" "}
                                    {
                                        business.country
                                    }
                                </p>

                            )}


                            {business.priceRange && (

                                <p>
                                    <strong>
                                        Price:
                                    </strong>{" "}
                                    {
                                        business.priceRange
                                    }
                                </p>

                            )}

                        </div>


                        {(business.website ||
                            business.instagram ||
                            business.whatsapp) && (

                            <div
                                className="
                                    mt-8
                                    flex
                                    flex-wrap
                                    gap-4
                                "
                            >

                                {business.website && (

                                    <a
                                        href={
                                            business.website
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-full
                                            border
                                            px-5
                                            py-2
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        Website
                                    </a>

                                )}


                                {business.instagram && (

                                    <a
                                        href={
                                            business.instagram
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-full
                                            border
                                            px-5
                                            py-2
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        Instagram
                                    </a>

                                )}


                                {business.whatsapp && (

                                    <a
                                        href={
                                            business.whatsapp
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            rounded-full
                                            border
                                            px-5
                                            py-2
                                            text-sm
                                            font-medium
                                            hover:bg-gray-50
                                        "
                                    >
                                        WhatsApp
                                    </a>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            </section>

        </main>

    );

}