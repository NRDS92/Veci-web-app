import { Link } from "@/i18n/navigation";

import {
    getPublicBusinesses,
    getPublicEvents,
} from "@/lib/api/public-content";

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

export default async function PublicBusinesses({
    cityId,
    category,
    limit = 6,
}: PublicBusinessesProps) {
    const [businesses, events] = await Promise.all([
        getPublicBusinesses({
            cityId,
            category,
            limit,
        }),

        getPublicEvents({
            cityId,
            limit: 10,
        }),
    ]);

    return (
        <main className="min-h-screen bg-white">
            {/* =========================================================
                01 — HERO
            ========================================================== */}

            <section className="border-b border-gray-100 bg-[#F8F8F6] pt-28 pb-20 md:pt-36 md:pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-6xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                            Veci Business
                        </p>

                        <h1 className="mt-6 text-6xl font-black leading-[0.86] tracking-[-0.055em] text-gray-950 md:text-8xl">
                            Tu negocio.
                            <br />
                            Tu comunidad.
                            <br />
                            <span className="text-[#4C76F2]">
                                Una sola presencia.
                            </span>
                        </h1>

                        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                            <p className="max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                                Construye una presencia digital pensada para
                                conectar tu negocio con la comunidad latina,
                                entender lo que ocurre a tu alrededor y
                                descubrir nuevas oportunidades.
                            </p>

                            <div className="flex shrink-0 flex-wrap gap-3">
                                <Link
                                    href="/register"
                                    className="rounded-full bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#4C76F2]"
                                >
                                    Añadir mi negocio →
                                </Link>

                                <Link
                                    href="/business"
                                    className="rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:border-gray-950"
                                >
                                    Explorar negocios
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                02 — COMMUNITY SIGNALS / EVENTS BENTO
            ========================================================== */}

            <section className="border-b border-gray-100 bg-white py-10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-6 flex items-end justify-between gap-6">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                                Conoce tu comunidad
                            </p>

                            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 md:text-3xl">
                                Mira qué está pasando.
                            </h2>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                Eventos, actividades y movimientos que pueden
                                ayudarte a entender mejor a las personas que
                                están alrededor de tu negocio.
                            </p>
                        </div>

                        <Link
                            href="/events"
                            className="hidden text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:block"
                        >
                            Ver eventos →
                        </Link>
                    </div>

                    {events.length > 0 ? (
                        <div className="grid h-[480px] gap-3 md:grid-cols-4 md:grid-rows-2">
                            {events.slice(0, 5).map((event, index) => {
                                const image = event.images?.[0];

                                const isFeatured = index === 0;

                                const isTall =
                                    index === 1 || index === 3;

                                return (
                                    <Link
                                        key={event.id}
                                        href={`/events/${event.slug}`}
                                        className={[
                                            "group relative overflow-hidden rounded-[1.75rem] bg-gray-200",
                                            isFeatured
                                                ? "md:col-span-2 md:row-span-2"
                                                : "",
                                            isTall
                                                ? "md:row-span-2"
                                                : "",
                                        ].join(" ")}
                                    >
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={event.title}
                                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-200" />
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
                                                    {event.eventType ===
                                                    "official"
                                                        ? "Official"
                                                        : "Community"}
                                                </span>

                                                <span className="text-[10px] font-semibold uppercase tracking-wide text-white/60">
                                                    {event.category}
                                                </span>
                                            </div>

                                            <h3
                                                className={
                                                    isFeatured
                                                        ? "mt-3 max-w-lg text-3xl font-black leading-tight md:text-4xl"
                                                        : "mt-2 line-clamp-2 text-lg font-bold leading-tight"
                                                }
                                            >
                                                {event.title}
                                            </h3>

                                            <p className="mt-2 text-xs text-white/65">
                                                📍 {event.cityId}
                                            </p>
                                        </div>

                                        <div className="absolute right-5 top-5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-gray-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            ↗
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-[1.75rem] border border-dashed border-gray-300 bg-[#F8F8F6] p-12 text-center">
                            <p className="text-gray-500">
                                Todavía no hay eventos públicos disponibles.
                            </p>
                        </div>
                    )}

                    <div className="mt-5 md:hidden">
                        <Link
                            href="/events"
                            className="text-sm font-bold text-gray-950"
                        >
                            Ver todos los eventos →
                        </Link>
                    </div>
                </div>
            </section>

            {/* =========================================================
                03 — UNIFIED SEO
            ========================================================== */}

            <section className="border-b border-gray-100 bg-[#F8F8F6]">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                SEO unificado
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.05em] text-gray-950 md:text-7xl">
                                Deja de estar
                                <br />
                                <span className="text-[#4C76F2]">
                                    disperso.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
                                Tu negocio necesita más que una publicación en
                                redes sociales. Necesita una presencia
                                identificable, organizada y fácil de descubrir.
                            </p>

                            <Link
                                href="/register"
                                className="mt-9 inline-flex rounded-full bg-gray-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#4C76F2]"
                            >
                                Crear mi presencia →
                            </Link>
                        </div>

                        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-10">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                                        Tu presencia digital
                                    </p>

                                    <h3 className="mt-3 text-2xl font-black text-gray-950">
                                        Un solo lugar.
                                    </h3>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4C76F2]/10 text-xl">
                                    ✦
                                </div>
                            </div>

                            <div className="mt-10 space-y-3">
                                <div className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center gap-4">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-white">
                                            01
                                        </span>

                                        <div>
                                            <p className="font-bold text-gray-950">
                                                Información del negocio
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Categoría, ubicación y datos
                                                relevantes.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center gap-4">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4C76F2] text-white">
                                            02
                                        </span>

                                        <div>
                                            <p className="font-bold text-gray-950">
                                                Eventos y actividad
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Conecta tu negocio con lo que
                                                ocurre en la comunidad.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center gap-4">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2C94C] text-gray-950">
                                            03
                                        </span>

                                        <div>
                                            <p className="font-bold text-gray-950">
                                                Descubrimiento
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Facilita que nuevos clientes
                                                encuentren tu negocio.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                04 — BUSINESS INTELLIGENCE / STATS
            ========================================================== */}

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                Estadísticas
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-gray-950 md:text-6xl">
                                No publiques
                                <br />
                                <span className="text-[#4C76F2]">
                                    a ciegas.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
                                Una presencia digital también debería ayudarte a
                                entender qué está funcionando y cómo las
                                personas interactúan con tu negocio.
                            </p>

                            <p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
                                Con las estadísticas de Veci podrás convertir
                                la actividad de tu presencia en información
                                útil para tomar mejores decisiones.
                            </p>
                        </div>

                        <div className="rounded-[2.5rem] bg-gray-950 p-8 text-white md:p-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                                        Business insights
                                    </p>

                                    <h3 className="mt-3 text-2xl font-black">
                                        Entiende tu presencia.
                                    </h3>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                                    ↗
                                </div>
                            </div>

                            <div className="mt-10 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl bg-white/5 p-6">
                                    <p className="text-3xl font-black text-[#4C76F2]">
                                        Views
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-white/50">
                                        Descubre cuántas personas están
                                        interactuando con tu presencia.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-6">
                                    <p className="text-3xl font-black text-[#F2C94C]">
                                        Events
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-white/50">
                                        Conecta tu negocio con actividades y
                                        experiencias.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-6">
                                    <p className="text-3xl font-black text-white">
                                        Reach
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-white/50">
                                        Comprende mejor el alcance de tu
                                        presencia dentro de la comunidad.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-6">
                                    <p className="text-3xl font-black text-white">
                                        Growth
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-white/50">
                                        Utiliza la información para detectar
                                        nuevas oportunidades.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                05 — KNOW YOUR COMMUNITY
            ========================================================== */}

            <section className="border-y border-gray-100 bg-[#F8F8F6]">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="max-w-4xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                            Conoce tu comunidad
                        </p>

                        <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.05em] text-gray-950 md:text-7xl">
                            Tu comunidad
                            <br />
                            también puede
                            <br />
                            <span className="text-[#4C76F2]">
                                enseñarte algo.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                            Descubre qué negocios existen, qué eventos están
                            ocurriendo y qué intereses están moviendo a las
                            personas de tu ciudad.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-4 md:grid-cols-3">
                        <article className="rounded-[2rem] bg-white p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4C76F2]/10 text-xl">
                                👥
                            </div>

                            <h3 className="mt-7 text-2xl font-black text-gray-950">
                                Personas
                            </h3>

                            <p className="mt-3 text-base leading-7 text-gray-500">
                                Entiende mejor a las personas que forman parte
                                de tu comunidad y qué buscan.
                            </p>
                        </article>

                        <article className="rounded-[2rem] bg-white p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2C94C]/20 text-xl">
                                📍
                            </div>

                            <h3 className="mt-7 text-2xl font-black text-gray-950">
                                Negocios
                            </h3>

                            <p className="mt-3 text-base leading-7 text-gray-500">
                                Descubre otros negocios y posibles
                                oportunidades de colaboración.
                            </p>
                        </article>

                        <article className="rounded-[2rem] bg-white p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl">
                                🔥
                            </div>

                            <h3 className="mt-7 text-2xl font-black text-gray-950">
                                Actividad
                            </h3>

                            <p className="mt-3 text-base leading-7 text-gray-500">
                                Observa qué eventos, actividades y experiencias
                                están generando movimiento.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* =========================================================
                06 — FOR ENTREPRENEURS
            ========================================================== */}

            <section className="bg-gray-950 text-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="max-w-5xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/40">
                            Para emprendedores
                        </p>

                        <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-8xl">
                            No necesitas
                            <br />
                            solo más
                            <br />
                            <span className="text-[#F2C94C]">
                                seguidores.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-2xl text-xl leading-9 text-white/60 md:text-2xl">
                            Necesitas estar donde las personas descubren,
                            buscan, comparan y deciden qué hacer.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
                        <div>
                            <p className="text-4xl font-black text-[#4C76F2]">
                                Be visible.
                            </p>

                            <p className="mt-4 text-sm leading-7 text-white/50">
                                Crea una presencia digital específica para tu
                                negocio dentro de la comunidad.
                            </p>
                        </div>

                        <div>
                            <p className="text-4xl font-black text-[#F2C94C]">
                                Be discoverable.
                            </p>

                            <p className="mt-4 text-sm leading-7 text-white/50">
                                Haz que sea más fácil para las personas
                                encontrar lo que ofreces.
                            </p>
                        </div>

                        <div>
                            <p className="text-4xl font-black text-white">
                                Be connected.
                            </p>

                            <p className="mt-4 text-sm leading-7 text-white/50">
                                Conecta tu negocio con eventos, personas y
                                otros emprendedores.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/register"
                        className="mt-12 inline-flex rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-[#F2C94C]"
                    >
                        Crear mi negocio →
                    </Link>
                </div>
            </section>

            {/* =========================================================
                07 — BUSINESS DIRECTORY
            ========================================================== */}

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                El ecosistema
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-gray-950 md:text-5xl">
                                Negocios que ya están aquí.
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
                                Explora restaurantes, tiendas, servicios y
                                emprendimientos de la comunidad.
                            </p>
                        </div>

                        <Link
                            href="/business"
                            className="text-sm font-bold text-gray-950 transition hover:text-[#4C76F2]"
                        >
                            Ver todos →
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        {categories.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-gray-200 bg-[#F8F8F6] px-4 py-2 text-sm font-medium text-gray-600"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {businesses.length > 0 ? (
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {businesses.map((business) => (
                                <Link
                                    key={business.id}
                                    href={`/business/${business.slug}`}
                                    className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                                        {business.image ? (
                                            <img
                                                src={business.image}
                                                alt={business.name}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                Imagen del negocio
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            {business.category}
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold text-gray-950 transition group-hover:text-[#4C76F2]">
                                            {business.name}
                                        </h3>

                                        {business.subCategory && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                {business.subCategory}
                                            </p>
                                        )}

                                        <p className="mt-5 text-sm text-gray-500">
                                            📍 {business.cityId}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-12 rounded-[2rem] border border-dashed border-gray-300 bg-[#F8F8F6] p-16 text-center">
                            <p className="text-gray-500">
                                Todavía no hay negocios públicos disponibles.
                            </p>

                            <Link
                                href="/register"
                                className="mt-5 inline-flex font-semibold text-gray-950 transition hover:text-[#4C76F2]"
                            >
                                Añadir mi negocio →
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================================
                08 — FINAL CTA
            ========================================================== */}

            <section className="px-6 pb-24 md:pb-32">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#F2C94C] px-8 py-20 md:px-16 md:py-24">
                    <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="max-w-4xl">
                            <p className="text-sm font-black uppercase tracking-[0.22em] text-gray-900/50">
                                Para negocios y emprendedores
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.055em] text-gray-950 md:text-7xl">
                                Tu negocio
                                <br />
                                merece ser
                                <br />
                                <span className="text-[#4C76F2]">
                                    descubierto.
                                </span>
                            </h2>

                            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-900/65">
                                Crea tu presencia en Veci, conecta con tu
                                comunidad y empieza a construir una presencia
                                digital alrededor de tu negocio.
                            </p>
                        </div>

                        <Link
                            href="/register"
                            className="rounded-full bg-gray-950 px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-gray-800"
                        >
                            Crear mi negocio →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}