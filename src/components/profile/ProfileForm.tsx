
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import {
  Editar,
  SiluetaColombia,
} from "@mteherandev/colombia-icons-react";

import {
  AlertTriangle,
  Loader2,
  Mail,
  MapPin,
  Save,
  Trash2,
} from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import { useNotification } from "@/components/notifications/NotificationProvider";
import { userService } from "@/features/users/user.service";

const CITIES = [
  { value: "Cologne", key: "cologne" },
  { value: "Berlin", key: "berlin" },
  { value: "Hamburg", key: "hamburg" },
  { value: "Munich", key: "munich" },
  { value: "Frankfurt", key: "frankfurt" },
] as const;

const COUNTRIES = [
  { value: "CO", label: "Colombia" },
  { value: "VE", label: "Venezuela" },
  { value: "AR", label: "Argentina" },
  { value: "BR", label: "Brazil" },
  { value: "CL", label: "Chile" },
  { value: "EC", label: "Ecuador" },
  { value: "PE", label: "Peru" },
  { value: "MX", label: "Mexico" },
  { value: "BO", label: "Bolivia" },
  { value: "PY", label: "Paraguay" },
  { value: "UY", label: "Uruguay" },
] as const;

export default function ProfileForm() {
  const { user, refreshUser, logout } = useAuth();
  const { notify } = useNotification();
  const t = useTranslations("Profile");
  const router = useRouter();

  const [name, setName] = useState("");
  const [cityId, setCityId] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [bio, setBio] = useState("");

  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.name ?? "");
    setCityId(user.cityId ?? "");
    setOriginCountry(user.originCountry ?? "");
    setBio(user.bio ?? "");
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    const normalizedName = name.trim();
    const normalizedCity = cityId.trim();
    const normalizedBio = bio.trim();

    if (!normalizedName || normalizedName.length > 100) {
      notify({
        type: "warning",
        title: t("form.validationTitle"),
        message: t("form.nameError"),
      });
      return;
    }

    if (!normalizedCity) {
      notify({
        type: "warning",
        title: t("form.validationTitle"),
        message: t("form.cityError"),
      });
      return;
    }

    if (normalizedBio.length > 500) {
      notify({
        type: "warning",
        title: t("form.validationTitle"),
        message: t("form.bioError"),
      });
      return;
    }

    setSaving(true);

    try {
      await userService.updateMe({
        name: normalizedName,
        cityId: normalizedCity,
        originCountry: originCountry.trim().toUpperCase(),
        bio: normalizedBio,
      });

      await refreshUser();

      notify({
        type: "success",
        title: t("form.successTitle"),
        message: t("form.successMessage"),
      });
    } catch (error: unknown) {
      console.error("PROFILE UPDATE ERROR:", error);

      const responseMessage =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  data?: { message?: string };
                };
              }
            ).response?.data?.message
          : undefined;

      notify({
        type: "error",
        title: t("form.errorTitle"),
        message: responseMessage || t("form.errorMessage"),
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      notify({
        type: "warning",
        title: t("delete.confirmationErrorTitle"),
        message: t("delete.confirmationErrorMessage"),
      });
      return;
    }

    setDeleting(true);

    try {
      await userService.deleteAccount();

      setDeleteDialogOpen(false);
      logout();

      notify({
        type: "success",
        title: t("delete.successTitle"),
        message: t("delete.successMessage"),
      });

      router.replace("/login");
    } catch (error: unknown) {
      console.error("ACCOUNT DELETION ERROR:", error);

      const responseMessage =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  data?: { message?: string };
                };
              }
            ).response?.data?.message
          : undefined;

      notify({
        type: "error",
        title: t("delete.errorTitle"),
        message: responseMessage || t("delete.errorMessage"),
      });
    } finally {
      setDeleting(false);
    }
  };

  const isColombian = originCountry.toUpperCase() === "CO";

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {t("form.title")}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t("form.description")}
          </p>
        </div>

        <Editar width={24} height={24} />
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("form.name")}
          </label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            maxLength={100}
            disabled={saving || deleting}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Mail size={15} />
            {t("form.email")}
          </label>

          <input
            id="profile-email"
            type="email"
            value={user.email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-500"
          />

          <p className="mt-2 text-xs text-gray-400">
            {t("form.emailHint")}
          </p>
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="profile-city"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("form.city")}
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              id="profile-city"
              value={cityId}
              onChange={(event) => setCityId(event.target.value)}
              disabled={saving || deleting}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            >
              <option value="">{t("form.selectCity")}</option>

              {CITIES.map((city) => (
                <option key={city.value} value={city.value}>
                  {t(`cities.${city.key}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor="profile-country"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t("form.country")}
          </label>

          <div className="flex items-center gap-3">
            {isColombian && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-50">
                <SiluetaColombia width={27} height={27} />
              </div>
            )}

            <select
              id="profile-country"
              value={originCountry}
              onChange={(event) => setOriginCountry(event.target.value)}
              disabled={saving || deleting}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            >
              <option value="">{t("form.selectCountry")}</option>

              {COUNTRIES.map((country) => (
                <option key={country.value} value={country.value}>
                  {t(`countries.${country.value}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="profile-bio"
              className="block text-sm font-medium text-gray-700"
            >
              {t("form.bio")}
            </label>

            <span
              className={`text-xs ${
                bio.length >= 500 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              {bio.length}/500
            </span>
          </div>

          <textarea
            id="profile-bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            maxLength={500}
            rows={5}
            disabled={saving || deleting}
            placeholder={t("form.bioPlaceholder")}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
          />
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || deleting}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                {t("form.saving")}
              </>
            ) : (
              <>
                <Save size={17} />
                {t("form.save")}
              </>
            )}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="mt-10 border-t border-red-200 pt-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <AlertTriangle size={21} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900">
                  {t("delete.sectionTitle")}
                </h3>

                <p className="mt-2 text-sm leading-6 text-red-800">
                  {t("delete.sectionDescription")}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirmation("");
                    setDeleteDialogOpen(true);
                  }}
                  disabled={saving || deleting}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  {t("delete.button")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete confirmation dialog */}
        {deleteDialogOpen && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget &&
                !deleting
              ) {
                setDeleteDialogOpen(false);
              }
            }}
          >
            <div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-account-title"
              aria-describedby="delete-account-description"
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Trash2 size={23} />
              </div>

              <h3
                id="delete-account-title"
                className="mt-4 text-xl font-bold text-gray-900"
              >
                {t("delete.dialogTitle")}
              </h3>

              <p
                id="delete-account-description"
                className="mt-2 text-sm leading-6 text-gray-600"
              >
                {t("delete.dialogDescription")}
              </p>

              <label
                htmlFor="delete-account-confirmation"
                className="mt-5 block text-sm font-medium text-gray-700"
              >
                {t("delete.confirmationLabel")}
              </label>

              <input
                id="delete-account-confirmation"
                type="text"
                autoComplete="off"
                value={deleteConfirmation}
                onChange={(event) =>
                  setDeleteConfirmation(event.target.value)
                }
                disabled={deleting}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:opacity-60"
              />

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={deleting}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {t("delete.cancel")}
                </button>

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={
                    deleting || deleteConfirmation !== "DELETE"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting
                    ? t("delete.deleting")
                    : t("delete.confirm")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
