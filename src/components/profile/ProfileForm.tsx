
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  Editar,
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
import type { LocationData } from "@/features/location/location.types";
import { locationService } from "@/features/location/location.service";
import type { CountryOption } from "@/features/location/location.types";



export default function ProfileForm() {
  const { user, refreshUser, logout } = useAuth();
  const { notify } = useNotification();
  const t = useTranslations("Profile");
  const locale = useLocale();
  const router = useRouter();

  const [name, setName] = useState("");
  const [cityId, setCityId] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<LocationData[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [originCountry, setOriginCountry] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [countryResults, setCountryResults] = useState<CountryOption[]>([]);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countrySelected, setCountrySelected] = useState(false);
  const [bio, setBio] = useState("");

  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user.name ?? "");
    setCityId(user.cityId ?? "");
    setCityQuery(user.cityId ?? "");
    setCitySelected(Boolean(user.cityId));
    const savedCountryCode = user.originCountry?.toUpperCase() ?? "";
    setOriginCountry(savedCountryCode);
    setCountryQuery(
      savedCountryCode
        ? new Intl.DisplayNames([locale], { type: "region" }).of(savedCountryCode) ?? savedCountryCode
        : ""
    );
    setCountrySelected(Boolean(savedCountryCode));
    setBio(user.bio ?? "");
  }, [user, locale]);

  useEffect(() => {
    const query = cityQuery.trim();

    if (citySelected || query.length < 3) {
      setCityResults([]);
      setCityLoading(false);
      return;
    }

    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      setCityLoading(true);

      try {
        const results = await locationService.searchCities(query);

        if (!cancelled) {
          setCityResults(results);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("City search failed:", error);
          setCityResults([]);
        }
      } finally {
        if (!cancelled) {
          setCityLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [cityQuery, citySelected]);


  useEffect(() => {
    const query = countryQuery.trim();

    if (countrySelected || query.length < 2) {
      setCountryResults([]);
      setCountryLoading(false);
      return;
    }

    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      setCountryLoading(true);

      try {
        const results = await locationService.searchCountries(query);

        if (!cancelled) {
          setCountryResults(results);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Country search failed:", error);
          setCountryResults([]);
        }
      } finally {
        if (!cancelled) {
          setCountryLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [countryQuery, countrySelected]);
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

  const locationLabel = locale === "es" ? "Ubicación" : locale === "de" ? "Standort" : "Location";

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
        <fieldset className="space-y-4">
          <legend className="mb-3 text-sm font-semibold text-gray-900">
            {locationLabel}
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Ciudad actual: búsqueda dinámica de ciudades */}
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

                <input
                  id="profile-city"
                  type="text"
                  value={cityQuery}
                  onChange={(event) => {
                    setCityQuery(event.target.value);
                    setCityId("");
                    setCitySelected(false);
                  }}
                  disabled={saving || deleting}
                  placeholder={t("form.selectCity")}
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-expanded={cityResults.length > 0}
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                />

                {cityLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  </div>
                )}

                {!citySelected && cityResults.length > 0 && (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg"
                  >
                    {cityResults.map((city) => (
                      <li key={city.placeId} role="option" aria-selected="false">
                        <button
                          type="button"
                          disabled={saving || deleting}
                          onClick={() => {
                            setCityId(city.city);
                            setCityQuery(city.city);
                            setCitySelected(true);
                            setCityResults([]);
                          }}
                          className="w-full px-4 py-3 text-left transition hover:bg-gray-50 disabled:opacity-50"
                        >
                          <span className="block font-medium text-gray-900">
                            {city.city}
                          </span>
                          <span className="block text-sm text-gray-500">
                            {[city.state, city.country].filter(Boolean).join(", ")}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {!citySelected && cityQuery.trim().length > 0 && cityQuery.trim().length < 3 && (
                <p className="mt-2 text-xs text-gray-500">
                  Escribe al menos 3 caracteres para buscar.
                </p>
              )}
            </div>

            {/* País de origen: búsqueda dinámica de países */}
            <div>
              <label
                htmlFor="profile-country"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {t("form.country")}
              </label>

              <div className="relative">
                <input
                  id="profile-country"
                  type="text"
                  value={countryQuery}
                  onChange={(event) => {
                    setCountryQuery(event.target.value);
                    setOriginCountry("");
                    setCountrySelected(false);
                  }}
                  disabled={saving || deleting}
                  placeholder={t("form.selectCountry")}
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-expanded={countryResults.length > 0}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                />

                {countryLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Loader2 size={18} className="animate-spin text-gray-400" />
                  </div>
                )}

                {!countrySelected && countryResults.length > 0 && (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg"
                  >
                    {countryResults.map((country) => (
                      <li key={country.placeId} role="option" aria-selected="false">
                        <button
                          type="button"
                          disabled={saving || deleting}
                          onClick={() => {
                            setOriginCountry(country.code);
                            setCountryQuery(country.name);
                            setCountrySelected(true);
                            setCountryResults([]);
                          }}
                          className="w-full px-4 py-3 text-left text-gray-900 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                          {country.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </fieldset>
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



