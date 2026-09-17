import { Link } from "@/i18n/navigation";

import {
    getPublicBusinesses,
} from "@/lib/api/public-content";

import BusinessHeroCarousel
    from "./BusinessHeroCarousel";


interface PublicBusinessesProps {
    cityId?: string;
    category?: string;
    limit?: number;
}


const categories = [
    "Restaurants",
    "Cafés",
    "Shops",
    "Services",
    "Beauty",
    "Health",
];


const cities = [
    "Cologne",
    "Berlin",
    "Madrid",
];


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


    return (

        <main className="min-h-screen bg-white py-24">


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
                            Negocios latinos
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
                            Descubre restaurantes, cafés,
                            tiendas, servicios y negocios
                            de nuestra comunidad cerca de ti.
                        </p>


                        {/* POPULAR CATEGORIES */}

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


                        {/* SUPPORTING TEXT */}

                        <p
                            className="
                                mt-8
                                max-w-lg
                                text-sm
                                leading-6
                                text-gray-400
                            "
                        >
                            Encuentra lugares, servicios y
                            emprendimientos que mantienen viva
                            nuestra cultura lejos de casa.
                        </p>

                    </div>



                    {/* =================================================
                        RIGHT — BUSINESS CAROUSEL
                    ================================================= */}

                    <div
                        className="
                            w-full
                            max-w-xl
                            justify-self-center
                            lg:justify-self-end
                        "
                    >

                        <BusinessHeroCarousel
                            businesses={businesses}
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

                <div
                    className="
                        mb-10
                    "
                >

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
                        Encuentra lo que buscas
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
                03 — FEATURED BUSINESSES
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
                                Negocios destacados
                            </p>


                            <h2
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                "
                            >
                                Historias que nos conectan
                            </h2>

                        </div>


                        <Link
                            href="/business"
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


                    {businesses.length === 0 ? (

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

                            <p
                                className="
                                    text-gray-500
                                "
                            >
                                No hay negocios públicos disponibles.
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

                            {businesses.map(
                                (business) => (

                                    <Link
                                        key={business.id}
                                        href={`/business/${business.slug}`}
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

                                            {business.image ? (

                                                <img
                                                    src={business.image}
                                                    alt={business.name}
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
                                                    Imagen del negocio
                                                </div>

                                            )}

                                        </div>


                                        {/* CONTENT */}

                                        <div
                                            className="
                                                p-6
                                            "
                                        >

                                            <p
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wide
                                                    text-gray-400
                                                "
                                            >
                                                {business.category}
                                            </p>


                                            <h3
                                                className="
                                                    mt-2
                                                    text-xl
                                                    font-semibold
                                                    text-gray-900
                                                "
                                            >
                                                {business.name}
                                            </h3>


                                            {business.subCategory && (

                                                <p
                                                    className="
                                                        mt-1
                                                        text-sm
                                                        text-gray-500
                                                    "
                                                >
                                                    {business.subCategory}
                                                </p>

                                            )}


                                            <div
                                                className="
                                                    mt-5
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                    text-sm
                                                    text-gray-500
                                                "
                                            >

                                                <span>
                                                    📍 {business.cityId}
                                                </span>


                                                {business.priceRange && (

                                                    <span
                                                        className="
                                                            font-medium
                                                        "
                                                    >
                                                        {business.priceRange}
                                                    </span>

                                                )}

                                            </div>

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

                <div
                    className="
                        mb-10
                    "
                >

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
                        Negocios por ciudad
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
                                    Descubre negocios latinos
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
                05 — BUSINESS CTA
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
                                text-gray-400
                            "
                        >
                            Para emprendedores
                        </p>


                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                                md:text-4xl
                            "
                        >
                            ¿Tienes un negocio?
                        </h2>


                        <p
                            className="
                                mt-4
                                text-lg
                                leading-8
                                text-gray-300
                            "
                        >
                            Haz que nuestra comunidad
                            pueda encontrarte.
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
                            Añadir mi negocio
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}