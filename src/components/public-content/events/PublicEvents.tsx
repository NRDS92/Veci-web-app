import { Link } from "@/i18n/navigation";

import {
    getPublicEvents,
} from "@/lib/api/public-content";

import EventHeroCarousel
    from "./EventHeroCarousel";


interface PublicEventsProps {
    cityId?: string;
    category?: string;
    limit?: number;
}


const categories = [
    "Music",
    "Culture",
    "Party",
    "Food",
    "Sports",
    "Community",
];


const cities = [
    "Cologne",
    "Berlin",
    "Madrid",
];


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
    return (
        <main
            className="
                min-h-screen
                bg-white py-24
            "
        >
            {/* =====================================================
                01 — HERO
            ===================================================== */}
            <section
                className="
                    relative
                    overflow-hidden
                    border-b
                    border-gray-100
                    pt-24
                    pb-20
                "
            >
                <div
                    className="
                        mx-auto
                        grid
                        max-w-7xl
                        items-center
                        gap-12
                        px-6
                        lg:grid-cols-2
                        lg:gap-20
                    "
                >
                    {/* =================================================
                        LEFT — TEXT
                    ================================================= */}
                    <div
                        className="
                            max-w-2xl
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-gray-500
                            "
                        >
                            Nuestra comunidad
                        </p>
                        <h1
                            className="
                                mt-4
                                text-5xl
                                font-bold
                                leading-[1.05]
                                tracking-tight
                                text-gray-900
                                md:text-6xl
                            "
                        >
                            Eventos latinos
                            <br />
                            en Europa
                        </h1>
                        <p
                            className="
                                mt-6
                                max-w-xl
                                text-lg
                                leading-8
                                text-gray-600
                            "
                        >
                            Descubre fiestas, conciertos,
                            encuentros culturales y eventos
                            de nuestra comunidad cerca de ti.
                        </p>
                        {/* POPULAR */}
                        <div
                            className="
                                mt-8
                                flex
                                flex-wrap
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    mr-1
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                "
                            >
                                Popular:
                            </span>
                            {categories.map(
                                (item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        className="
                                            rounded-full
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-2
                                            text-sm
                                            text-gray-600
                                            transition
                                            hover:border-gray-900
                                            hover:text-gray-900
                                        "
                                    >
                                        {item}
                                    </button>
                                )
                            )}
                        </div>
                        <p
                            className="
                                mt-8
                                max-w-lg
                                text-sm
                                leading-6
                                text-gray-400
                            "
                        >
                            Encuentra experiencias,
                            personas y momentos que
                            mantienen conectada nuestra
                            comunidad lejos de casa.
                        </p>
                    </div>
                    {/* =================================================
                        RIGHT — EVENT CAROUSEL
                    ================================================= */}
                    <div
                        className="
                            w-full
                            max-w-xl
                            justify-self-center
                            lg:justify-self-end
                        "
                    >
                        <EventHeroCarousel
                            events={events}
                        />
                    </div>
                </div>
            </section>
            {/* =====================================================
                02 — CATEGORIES
            ===================================================== */}
            <section
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-20
                "
            >
                <div className="mb-10">
                    <p
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-gray-400
                        "
                    >
                        Explora
                    </p>
                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-gray-900
                        "
                    >
                        Encuentra tu próximo plan
                    </h2>
                </div>
                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {categories.map(
                        (item) => (
                            <button
                                key={item}
                                type="button"
                                className="
                                    group
                                    flex
                                    min-h-32
                                    items-end
                                    justify-between
                                    rounded-3xl
                                    border
                                    border-gray-200
                                    bg-gray-50
                                    p-6
                                    text-left
                                    transition
                                    hover:-translate-y-1
                                    hover:bg-white
                                    hover:shadow-lg
                                "
                            >
                                <span
                                    className="
                                        text-xl
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    {item}
                                </span>
                                <span
                                    className="
                                        text-xl
                                        text-gray-400
                                        transition
                                        group-hover:translate-x-1
                                    "
                                >
                                    →
                                </span>
                            </button>
                        )
                    )}
                </div>
            </section>
            {/* =====================================================
                03 — UPCOMING EVENTS
            ===================================================== */}

            <section
                className="
                    border-y
                    border-gray-100
                    bg-gray-50
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-7xl
                        px-6
                        py-20
                    "
                >
                    <div
                        className="
                            mb-10
                            flex
                            items-end
                            justify-between
                            gap-6
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-gray-400
                                "
                            >
                                Próximamente
                            </p>
                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                "
                            >
                                No te pierdas lo que viene
                            </h2>
                        </div>
                        <Link
                            href="/events"
                            className="
                                hidden
                                text-sm
                                font-semibold
                                text-gray-900
                                md:block
                            "
                        >
                            Ver todos →
                        </Link>
                    </div>
                    {events.length === 0 ? (
                        <div
                            className="
                                rounded-3xl
                                border
                                border-dashed
                                border-gray-300
                                bg-white
                                p-12
                                text-center
                            "
                        >
                            <p className="text-gray-500">
                                No hay eventos públicos disponibles.
                            </p>
                        </div>
                    ) : (

                        <div
                            className="
                                grid
                                gap-6
                                sm:grid-cols-2
                                lg:grid-cols-3
                            "
                        >

                            {events.map(
                                (event) => (

                                    <Link
                                        key={event.id}
                                        href={`/events/${event.slug}`}
                                        className="
                                            group
                                            overflow-hidden
                                            rounded-3xl
                                            border
                                            border-gray-200
                                            bg-white
                                            transition
                                            hover:-translate-y-1
                                            hover:shadow-xl
                                        "
                                    >

                                        {/* IMAGE */}

                                        <div
                                            className="
                                                aspect-[4/3]
                                                w-full
                                                overflow-hidden
                                                bg-gray-100
                                            "
                                        >

                                            {event.images?.[0] ? (
                                                <img
                                                    src={event.images[0]}
                                                    alt={event.title}
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                        transition
                                                        duration-500
                                                        group-hover:scale-105
                                                    "
                                                />
                                            ) : (
                                                <div
                                                    className="
                                                        flex
                                                        h-full
                                                        items-center
                                                        justify-center
                                                        text-sm
                                                        text-gray-400
                                                    "
                                                >
                                                    Imagen del evento
                                                </div>
                                            )}

                                        </div>


                                        {/* CONTENT */}

                                        <div className="p-6">

                                            <p
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wide
                                                    text-gray-400
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
                                                    mt-3
                                                    text-sm
                                                    text-gray-500
                                                "
                                            >
                                                📍 {event.cityId}
                                            </p>


                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    text-gray-600
                                                "
                                            >
                                                {new Date(
                                                    event.dateStart
                                                ).toLocaleDateString(
                                                    "es-ES",
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

                    )}

                </div>

            </section>



            {/* =====================================================
                04 — DISCOVER BY CITY
            ===================================================== */}

            <section
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-20
                "
            >

                <div className="mb-10">

                    <p
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-gray-400
                        "
                    >
                        Descubre cerca de ti
                    </p>


                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-gray-900
                        "
                    >
                        Eventos por ciudad
                    </h2>

                </div>


                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-3
                    "
                >

                    {cities.map(
                        (city) => (

                            <div
                                key={city}
                                className="
                                    min-h-56
                                    rounded-3xl
                                    border
                                    border-gray-200
                                    bg-gray-50
                                    p-8
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        text-gray-400
                                    "
                                >
                                    VECI
                                </p>


                                <h3
                                    className="
                                        mt-3
                                        text-2xl
                                        font-bold
                                        text-gray-900
                                    "
                                >
                                    {city}
                                </h3>


                                <p
                                    className="
                                        mt-3
                                        text-gray-500
                                    "
                                >
                                    Descubre eventos latinos
                                    en {city}.
                                </p>


                                <div
                                    className="
                                        mt-6
                                        text-sm
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    Explorar →
                                </div>

                            </div>

                        )
                    )}

                </div>

            </section>



            {/* =====================================================
                05 — EVENT CTA
            ===================================================== */}

            <section
                className="
                    px-6
                    pb-20
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-7xl
                        overflow-hidden
                        rounded-[2rem]
                        bg-gray-900
                        px-8
                        py-16
                        text-white
                        md:px-16
                    "
                >

                    <div className="max-w-2xl">

                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-gray-400
                            "
                        >
                            Para organizadores
                        </p>


                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                                md:text-4xl
                            "
                        >
                            ¿Organizas un evento?
                        </h2>


                        <p
                            className="
                                mt-4
                                text-lg
                                leading-8
                                text-gray-300
                            "
                        >
                            Comparte tu próximo evento
                            con nuestra comunidad.
                        </p>


                        <button
                            type="button"
                            className="
                                mt-8
                                rounded-full
                                bg-white
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-gray-900
                                transition
                                hover:bg-gray-100
                            "
                        >
                            Publicar evento
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}