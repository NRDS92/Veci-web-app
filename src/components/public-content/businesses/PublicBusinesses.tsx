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
    const businesses = await getPublicBusinesses({
        cityId,
        category,
        limit: 10,
    });

    return (
        <main className="min-h-screen bg-white">
            {/* =========================================================
                01 — HERO
            ========================================================== */}

            <section className="border-b border-gray-100 pt-32 pb-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-5xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                            Veci Business
                        </p>

                        <h1 className="mt-6 max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.055em] text-gray-950 md:text-8xl">
                            Tu comunidad
                            <br />
                            también es
                            <br />
                            <span className="text-[#4C76F2]">
                                tu mercado.
                            </span>
                        </h1>

                        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                            <p className="max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                                Entiende qué está pasando, llega a las personas
                                que buscas y encuentra oportunidades para hacer
                                crecer tu negocio dentro de la comunidad
                                latina en Europa.
                            </p>

                            <div className="flex shrink-0 flex-wrap gap-3">
                                <Link
                                    href="/register"
                                    className="rounded-full bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
                                >
                                    Añadir mi negocio →
                                </Link>

                                <Link
                                    href="/events"
                                    className="rounded-full border border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:border-gray-950"
                                >
                                    Explorar comunidad
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                02 — COMMUNITY SIGNALS / BUSINESS BENTO
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
                                Descubre los negocios que forman parte de tu comunidad
                                y encuentra nuevas oportunidades para conectar y colaborar.
                            </p>
                        </div>

                        <Link
                            href="/business"
                            className="hidden text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:block"
                        >
                            Ver negocios →
                        </Link>
                    </div>

                    {businesses.length > 0 ? (
                        <div className="grid h-[480px] gap-3 md:grid-cols-4 md:grid-rows-2">
                            {businesses.slice(0, 5).map((business, index) => {
                                const isFeatured = index === 0;

                                const isTall =
                                    index === 1 || index === 3;

                                return (
                                    <Link
                                        key={business.id}
                                        href={`/business/${business.slug}`}
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
                                        {business.image ? (
                                            <img
                                                src={business.image}
                                                alt={business.name}
                                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-200" />
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
                                                    {business.category}
                                                </span>
                                            </div>

                                            <h3
                                                className={
                                                    isFeatured
                                                        ? "mt-3 max-w-lg text-3xl font-black leading-tight md:text-4xl"
                                                        : "mt-2 line-clamp-2 text-lg font-bold leading-tight"
                                                }
                                            >
                                                {business.name}
                                            </h3>

                                            <p className="mt-2 text-xs text-white/65">
                                                📍 {business.cityId}
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
                                Todavía no hay negocios públicos disponibles.
                            </p>
                        </div>
                    )}

                    <div className="mt-5 md:hidden">
                        <Link
                            href="/business"
                            className="text-sm font-bold text-gray-950"
                        >
                            Ver todos los negocios →
                        </Link>
                    </div>
                </div>
            </section>

            {/* =========================================================
                03 — WHAT YOU NEED
            ========================================================== */}

            <section className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                Lo que necesitas
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-gray-950 md:text-6xl">
                                Menos ruido.
                                <br />
                                Más contexto.
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {/* 01 */}

                            <div className="grid gap-4 py-7 md:grid-cols-[80px_1fr]">
                                <span className="text-3xl font-black text-[#4C76F2]">
                                    01
                                </span>

                                <div>
                                    <h3 className="text-2xl font-black text-gray-950">
                                        Saber qué está pasando
                                    </h3>

                                    <p className="mt-3 max-w-xl text-base leading-7 text-gray-500">
                                        Eventos, actividades y comunidades que
                                        están moviendo personas alrededor de
                                        tu ciudad.
                                    </p>
                                </div>
                            </div>

                            {/* 02 */}

                            <div className="grid gap-4 py-7 md:grid-cols-[80px_1fr]">
                                <span className="text-3xl font-black text-[#F2C94C]">
                                    02
                                </span>

                                <div>
                                    <h3 className="text-2xl font-black text-gray-950">
                                        Llegar a tu público
                                    </h3>

                                    <p className="mt-3 max-w-xl text-base leading-7 text-gray-500">
                                        Pon tu negocio delante de las personas
                                        que pueden estar buscando exactamente
                                        lo que ofreces.
                                    </p>
                                </div>
                            </div>

                            {/* 03 */}

                            <div className="grid gap-4 py-7 md:grid-cols-[80px_1fr]">
                                <span className="text-3xl font-black text-gray-300">
                                    03
                                </span>

                                <div>
                                    <h3 className="text-2xl font-black text-gray-950">
                                        Comunicarte con la comunidad
                                    </h3>

                                    <p className="mt-3 max-w-xl text-base leading-7 text-gray-500">
                                        Informa sobre tus eventos, noticias,
                                        lanzamientos, promociones y
                                        oportunidades.
                                    </p>
                                </div>
                            </div>

                            {/* 04 */}

                            <div className="grid gap-4 py-7 md:grid-cols-[80px_1fr]">
                                <span className="text-3xl font-black text-gray-300">
                                    04
                                </span>

                                <div>
                                    <h3 className="text-2xl font-black text-gray-950">
                                        Detectar oportunidades
                                    </h3>

                                    <p className="mt-3 max-w-xl text-base leading-7 text-gray-500">
                                        Observa los eventos y movimientos de la
                                        comunidad para pensar en campañas,
                                        colaboraciones, productos o nuevos
                                        planes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                04 — THE IDEA
            ========================================================== */}

            <section className="bg-gray-950 text-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="max-w-5xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/40">
                            Veci changes the question
                        </p>

                        <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-8xl">
                            No se trata solo
                            <br />
                            de anunciarte.
                        </h2>

                        <p className="mt-8 max-w-2xl text-xl leading-9 text-white/60 md:text-2xl">
                            Se trata de entender qué está pasando alrededor de
                            tu negocio y decidir qué puedes hacer con esa
                            información.
                        </p>

                        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
                            <div>
                                <p className="text-4xl font-black text-[#4C76F2]">
                                    Observe.
                                </p>

                                <p className="mt-3 text-sm leading-6 text-white/50">
                                    Mira los eventos, negocios y movimientos de
                                    la comunidad.
                                </p>
                            </div>

                            <div>
                                <p className="text-4xl font-black text-[#F2C94C]">
                                    Understand.
                                </p>

                                <p className="mt-3 text-sm leading-6 text-white/50">
                                    Identifica qué puede ser relevante para tu
                                    público.
                                </p>
                            </div>

                            <div>
                                <p className="text-4xl font-black text-white">
                                    Act.
                                </p>

                                <p className="mt-3 text-sm leading-6 text-white/50">
                                    Convierte esa información en acciones.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                05 — BUSINESS DIRECTORY
            ========================================================== */}

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                                El ecosistema
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-gray-950 md:text-5xl">
                                Negocios que ya están aquí.
                            </h2>
                        </div>

                        <Link
                            href="/business"
                            className="hidden text-sm font-bold text-gray-950 hover:text-[#4C76F2] md:block"
                        >
                            Ver todos →
                        </Link>
                    </div>

                    {businesses.length > 0 && (
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {businesses.map((business) => (
                                <Link
                                    key={business.id}
                                    href={`/business/${business.slug}`}
                                    className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
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

                                        <h3 className="mt-2 text-xl font-bold text-gray-950">
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
                    )}

                    <div className="mt-8 md:hidden">
                        <Link
                            href="/business"
                            className="text-sm font-bold text-gray-950"
                        >
                            Ver todos los negocios →
                        </Link>
                    </div>
                </div>
            </section>

            {/* =========================================================
                06 — FINAL CTA
            ========================================================== */}

            <section className="px-6 pb-24">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#F2C94C] px-8 py-20 md:px-16 md:py-24">
                    <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="max-w-4xl">
                            <p className="text-sm font-black uppercase tracking-[0.22em] text-gray-900/50">
                                Para negocios y emprendedores
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.055em] text-gray-950 md:text-7xl">
                                Pon tu negocio
                                <br />
                                donde está
                                <br />
                                tu comunidad.
                            </h2>

                            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-900/65">
                                Crea tu presencia en Veci y empieza a formar
                                parte del ecosistema.
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