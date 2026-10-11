
"use client";

import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";

import { LocationData } from "@/features/location/location.types";
import { locationService } from "@/features/location/location.service";
import { useNotification } from "@/components/notifications/NotificationProvider";

interface CitySelectorProps {
  value: string;
  onChange: (city: string) => void;
  disabled?: boolean;
}

export default function CitySelector({
  value,
  onChange,
  disabled = false,
}: CitySelectorProps) {
  const t = useTranslations("CitySelector");
  const { notify } = useNotification();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const nextQuery = event.target.value;

    setQuery(nextQuery);

    if (nextQuery.trim().length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const locations = await locationService.search(
        nextQuery.trim()
      );

      // Keep city results only and remove duplicates.
      const uniqueCities = new Map<string, LocationData>();

      for (const location of locations) {
        const city = location.city?.trim();

        if (city) {
          const key = city.toLocaleLowerCase();
          if (!uniqueCities.has(key)) {
            uniqueCities.set(key, location);
          }
        }
      }

      setResults(Array.from(uniqueCities.values()));
    } catch (error) {
      console.error("City search failed:", error);
      setResults([]);

      notify({
        type: "error",
        title: t("errors.search.title"),
        message: t("errors.search.message"),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (location: LocationData) => {
    onChange(location.city);
    setQuery("");
    setResults([]);
  };

  const handleClear = () => {
    onChange("");
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative">
      <label
        htmlFor="register-city"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {t("label")}
      </label>

      <div className="relative">
        <input
          id="register-city"
          type="text"
          value={value || query}
          onChange={handleSearch}
          disabled={disabled || Boolean(value)}
          placeholder={t("placeholder")}
          autoComplete="off"
          required
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-[#4C76F2] focus:bg-white focus:ring-2 focus:ring-[#4C76F2]/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        {loading && (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            role="status"
            aria-label={t("loading")}
          >
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#4C76F2]" />
          </div>
        )}
      </div>

      {results.length > 0 && !value && (
        <ul className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {results.map((location) => (
            <li key={location.placeId}>
              <button
                type="button"
                onClick={() => handleSelect(location)}
                className="w-full border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
              >
                <span className="block font-medium text-gray-900">
                  {location.city}
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  {location.country}
                  {location.state ? ` · ${location.state}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {value && (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
          <p className="text-sm font-medium text-gray-800">
            {value}
          </p>

          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="text-sm font-medium text-[#4C76F2] hover:underline disabled:opacity-50"
          >
            {t("change")}
          </button>
        </div>
      )}
    </div>
  );
}

