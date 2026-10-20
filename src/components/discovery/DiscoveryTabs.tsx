
"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type { DiscoveryType } from "./Discovery";
import type { LocationData } from "@/features/location/location.types";
import LocationSelector from "@/components/location/LocationSelector";

interface DiscoveryTabsProps {
  activeType: DiscoveryType;
  onChange: (type: DiscoveryType) => void;
  location: LocationData | null;
  onLocationChange: (location: LocationData | null) => void;
  date: string;
  onDateChange: (date: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
}

const eventCategories = [
  { value: "all", label: "Todas las categorías" },
  { value: "party", label: "Fiestas" },
  { value: "food", label: "Gastronomía" },
  { value: "culture", label: "Cultura" },
  { value: "sports", label: "Deportes" },
  { value: "meetup", label: "Encuentros" },
  { value: "concert", label: "Conciertos" },
];

const businessCategories = [
  { value: "all", label: "Todas las categorías" },
  { value: "restaurant", label: "Restaurantes" },
  { value: "cafe", label: "Cafés" },
  { value: "bar", label: "Bares" },
  { value: "shop", label: "Tiendas" },
];

const allCategories = [
  { value: "all", label: "Todas las categorías" },
  ...businessCategories.slice(1),
  ...eventCategories.slice(1),
];

const tabs: { value: DiscoveryType; label: string }[] = [
  { value: "all", label: "Todo" },
  { value: "events", label: "Eventos" },
  { value: "business", label: "Negocios" },
];

export default function DiscoveryTabs({
  activeType,
  onChange,
  location,
  onLocationChange,
  date,
  onDateChange,
  category,
  onCategoryChange,
}: DiscoveryTabsProps) {
  const [showLocationSelector, setShowLocationSelector] =
    useState(false);

  const categories =
    activeType === "events"
      ? eventCategories
      : activeType === "business"
        ? businessCategories
        : allCategories;

  const selectedCategory = categories.some(
    (item) => item.value === category
  )
    ? category
    : "all";

  const handleTypeChange = (type: DiscoveryType) => {
    onChange(type);
    onCategoryChange("all");
  };

  const locationLabel = location?.city || "Ciudad";

  const categoryLabel =
    categories.find((item) => item.value === selectedCategory)
      ?.label ?? "Categoría";

  const dateLabel = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      })
    : "Fecha";

  const locationButton = (
    <button
      type="button"
      onClick={() =>
        setShowLocationSelector((previous) => !previous)
      }
      aria-expanded={showLocationSelector}
      aria-controls="discovery-location-panel"
      aria-label={`Seleccionar ciudad. Actual: ${locationLabel}`}
      className="flex min-w-0 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-[#111827] transition hover:bg-gray-50"
    >
      <MapPin size={17} className="shrink-0 text-gray-500" />
      <span className="max-w-28 truncate">{locationLabel}</span>
      <ChevronDown
        size={15}
        className={`shrink-0 text-gray-500 transition-transform ${
          showLocationSelector ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  const dateControl = (
    <label className="flex min-w-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2.5 transition hover:bg-gray-50">
      <CalendarDays
        size={17}
        className="shrink-0 text-gray-500"
      />
      <span className="sr-only">Filtrar por fecha</span>
      <input
        type="date"
        value={date}
        min={new Date().toLocaleDateString("en-CA")}
        onChange={(event) => onDateChange(event.target.value)}
        aria-label="Filtrar eventos por fecha"
        className="min-w-0 w-full cursor-pointer bg-transparent text-sm font-medium text-[#111827] outline-none"
      />
    </label>
  );

  const categoryControl = (
    <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2.5">
      <SlidersHorizontal
        size={17}
        className="shrink-0 text-gray-500"
      />
      <span className="sr-only">Filtrar por categoría</span>
      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filtrar por categoría"
        className="min-w-0 w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-[#111827] outline-none"
      >
        {categories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="shrink-0 text-gray-500"
      />
    </label>
  );

  return (
    <section
      aria-label="Filtros de descubrimiento"
      className="relative z-20 w-full px-4 py-4 sm:px-6 sm:py-6 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* MOBILE */}
        <div className="space-y-3 md:hidden">
          <div
            className="grid grid-cols-3 rounded-2xl border border-gray-200/80 bg-white p-1 shadow-sm"
            role="group"
            aria-label="Tipo de contenido"
          >
            {tabs.map((tab) => {
              const active = activeType === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleTypeChange(tab.value)}
                  aria-pressed={active}
                  className={`min-h-11 rounded-xl px-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#111827] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#111827]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {locationButton}
            {dateControl}
          </div>

          {categoryControl}
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex md:justify-center">
          <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/80 bg-white/90 p-1.5 shadow-[0_4px_20px_rgba(17,24,39,0.10)] backdrop-blur-xl">
            {locationButton}

            <div className="mx-1 h-7 w-px shrink-0 bg-gray-200" />

            {dateControl}

            <div className="mx-1 h-7 w-px shrink-0 bg-gray-200" />

            <div
              className="flex shrink-0 items-center rounded-full bg-gray-100/80 p-1"
              role="group"
              aria-label="Tipo de contenido"
            >
              {tabs.map((tab) => {
                const active = activeType === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handleTypeChange(tab.value)}
                    aria-pressed={active}
                    className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-all ${
                      active
                        ? "bg-[#111827] text-white shadow-sm"
                        : "text-gray-600 hover:text-[#111827]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mx-1 h-7 w-px shrink-0 bg-gray-200" />

            <div className="w-52 shrink-0">
              {categoryControl}
            </div>
          </div>
        </div>

        {/* LOCATION POPOVER */}
        {showLocationSelector && (
          <>
            <button
              type="button"
              aria-label="Cerrar selector de ciudad"
              className="fixed inset-0 z-40 cursor-default bg-black/20 md:bg-transparent"
              onClick={() => setShowLocationSelector(false)}
            />

            <div
              id="discovery-location-panel"
              className="absolute left-4 right-4 top-full z-50 mt-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:left-auto sm:right-6 sm:w-[min(420px,calc(100vw-3rem))] md:left-1/2 md:right-auto md:w-[420px] md:-translate-x-1/2"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#111827]">
                  ¿Dónde quieres descubrir?
                </h2>
                <button
                  type="button"
                  onClick={() => setShowLocationSelector(false)}
                  aria-label="Cerrar"
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  <X size={18} />
                </button>
              </div>

              <LocationSelector
                value={location}
                onChange={(nextLocation) => {
                  onLocationChange(nextLocation);

                  if (nextLocation) {
                    setShowLocationSelector(false);
                  }
                }}
                compact
                showMap={false}
              />

              {location && (
                <button
                  type="button"
                  onClick={() => {
                    onLocationChange(null);
                    setShowLocationSelector(false);
                  }}
                  className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Quitar ciudad
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
