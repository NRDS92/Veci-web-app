
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getPublicBusinesses } from "@/lib/api/public-content";

interface PublicBusinessesProps {
  cityId?: string;
  category?: string;
  limit?: number;
}

const categories = [
  "restaurants",
  "cafes",
  "shops",
  "services",
  "beauty",
  "health",
] as const;

const benefitKeys = [
  "visibility",
  "community",
  "businessProfile",
  "opportunities",
] as const;

type BusinessStep = {
  title: string;
  description: string;
};

export default async function PublicBusinesses({
  cityId,
  category,
  limit = 10,
}: PublicBusinessesProps) {
  const t = await getTranslations("PublicBusinesses");
  const locale = await getLocale();

  const businesses = await getPublicBusinesses({
    cityId,
    category,
    limit,
  });

  const categoryLabels = t.raw("categories") as Record<string, string>;
  const benefits = t.raw("whyVeci.benefits") as Record<
    string,
    { title: string; description: string }
  >;
  const steps = t.raw("whyVeci.steps") as BusinessStep[];

  const featuredBusinesses = businesses.slice(0, 5);
  const directoryBusinesses = businesses.slice(5);

  return (
    <main className="min-h-screen bg-white">
      {/* 01 — BUSINESS DISCOVERY */}
      <section className="border-b border-gray-100 bg-[#F8F8F6] pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
              {t("discovery.eyebrow")}
            </p>

            <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.055em] text-gray-950 md:text-7xl lg:text-8xl">
              {t("discovery.titleLine1")}
              <br />
              {t("discovery.titleLine2")}
              <br />
              <span className="text-[#4C76F2]">
                {t("discovery.titleLine3")}
              </span>
            </h1>

            <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
                {t("discovery.description")}
              </p>

              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-full bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  {t("discovery.primaryCta")} →
                </Link>

                <Link
                  href="/events"
                  className="rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:border-gray-950"
                >
                  {t("discovery.secondaryCta")}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {categories.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600"
              >
                {categoryLabels[item]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS BENTO */}
      <section className="border-b border-gray-100 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-7 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                {t("discovery.listEyebrow")}
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 md:text-3xl">
                {t("discovery.listTitle")}
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                {t("discovery.listDescription")}
              </p>
            </div>

            <Link
              href="/business"
              className="hidden shrink-0 text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:block"
            >
              {t("discovery.viewAll")} →
            </Link>
          </div>

          {featuredBusinesses.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 md:h-[540px] md:grid-cols-4 md:grid-rows-2">
              {featuredBusinesses.map((business, index) => {
                const isFeatured = index === 0;
                const isTall = index === 1 || index === 3;

                return (
                  <Link
                    key={business.id}
                    href={`/business/${business.slug}`}
                    className={[
                      "group relative min-h-[230px] overflow-hidden rounded-[1.75rem] bg-gray-200 md:min-h-0",
                      isFeatured ? "md:col-span-2 md:row-span-2" : "",
                      isTall ? "md:row-span-2" : "",
                    ].join(" ")}
                  >
                    {business.image ? (
                      <img
                        src={business.image}
                        alt={business.name}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-6">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
                        {categoryLabels[business.category] ??
                          business.category}
                      </span>

                      <h3
                        className={
                          isFeatured
                            ? "mt-4 max-w-lg text-3xl font-black leading-tight md:text-4xl"
                            : "mt-3 line-clamp-2 text-lg font-bold leading-tight"
                        }
                      >
                        {business.name}
                      </h3>

                      <p className="mt-2 text-xs text-white/65">
                        📍 {business.cityId}
                      </p>
                    </div>

                    <span className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-gray-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      ↗
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-gray-300 bg-[#F8F8F6] p-12 text-center">
              <p className="text-gray-500">{t("businesses.empty")}</p>
              <Link
                href="/register"
                className="mt-5 inline-flex font-bold text-gray-950 hover:text-[#4C76F2]"
              >
                {t("businesses.createFirst")} →
              </Link>
            </div>
          )}

          <div className="mt-6 md:hidden">
            <Link
              href="/business"
              className="text-sm font-bold text-gray-950"
            >
              {t("discovery.viewAll")} →
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — WHY VECI + HOW IT WORKS + YOUR BUSINESS BELONGS HERE */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* VALUE PROPOSITION */}
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

              <div className="mt-8 space-y-3">
                {benefitKeys.map((key, index) => (
                  <div
                    key={key}
                    className="flex gap-4 rounded-2xl border border-gray-100 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4C76F2]/10 font-bold text-[#4C76F2]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-bold text-gray-950">
                        {benefits[key].title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {benefits[key].description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className="mt-8 inline-flex rounded-full bg-gray-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#4C76F2]"
              >
                {t("whyVeci.primaryCta")} →
              </Link>
            </div>

            {/* HOW IT WORKS + BUSINESS CTA */}
            <div className="rounded-[2.5rem] bg-[#F8F8F6] p-6 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                {t("whyVeci.processEyebrow")}
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
                {t("whyVeci.processTitle")}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {t("whyVeci.processDescription")}
              </p>

              <div className="mt-8 space-y-3">
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
                  {t("whyVeci.businessBelongsEyebrow")}
                </p>

                <h3 className="mt-3 text-2xl font-black md:text-3xl">
                  {t("whyVeci.businessBelongsTitle")}
                </h3>

                <p className="mt-3 leading-7 text-white/65">
                  {t("whyVeci.businessBelongsDescription")}
                </p>

                <Link
                  href="/register"
                  className="mt-6 inline-flex rounded-full bg-[#F2C94C] px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-white"
                >
                  {t("whyVeci.primaryCta")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — DISCOVER MORE BUSINESSES */}
      <section className="bg-[#F8F8F6]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gray-400">
                {t("directory.eyebrow")}
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-gray-950 md:text-5xl">
                {t("directory.title")}
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-gray-600">
                {t("directory.description")}
              </p>
            </div>

            <Link
              href="/business"
              className="hidden shrink-0 text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:block"
            >
              {t("directory.viewAll")} →
            </Link>
          </div>

          {directoryBusinesses.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {directoryBusinesses.map((business) => (
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
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        {t("businesses.imageFallback")}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      {categoryLabels[business.category] ??
                        business.category}
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
          ) : (
            <p className="mt-10 text-gray-500">
              {t("directory.noMoreBusinesses")}
            </p>
          )}

          <Link
            href="/business"
            className="mt-8 inline-flex text-sm font-bold text-gray-950 transition hover:text-[#4C76F2] md:hidden"
          >
            {t("directory.viewAll")} →
          </Link>
        </div>
      </section>
    </main>
  );
}