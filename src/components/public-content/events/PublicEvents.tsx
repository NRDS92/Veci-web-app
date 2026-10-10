
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getPublicEvents } from "@/lib/api/public-content";

interface PublicEventsProps {
  cityId?: string;
  category?: string;
  limit?: number;
}

type EventStep = {
  title: string;
  description: string;
};

const categories = [
  "music",
  "culture",
  "party",
  "food",
  "sports",
  "community",
] as const;

export default async function PublicEvents({
  cityId,
  category,
  limit = 6,
}: PublicEventsProps) {
  const t = await getTranslations("PublicEvents");
  const locale = await getLocale();

  const events = await getPublicEvents({
    cityId,
    category,
    limit,
  });

  const steps = t.raw("whyVeci.steps") as EventStep[];

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  });

  return (
    <main className="min-h-screen bg-white">
      {/* 01 — DISCOVERY / WHAT'S HAPPENING */}
      <section className="border-b border-gray-100 bg-[#F8F8F6] pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                {t("discovery.eyebrow")}
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-gray-950 md:text-7xl">
                {t("discovery.titleLine1")}
                <br />
                <span className="text-[#4C76F2]">
                  {t("discovery.titleLine2")}
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                {t("discovery.description")}
              </p>
            </div>

            <Link
              href="/events"
              className="shrink-0 text-sm font-bold text-gray-950 transition hover:text-[#4C76F2]"
            >
              {t("discovery.exploreAll")} →
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="mt-14 md:h-[600px]">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:h-full md:grid-cols-4 md:grid-rows-2">
                {events.slice(0, 10).map((event, index) => {
                  const isFeatured = index === 0;
                  const isWide = index === 3 || index === 7;

                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className={[
                        "group relative min-h-[240px] overflow-hidden rounded-[1.75rem] bg-gray-200 md:min-h-0",
                        isFeatured
                          ? "md:col-span-2 md:row-span-2"
                          : isWide
                            ? "md:col-span-2"
                            : "",
                      ].join(" ")}
                    >
                      {event.images?.[0] ? (
                        <img
                          src={event.images[0]}
                          alt={event.title}
                          loading={index === 0 ? "eager" : "lazy"}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-sm text-gray-400">
                          {t("events.imageFallback")}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-900 backdrop-blur-sm">
                            {t.has(`categories.${event.category}`)
                              ? t(`categories.${event.category}`)
                              : event.category}
                          </span>

                          {event.eventType === "official" && (
                            <span className="rounded-full bg-[#F2C94C] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-950">
                              {t("events.official")}
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

                      <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-gray-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        ↗
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-14 rounded-[2rem] border border-dashed border-gray-300 bg-white p-10 text-center md:p-16">
              <p className="text-gray-500">
                {t("events.empty")}
              </p>

              <Link
                href="/create"
                className="mt-5 inline-flex font-semibold text-gray-950 transition hover:text-[#4C76F2]"
              >
                {t("events.createFirst")} →
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600"
              >
                {t(`categories.${item}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — ONE COMBINED SECTION:
          WHY VECI + SIMPLE PROCESS + YOUR EVENT BELONGS HERE */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* VALUE PROPOSITION + CTA */}
            <div className="lg:sticky lg:top-24">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                {t("whyVeci.eyebrow")}
              </p>

              <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-gray-950 md:text-6xl">
                {t("whyVeci.titleLine1")}
                <br />
                <span className="text-[#4C76F2]">
                  {t("whyVeci.titleLine2")}
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
                {t("whyVeci.description")}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {(["discoverability", "community", "eventPage", "sharing"] as const).map(
                  (benefit, index) => (
                    <div
                      key={benefit}
                      className="flex gap-4 rounded-2xl border border-gray-100 p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4C76F2]/10 font-bold text-[#4C76F2]">
                        {["↗", "◎", "▤", "↗"][index]}
                      </span>

                      <div>
                        <h3 className="font-bold text-gray-950">
                          {t(`whyVeci.benefits.${benefit}.title`)}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {t(`whyVeci.benefits.${benefit}.description`)}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/create"
                  className="rounded-full bg-gray-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#4C76F2]"
                >
                  {t("whyVeci.primaryCta")} →
                </Link>

                <Link
                  href="/events"
                  className="rounded-full border border-gray-200 px-7 py-4 text-sm font-bold text-gray-900 transition hover:border-gray-900"
                >
                  {t("whyVeci.secondaryCta")}
                </Link>
              </div>
            </div>

            {/* SIMPLE PROCESS */}
            <div className="rounded-[2.5rem] bg-[#F8F8F6] p-6 md:p-10">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                  {t("whyVeci.processEyebrow")}
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                  {t("whyVeci.processTitle")}
                </h3>
                <p className="mt-4 leading-7 text-gray-600">
                  {t("whyVeci.processDescription")}
                </p>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <article
                    key={step.title}
                    className="rounded-[1.5rem] border border-gray-200 bg-white p-6 md:p-7"
                  >
                    <div className="flex gap-5">
                      <span className="pt-1 text-sm font-black text-[#4C76F2]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h4 className="text-xl font-black text-gray-950 md:text-2xl">
                          {step.title}
                        </h4>
                        <p className="mt-3 leading-7 text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-gray-950 p-6 text-white md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                  {t("whyVeci.eventBelongsEyebrow")}
                </p>
                <h3 className="mt-3 text-2xl font-black md:text-3xl">
                  {t("whyVeci.eventBelongsTitle")}
                </h3>
                <p className="mt-3 leading-7 text-white/65">
                  {t("whyVeci.eventBelongsDescription")}
                </p>
                <Link
                  href="/create"
                  className="mt-6 inline-flex rounded-full bg-[#F2C94C] px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-white"
                >
                  {t("whyVeci.primaryCta")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SEE WHAT'S COMING */}
      <section className="bg-[#F8F8F6]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                {t("upcoming.eyebrow")}
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-gray-950 md:text-5xl">
                {t("upcoming.title")}
              </h2>
            </div>

            <Link
              href="/events"
              className="hidden shrink-0 text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:block"
            >
              {t("upcoming.viewAll")} →
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.slice(0, 3).map((event) => (
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
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        {t("events.imageFallback")}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                        {t.has(`categories.${event.category}`)
                          ? t(`categories.${event.category}`)
                          : event.category}
                      </p>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                        {event.eventType === "official"
                          ? t("events.official")
                          : t("events.community")}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-gray-950">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-sm text-gray-500">
                      📍 {event.cityId}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      {dateFormatter.format(new Date(event.dateStart))}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[2rem] border border-dashed border-gray-300 bg-white p-10 text-center md:p-16">
              <p className="text-gray-500">{t("events.empty")}</p>
            </div>
          )}

          <Link
            href="/events"
            className="mt-8 inline-flex text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:hidden"
          >
            {t("upcoming.viewAll")} →
          </Link>
        </div>
      </section>
    </main>
  );
}