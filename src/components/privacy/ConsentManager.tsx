
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";

type Consent = {
  version: number;
  analytics: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "veci-consent";
const CONSENT_VERSION = 1;

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function setAnalyticsDisabled(disabled: boolean) {
  if (!GA_ID || typeof window === "undefined") return;

  const key = `ga-disable-${GA_ID}`;

  (window as unknown as Record<string, unknown>)[key] = disabled;
}

function isValidConsent(value: unknown): value is Consent {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    candidate.version === CONSENT_VERSION &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.updatedAt === "string" &&
    !Number.isNaN(Date.parse(candidate.updatedAt))
  );
}

export default function ConsentManager() {
  const t = useTranslations("Privacy");

  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Analytics is disabled unless valid consent is found.
    setAnalyticsDisabled(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored !== null) {
        const parsed: unknown = JSON.parse(stored);

        if (isValidConsent(parsed)) {
          setAnalyticsDisabled(!parsed.analytics);
          setConsent(parsed);
          setAnalyticsEnabled(parsed.analytics);
        }
      }
    } catch {
      setAnalyticsDisabled(true);
    } finally {
      setReady(true);
    }
  }, []);

  function saveConsent(analytics: boolean) {
    const nextConsent: Consent = {
      version: CONSENT_VERSION,
      analytics,
      updatedAt: new Date().toISOString(),
    };

    // Apply the decision before updating the UI.
    setAnalyticsDisabled(!analytics);

    setConsent(nextConsent);
    setAnalyticsEnabled(analytics);
    setSettingsOpen(false);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextConsent)
      );
    } catch {
      // Keep the decision in memory.
      // After reload, analytics defaults to disabled.
    }
  }

  if (!ready) return null;

  return (
    <>
      {consent?.analytics === true && <GoogleAnalytics />}

      {consent === null || settingsOpen ? (
        <section
          role="region"
          aria-label={t("title")}
          aria-describedby="veci-consent-description"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-2xl"
        >
          <h2 className="text-lg font-semibold">
            {t("title")}
          </h2>

          <p
            id="veci-consent-description"
            className="mt-2 text-sm leading-6 text-gray-600"
          >
            {t("description")}
          </p>

          {settingsOpen && (
            <label className="mt-4 flex items-start gap-3 rounded-lg bg-gray-50 p-3">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) =>
                  setAnalyticsEnabled(event.target.checked)
                }
                className="mt-1"
              />

              <span>
                <span className="block font-medium">
                  {t("analytics")}
                </span>

                <span className="text-sm text-gray-600">
                  {t("analyticsDescription")}
                </span>
              </span>
            </label>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {!settingsOpen ? (
              <>
                <button
                  type="button"
                  onClick={() => saveConsent(true)}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                  {t("accept")}
                </button>

                <button
                  type="button"
                  onClick={() => saveConsent(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  {t("reject")}
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  {t("customize")}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => saveConsent(analyticsEnabled)}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                  {t("save")}
                </button>

                <button
                  type="button"
                  onClick={() => saveConsent(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  {t("reject")}
                </button>
              </>
            )}
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => {
            setAnalyticsEnabled(consent.analytics);
            setSettingsOpen(true);
          }}
          className="fixed bottom-4 left-4 z-[90] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow"
        >
          {t("settings")}
        </button>
      )}
    </>
  );
}
