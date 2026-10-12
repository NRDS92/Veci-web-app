import { getTranslations } from "next-intl/server";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({
  params,
}: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Privacy",
  });

  const sections = [
    {
      title: t("page.dataTitle"),
      content: t("page.dataDescription"),
    },
    {
      title: t("page.accountTitle"),
      content: t("page.accountDescription"),
    },
    {
      title: t("page.communityTitle"),
      content: t("page.communityDescription"),
    },
    {
      title: t("page.analyticsTitle"),
      content: t("page.analyticsDescription"),
    },
    {
      title: t("page.storageTitle"),
      content: t("page.storageDescription"),
    },
    {
      title: t("page.rightsTitle"),
      content: t("page.rightsDescription"),
    },
    {
      title: t("page.deletionTitle"),
      content: t("page.deletionDescription"),
    },
    {
      title: t("page.contactTitle"),
      content: t("page.contactDescription"),
    },
  ];

  return (
    <main className="min-h-screen bg-white px-4 py-12 text-gray-900 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-gray-200 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Veci
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("page.title")}
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            {t("page.introduction")}
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold">
                {section.title}
              </h2>

              <p className="mt-3 whitespace-pre-line leading-7 text-gray-700">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-gray-200 pt-6">
          <a
            href={`/${locale}`}
            className="text-sm font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900"
          >
            {t("page.backHome")}
          </a>
        </footer>
      </article>
    </main>
  );
}