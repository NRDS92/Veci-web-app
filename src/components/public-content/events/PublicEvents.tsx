import { Link } from "@/i18n/navigation";

import { getPublicEvents } from "@/lib/api/public-content";

import EventHeroCarousel from "./EventHeroCarousel";

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

export default async function PublicEvents({
    cityId,
    category,
    limit = 6,
}: PublicEventsProps) {
    const events = await getPublicEvents({
        cityId,
        category,
        limit,
    });

    return (
        <main className="min-h-screen bg-white">

            {/* =========================================================
                01 — EVENT GALLERY
            ========================================================== */}

<section className="border-b border-gray-100 bg-[#F8F8F6] pt-28 pb-20">
    <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                    What's happening
                </p>

                <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-gray-950 md:text-7xl">
                    Discover what&apos;s
                    <br />
                    <span className="text-[#4C76F2]">
                        happening.
                    </span>
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                    Parties, food, culture, sports and community
                    experiences created by Latin Americans across Europe.
                </p>
            </div>

            <Link
                href="/events"
                className="shrink-0 text-sm font-bold text-gray-950 transition hover:text-[#4C76F2]"
            >
                Explore all events →
            </Link>
        </div>

        {/* =========================================================
            EVENT BENTO
        ========================================================== */}

        {events.length > 0 ? (
            <div className="mt-14 h-auto md:h-[600px]">
                <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
                    {events.slice(0, 10).map((event, index) => {
                        const isFeatured = index === 0;
                        const isWide = index === 3 || index === 7;

                        return (
                            <Link
                                key={event.id}
                                href={`/events/${event.slug}`}
                                className={[
                                    "group relative overflow-hidden rounded-[1.75rem] bg-gray-200",
                                    "min-h-[240px] md:min-h-0",
                                    isFeatured
                                        ? "md:col-span-2 md:row-span-2"
                                        : isWide
                                            ? "md:col-span-2"
                                            : "",
                                ].join(" ")}
                            >
                                {/* IMAGE */}

                                {event.images?.[0] ? (
                                    <img
                                        src={event.images[0]}
                                        alt={event.title}
                                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-sm text-gray-400">
                                        Event image
                                    </div>
                                )}

                                {/* OVERLAY */}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* CONTENT */}

                                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-900 backdrop-blur-sm">
                                            {event.category}
                                        </span>

                                        {event.eventType === "official" && (
                                            <span className="rounded-full bg-[#F2C94C] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-950">
                                                Official
                                            </span>
                                        )}
                                    </div>

                                    <h2
                                        className={[
                                            "mt-3 font-black leading-tight text-white",
                                            isFeatured
                                                ? "text-3xl md:text-4xl"
                                                : "text-xl md:text-2xl",
                                        ].join(" ")}
                                    >
                                        {event.title}
                                    </h2>

                                    <p className="mt-2 text-sm text-white/70">
                                        📍 {event.cityId}
                                    </p>
                                </div>

                                {/* HOVER ARROW */}

                                <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-gray-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    ↗
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        ) : (
            <div className="mt-14 rounded-[2rem] border border-dashed border-gray-300 bg-white p-16 text-center">
                <p className="text-gray-500">
                    No public events available right now.
                </p>

                <Link
                    href="/create"
                    className="mt-5 inline-flex font-semibold text-gray-950 transition hover:text-[#4C76F2]"
                >
                    Be the first to create one →
                </Link>
            </div>
        )}

        {/* CATEGORIES */}

        <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((item) => (
                <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600"
                >
                    {item}
                </span>
            ))}
        </div>
    </div>
</section>


            {/* =========================================================
                02 — PUBLISH YOUR EVENT
            ========================================================== */}

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

                    <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

                        {/* TEXT */}

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                Your event belongs here
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-gray-950 md:text-7xl">
                                ¿Tienes un evento?
                                <br />
                                <span className="text-[#4C76F2]">
                                    Publícalo en Veci.
                                </span>
                            </h2>

                            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                                Conecta tu evento con personas que están
                                buscando qué hacer, dónde ir y cómo conectar
                                con la comunidad latina.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-3">
                                <Link
                                    href="/create"
                                    className="rounded-full bg-gray-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#4C76F2]"
                                >
                                    Publicar mi evento
                                </Link>

                                <Link
                                    href="/events"
                                    className="rounded-full border border-gray-200 px-7 py-4 text-sm font-bold text-gray-900 transition hover:border-gray-900"
                                >
                                    Ver eventos
                                </Link>
                            </div>
                        </div>


                        {/* VISUAL / MESSAGE */}

                        <div className="rounded-[2.5rem] bg-gray-950 p-8 text-white md:p-12">

                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/40">
                                Veci Events
                            </p>

                            <h3 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                                Tu evento.
                                <br />
                                Tu comunidad.
                                <br />
                                <span className="text-[#F2C94C]">
                                    Más descubrimiento.
                                </span>
                            </h3>

                            <p className="mt-7 text-base leading-7 text-white/60">
                                Veci ayuda a que las personas descubran
                                actividades y experiencias de la comunidad
                                latina en su ciudad.
                            </p>

                            <div className="mt-10 h-px bg-white/10" />

                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl">
                                    ✦
                                </div>

                                <div>
                                    <p className="font-bold">
                                        Haz que tu evento sea descubrible
                                    </p>

                                    <p className="mt-1 text-sm text-white/50">
                                        En Veci, las personas vienen buscando
                                        precisamente eso.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* =========================================================
                03 — BENEFITS
            ========================================================== */}

            <section className="border-y border-gray-100 bg-[#F8F8F6]">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                            Why Veci
                        </p>

                        <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-gray-950 md:text-6xl">
                            No publiques solo un evento.
                            <br />
                            <span className="text-[#4C76F2]">
                                Hazlo descubrible.
                            </span>
                        </h2>

                        <p className="mt-7 text-lg leading-8 text-gray-600">
                            Veci está pensado para ayudar a la comunidad
                            latina a encontrar personas, negocios y eventos
                            relevantes en su ciudad.
                        </p>
                    </div>


                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {/* BENEFIT 1 */}

                        <article className="rounded-[2rem] border border-gray-200 bg-white p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4C76F2]/10 text-xl">
                                🔎
                            </div>

                            <h3 className="mt-7 text-2xl font-black tracking-tight text-gray-950">
                                Más descubrimiento
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Tu evento puede aparecer frente a personas
                                que están buscando actividades y experiencias
                                cerca de ellas.
                            </p>
                        </article>


                        {/* BENEFIT 2 */}

                        <article className="rounded-[2rem] border border-gray-200 bg-white p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2C94C]/20 text-xl">
                                🌎
                            </div>

                            <h3 className="mt-7 text-2xl font-black tracking-tight text-gray-950">
                                Llega a la comunidad
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Conecta tu evento con personas interesadas
                                en cultura, gastronomía, música, deportes y
                                experiencias latinas.
                            </p>
                        </article>


                        {/* BENEFIT 3 */}

                        <article className="rounded-[2rem] border border-gray-200 bg-white p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl">
                                📄
                            </div>

                            <h3 className="mt-7 text-2xl font-black tracking-tight text-gray-950">
                                Tu propia página
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Cada evento tiene su propia página con la
                                información que tus asistentes necesitan.
                            </p>
                        </article>


                        {/* BENEFIT 4 */}

                        <article className="rounded-[2rem] border border-gray-200 bg-white p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl">
                                📲
                            </div>

                            <h3 className="mt-7 text-2xl font-black tracking-tight text-gray-950">
                                Fácil de compartir
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-gray-600">
                                Comparte tu evento directamente con tu
                                comunidad y utiliza Veci como punto de
                                referencia.
                            </p>
                        </article>

                    </div>
                </div>
            </section>


            {/* =========================================================
                04 — HOW IT WORKS
            ========================================================== */}

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">

                    <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                Simple process
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-gray-950 md:text-6xl">
                                Publicar es
                                <br />
                                <span className="text-[#4C76F2]">
                                    sencillo.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-md text-lg leading-8 text-gray-600">
                                No necesitas conocimientos técnicos. Solo
                                necesitas tener algo que compartir.
                            </p>

                            <Link
                                href="/create"
                                className="mt-8 inline-flex rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-[#4C76F2]"
                            >
                                Crear mi evento →
                            </Link>
                        </div>


                        <div className="space-y-4">

                            <div className="rounded-[2rem] border border-gray-200 p-7 md:p-8">
                                <div className="flex gap-6">
                                    <span className="text-sm font-black text-gray-300">
                                        01
                                    </span>

                                    <div>
                                        <h3 className="text-2xl font-black text-gray-950">
                                            Crea tu evento
                                        </h3>

                                        <p className="mt-3 leading-7 text-gray-600">
                                            Añade el nombre, fecha, ubicación,
                                            categoría, imágenes y la información
                                            que tus asistentes necesitan.
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="rounded-[2rem] border border-gray-200 p-7 md:p-8">
                                <div className="flex gap-6">
                                    <span className="text-sm font-black text-gray-300">
                                        02
                                    </span>

                                    <div>
                                        <h3 className="text-2xl font-black text-gray-950">
                                            Haz que destaque
                                        </h3>

                                        <p className="mt-3 leading-7 text-gray-600">
                                            Una buena imagen y una descripción
                                            clara ayudan a que las personas
                                            entiendan rápidamente qué hace
                                            especial tu evento.
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="rounded-[2rem] border border-gray-200 p-7 md:p-8">
                                <div className="flex gap-6">
                                    <span className="text-sm font-black text-gray-300">
                                        03
                                    </span>

                                    <div>
                                        <h3 className="text-2xl font-black text-gray-950">
                                            Publícalo en Veci
                                        </h3>

                                        <p className="mt-3 leading-7 text-gray-600">
                                            Tu evento pasa a formar parte del
                                            contenido que la comunidad puede
                                            descubrir en Veci.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            {/* =========================================================
                05 — UPCOMING EVENTS
            ========================================================== */}

            <section className="border-t border-gray-100 bg-[#F8F8F6]">
                <div className="mx-auto max-w-7xl px-6 py-24">

                    <div className="flex items-end justify-between gap-6">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                Happening soon
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-gray-950 md:text-5xl">
                                See what&apos;s coming.
                            </h2>
                        </div>

                        <Link
                            href="/events"
                            className="hidden text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:block"
                        >
                            View all events →
                        </Link>

                    </div>


                    {events.length > 0 ? (
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {events.map((event) => (

                                <Link
                                    key={event.id}
                                    href={`/events/${event.slug}`}
                                    className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">

                                        {event.images?.[0] ? (
                                            <img
                                                src={event.images[0]}
                                                alt={event.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                Event image
                                            </div>
                                        )}

                                    </div>


                                    <div className="p-6">

                                        <div className="flex items-center justify-between gap-4">

                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                {event.category}
                                            </p>

                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                                                {event.eventType === "official"
                                                    ? "Official"
                                                    : "Community"}
                                            </span>

                                        </div>


                                        <h3 className="mt-3 text-xl font-bold text-gray-950">
                                            {event.title}
                                        </h3>


                                        <p className="mt-3 text-sm text-gray-500">
                                            📍 {event.cityId}
                                        </p>


                                        <p className="mt-2 text-sm text-gray-600">
                                            {new Date(
                                                event.dateStart
                                            ).toLocaleDateString("es-ES", {
                                                dateStyle: "medium",
                                            })}
                                        </p>

                                    </div>

                                </Link>

                            ))}

                        </div>
                    ) : (
                        <div className="mt-12 rounded-[2rem] border border-dashed border-gray-300 bg-white p-16 text-center">
                            <p className="text-gray-500">
                                No public events available right now.
                            </p>
                        </div>
                    )}

                </div>
            </section>


            {/* =========================================================
                06 — FINAL CTA
            ========================================================== */}

            <section className="px-6 py-24 md:py-32">

                <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gray-950 px-8 py-16 text-white md:px-16 md:py-24">

                    <div className="max-w-4xl">

                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/40">
                            Your turn
                        </p>

                        <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl">
                            Tienes algo que
                            <br />
                            compartir.
                            <br />
                            <span className="text-[#F2C94C]">
                                La comunidad está ahí.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
                            Publica tu próximo evento en Veci y haz que más
                            personas puedan descubrirlo.
                        </p>

                        <div className="mt-10">
                            <Link
                                href="/create"
                                className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-gray-950 transition hover:bg-[#F2C94C]"
                            >
                                Publicar mi evento →
                            </Link>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                07 — FOOTER MESSAGE
            ========================================================== */}

            <section className="border-t border-gray-100 bg-[#F8F8F6]">

                <div className="mx-auto max-w-4xl px-6 py-20 text-center">

                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                        Veci
                    </p>

                    <h2 className="mt-5 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                        Far from home doesn&apos;t have to mean
                        <br />
                        far from your community.
                    </h2>

                    <Link
                        href="/"
                        className="mt-8 inline-flex text-sm font-bold text-gray-950 transition hover:text-[#4C76F2]"
                    >
                        Discover Veci →
                    </Link>

                </div>

            </section>

        </main>
    );
}