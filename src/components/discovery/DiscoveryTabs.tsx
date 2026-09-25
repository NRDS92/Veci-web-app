"use client";

import { DiscoveryType } from "./Discovery";

interface DiscoveryTabsProps {
    activeType: DiscoveryType;
    onChange: (type: DiscoveryType) => void;
}

export default function DiscoveryTabs({
    activeType,
    onChange,
}: DiscoveryTabsProps) {
    return (
        <div className="flex justify-center py-8">

            <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">

                <button
                    type="button"
                    onClick={() => onChange("all")}
                    className={
                        activeType === "all"
                            ? "rounded-full bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white"
                            : "rounded-full px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                    }
                >
                    Todo
                </button>

                <button
                    type="button"
                    onClick={() => onChange("events")}
                    className={
                        activeType === "events"
                            ? "rounded-full bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white"
                            : "rounded-full px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                    }
                >
                    Eventos
                </button>

                <button
                    type="button"
                    onClick={() => onChange("business")}
                    className={
                        activeType === "business"
                            ? "rounded-full bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white"
                            : "rounded-full px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                    }
                >
                    Negocios
                </button>

            </div>

        </div>
    );
}