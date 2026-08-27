import Link from "next/link";

import {
    getPublicEvents,
} from "@/lib/api/public-content";


interface PublicEventsProps {
    cityId?: string;
    category?: string;
    limit?: number;
}


export default async function PublicEvents({
    cityId,
    category,
    limit = 6,
}: PublicEventsProps) {

    const events =
        await getPublicEvents({
            cityId,
            category,
            limit,
        });


    console.log(
        "🔥 PUBLIC EVENTS:",
        events
    );


    if (
        events.length === 0
    ) {

        return (
            <section className="px-6 py-16">

                <p>
                    No public events found.
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
                        Upcoming events
                    </h2>

                </div>


                <Link
                    href="/events"
                    className="
                        text-sm
                        font-medium
                        text-blue-600
                        hover:underline
                    "
                >
                    View all
                </Link>

            </div>


            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >

                {events.map(
                    event => (

                        <Link
                            key={event.id}
                            href={
                                `/events/${event.slug}`
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

                            {event.image && (

                                <div
                                    className="
                                        overflow-hidden
                                    "
                                >

                                    <img
                                        src={
                                            event.image
                                        }
                                        alt={
                                            event.title
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
                                    {event.category}
                                </p>


                                <h3
                                    className="
                                        mt-2
                                        text-xl
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    {event.title}
                                </h3>


                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    {event.cityId}
                                </p>


                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        text-gray-600
                                    "
                                >
                                    {new Date(
                                        event.dateStart
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            dateStyle:
                                                "medium",
                                        }
                                    )}
                                </p>

                            </div>

                        </Link>

                    )
                )}

            </div>

        </section>

    );
}