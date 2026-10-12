
"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
  SlidersHorizontal,
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
  { value: "restaurant", label: "Restaurantes" },
  { value: "cafe", label: "Cafés" },
  { value: "bar", label: "Bares" },
  { value: "shop", label: "Tiendas" },
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

  const selectedCategoryExists = categories.some(
    (item) => item.value === category
  );

  const handleTypeChange = (type: DiscoveryType) => {
    onChange(type);
    onCategoryChange("all");
  };

return (
  <section className="w-full px-4 py-6 md:px-6 md:py-8">
    <div className="relative mx-auto flex w-full justify-center">
      {/* Barra centrada: ocupa solo el espacio necesario */}
      <div className="min-w-0 max-w-full overflow-x-auto rounded-full">
        <div className="flex w-max items-center rounded-full border border-white/80 bg-white/90 p-1.5 shadow-[0_4px_20px_rgba(17,24,39,0.10)] backdrop-blur-xl">

          {/* CITY */}
          <button
            type="button"
            onClick={() =>
              setShowLocationSelector((previous) => !previous)
            }
            aria-expanded={showLocationSelector}
            aria-controls="discovery-location-panel"
            aria-label="Seleccionar ciudad"
            className="flex shrink-0 items-center gap-2 rounded-full px-4 py-3 transition hover:bg-gray-50"
          >
            <MapPin size={17} className="text-gray-500" />

            <span className="max-w-28 truncate text-sm font-medium text-[#111827]">
              {location?.city || "Ciudad"}
            </span>

            <ChevronDown
              size={15}
              className={`text-gray-500 transition-transform ${
                showLocationSelector ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="mx-1 h-7 w-px shrink-0 bg-gray-200" />

          {/* DATE */}
          <label className="flex shrink-0 items-center gap-2 rounded-full px-4 py-3 transition hover:bg-gray-50">
            <CalendarDays size={17} className="text-gray-500" />

            <input
              type="date"
              value={date}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={(event) => onDateChange(event.target.value)}
              aria-label="Filtrar eventos por fecha"
              className="w-[118px] bg-transparent text-sm font-medium text-[#111827] outline-none sm:w-[130px]"
            />
          </label>

          <div className="mx-1 h-7 w-px shrink-0 bg-gray-200" />

          {/* CONTENT TYPE */}
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
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-5 ${
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

          {/* CATEGORIES */}
          <label className="flex shrink-0 items-center gap-2 rounded-full px-4 py-3 transition hover:bg-gray-50">
            <SlidersHorizontal size={17} className="text-gray-500" />

            <select
              value={selectedCategoryExists ? category : "all"}
              onChange={(event) =>
                onCategoryChange(event.target.value)
              }
              aria-label="Filtrar por categoría"
              className="max-w-[150px] cursor-pointer appearance-none bg-transparent text-sm font-semibold text-[#111827] outline-none sm:max-w-[180px]"
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <ChevronDown size={15} className="text-gray-500" />
          </label>
        </div>
      </div>

      {/* LOCATION PANEL: independiente de la barra */}
      {showLocationSelector && (
        <div
          id="discovery-location-panel"
          className="absolute left-1/2 top-full z-[100] mt-3 w-[min(90vw,420px)] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl"
        >
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

          <button
            type="button"
            onClick={() => setShowLocationSelector(false)}
            className="mt-4 w-full rounded-xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  </section>
);

}
