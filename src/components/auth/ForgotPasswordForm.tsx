"use client";

import { useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { authService } from "@/features/auth/auth.service";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordForm() {
  const t = useTranslations("PasswordSecurity");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting.current || submitted) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError(t("invalidEmail"));
      return;
    }

    submitting.current = true;
    setLoading(true);
    setError("");

    try {
      await authService.forgotPassword({ email: normalizedEmail });
      setSubmitted(true);
    } catch {
      setError(t("forgotError"));
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <section className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {t("forgotTitle")}
        </h1>
        <p className="mb-8 text-gray-500">{t("forgotDescription")}</p>

        <form
          aria-label="forgot-password-form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="forgot-password-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {t("emailLabel")}
            </label>
            <input
              id="forgot-password-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading || submitted}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "forgot-password-error" : undefined}
              placeholder={t("emailPlaceholder")}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {error && (
            <p
              id="forgot-password-error"
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {submitted && (
            <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {t("forgotSuccess")}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || submitted}
            className="w-full rounded-lg bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t("sendingForgot") : t("submitForgot")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {t("backToLogin")}
          </Link>
        </div>
      </section>
    </main>
  );
}