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

const cities = ["Cologne", "Berlin", "Madrid"];

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
                01 — EVENTS FIRST
            ========================================================== */}

            <section className="relative overflow-hidden border-b border-gray-100 pt-32 pb-24">
                <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                    {/* TEXT */}

                    <div className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                            Veci Events
                        </p>

                        <h1 className="mt-5 text-6xl font-black leading-[0.9] tracking-[-0.05em] text-gray-950 md:text-7xl lg:text-[5.5rem]">
                            Something is
                            <br />
                            <span className="text-[#4C76F2]">
                                happening.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
                            Parties, food, culture, sports and community
                            experiences created by Latin Americans across
                            Europe.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {categories.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                href="/events"
                                className="rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                Explore all events →
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-900"
                            >
                                Create an event
                            </Link>
                        </div>
                    </div>

                    {/* FEATURED EVENTS */}

                    <div className="w-full">
                        <EventHeroCarousel events={events} />
                    </div>
                </div>
            </section>

            {/* =========================================================
                02 — THE IMPORTANT QUESTION
            ========================================================== */}

            <section className="border-b border-gray-100 bg-[#F8F8F6]">
                <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
                    <div className="max-w-4xl">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                            Before you discover
                        </p>

                        <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-gray-950 md:text-6xl">
                            Not every event
                            <br />
                            works the same way.
                        </h2>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
                            Veci has two types of events. Both are part of the
                            community, but they are created differently and
                            give you different levels of context.
                        </p>
                    </div>

                    {/* EVENT TYPES */}

                    <div className="mt-16 grid gap-6 lg:grid-cols-2">
                        {/* COMMUNITY */}

                        <article className="group rounded-[2rem] border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl md:p-10">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                                        01
                                    </p>

                                    <h3 className="mt-4 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                                        Community event
                                    </h3>
                                </div>

                                <div className="rounded-2xl bg-gray-100 px-4 py-3 text-2xl">
                                    🌎
                                </div>
                            </div>

                            <p className="mt-6 text-base leading-7 text-gray-600">
                                An event created directly by a member of the
                                Veci community. Anyone can create one after
                                creating a Veci account.
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="flex gap-4">
                                    <span className="mt-1 text-sm font-bold text-gray-400">
                                        01
                                    </span>

                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            Create your account
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            Join Veci and become part of the
                                            community.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <span className="mt-1 text-sm font-bold text-gray-400">
                                        02
                                    </span>

                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            Create your event
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            Add the title, description,
                                            location, date, images and all
                                            relevant information.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <span className="mt-1 text-sm font-bold text-gray-400">
                                        03
                                    </span>

                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            Share it with the community
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            Your event becomes discoverable on
                                            Veci.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/register"
                                className="mt-10 inline-flex text-sm font-bold text-gray-950 transition hover:text-[#4C76F2]"
                            >
                                Create a community event →
                            </Link>
                        </article>

                        {/* OFFICIAL */}

                        <article className="relative overflow-hidden rounded-[2rem] bg-gray-950 p-8 text-white transition hover:-translate-y-1 hover:shadow-2xl md:p-10">
                            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#4C76F2]/20 blur-3xl" />

                            <div className="relative">
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                                            02
                                        </p>

                                        <h3 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                                            Official event
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl bg-white/10 px-4 py-3 text-2xl">
                                        ✦
                                    </div>
                                </div>

                                <p className="mt-6 text-base leading-7 text-white/65">
                                    An event connected to a business that
                                    exists on Veci. This gives the community
                                    more context about who is behind the
                                    event.
                                </p>

                                <div className="mt-8 space-y-4">
                                    <div className="flex gap-4">
                                        <span className="mt-1 text-sm font-bold text-white/30">
                                            01
                                        </span>

                                        <div>
                                            <p className="font-semibold">
                                                Create a business
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-white/50">
                                                Create your business profile
                                                inside Veci.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <span className="mt-1 text-sm font-bold text-white/30">
                                            02
                                        </span>

                                        <div>
                                            <p className="font-semibold">
                                                Connect your event
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-white/50">
                                                Create an event and attach it
                                                to your business.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <span className="mt-1 text-sm font-bold text-white/30">
                                            03
                                        </span>

                                        <div>
                                            <p className="font-semibold">
                                                Build trust
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-white/50">
                                                People can discover the event
                                                together with the business
                                                behind it.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/businesses"
                                    className="mt-10 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-[#F2C94C]"
                                >
                                    Create a business →
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            {/* =========================================================
                05 — UPCOMING EVENTS
            ========================================================== */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py:8 md:py-12">
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

                    {events.length === 0 ? (
                        <div className="mt-12 rounded-[2rem] border border-dashed border-gray-300 bg-[#F8F8F6] p-16 text-center">
                            <p className="text-gray-500">
                                No public events available right now.
                            </p>

                            <Link
                                href="/register"
                                className="mt-5 inline-flex font-semibold text-gray-950"
                            >
                                Be the first to create one →
                            </Link>
                        </div>
                    ) : (
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
                                                {event.eventType ===
                                                "official"
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
                    )}

                    <div className="mt-8 md:hidden">
                        <Link
                            href="/events"
                            className="text-sm font-bold text-gray-950"
                        >
                            View all events →
                        </Link>
                    </div>
                </div>
            </section>

            {/* =========================================================
                06 — CREATE
            ========================================================== */}

            <section className="px-6 pb-24">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gray-950 px-8 py-8  text-white md:px-16 md:py-12">
                    <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="max-w-3xl">
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/40">
                                Your turn
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl">
                                Don&apos;t just
                                <br />
                                discover Veci.
                                <br />
                                <span className="text-[#F2C94C]">
                                    Build it.
                                </span>
                            </h2>

                            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
                                Start with an event. Build a business. Create
                                something that brings people together.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            <Link
                                href="/register"
                                className="rounded-full bg-white px-7 py-4 text-center text-sm font-bold text-gray-950 transition hover:bg-[#F2C94C]"
                            >
                                Create a community event
                            </Link>

                            <Link
                                href="/businesses"
                                className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
                            >
                                Create a business
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                07 — SIMPLE FOOTER MESSAGE
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