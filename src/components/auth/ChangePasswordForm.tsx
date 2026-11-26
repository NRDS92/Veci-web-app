"use client";

import axios from "axios";
import { useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import { useNotification } from "@/components/notifications/NotificationProvider";
import { authService } from "@/features/auth/auth.service";
import { ChangePasswordRequestSchema } from "@ndrs92/contracts";

export default function ChangePasswordForm() {
  const t = useTranslations("PasswordSecurity");
  const { user, setSessionToken } = useAuth();
  const { notify } = useNotification();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"current" | "new" | "confirm" | null>(null);
  const submitLock = useRef(false);

  if (user?.provider === "google") {
    return (
      <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-28 sm:px-6">
        <section className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("changeTitle")}</h1>
          <p role="status" className="mt-3 text-gray-600">{t("googleOnly")}</p>
          <Link href="/profile" className="mt-6 inline-flex rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-900">{t("backToProfile")}</Link>
        </section>
      </main>
    );
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitLock.current) return;
    setError("");
    setErrorField(null);
    if (!currentPassword) {
      setError(t("currentRequired"));
      setErrorField("current");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("mismatch"));
      setErrorField("confirm");
      return;
    }
    const parsed = ChangePasswordRequestSchema.safeParse({ currentPassword, newPassword });
    if (!parsed.success) {
      setError(t("policyError"));
      setErrorField("new");
      return;
    }
    submitLock.current = true;
    setLoading(true);
    try {
      const response = await authService.changePassword(parsed.data);
      await setSessionToken(response.data.data.token);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      notify({ type: "success", title: t("successTitle"), message: t("successMessage") });
    } catch (caught: unknown) {
      const code = axios.isAxiosError(caught) ? caught.response?.data?.code : undefined;
      if (code === "INVALID_CURRENT_PASSWORD") {
        setError(t("invalidCurrentPassword"));
        setErrorField("current");
      }
      else if (code === "GOOGLE_ACCOUNT_NO_PASSWORD") setError(t("googleOnly"));
      else if (code === "VALIDATION_ERROR" || code === "PASSWORD_REUSE") {
        setError(t("policyError"));
        setErrorField("new");
      }
      else setError(t("genericError"));
    } finally {
      submitLock.current = false;
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-28 sm:px-6">
      <section className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">{t("changeTitle")}</h1>
        <p className="mt-2 text-sm text-gray-600">{t("changeDescription")}</p>
        <form className="mt-6 space-y-5" onSubmit={submit}>
          <div>
            <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-gray-700">{t("currentPassword")}</label>
            <input id="currentPassword" type={showPasswords ? "text" : "password"} autoComplete="current-password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} disabled={loading} aria-invalid={errorField === "current"} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            {errorField === "current" && <p role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
          </div>
          <div>
            <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-gray-700">{t("newPassword")}</label>
            <input id="newPassword" type={showPasswords ? "text" : "password"} autoComplete="new-password" required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} disabled={loading} aria-invalid={errorField === "new"} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <PasswordRequirements password={newPassword} />
            {errorField === "new" && <p role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">{t("confirmPassword")}</label>
            <input id="confirmPassword" type={showPasswords ? "text" : "password"} autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={loading} aria-invalid={errorField === "confirm"} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            {errorField === "confirm" && <p role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={showPasswords} onChange={(event) => setShowPasswords(event.target.checked)} />{t("showPassword")}
          </label>
          {error && !errorField && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{loading ? t("submitting") : t("submitChange")}</button>
        </form>
      </section>
    </main>
  );
}
