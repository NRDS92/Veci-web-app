"use client";

import { BusinessPricingType } from "@/features/business/business.types";

interface BusinessPricingSectionProps {
    pricingType: BusinessPricingType;

    priceAmount: string;
    priceMinAmount: string;
    priceMaxAmount: string;
    priceDescription: string;

    onPricingTypeChange: (
        value: BusinessPricingType
    ) => void;

    onPriceAmountChange: (
        value: string
    ) => void;

    onPriceMinAmountChange: (
        value: string
    ) => void;

    onPriceMaxAmountChange: (
        value: string
    ) => void;

    onPriceDescriptionChange: (
        value: string
    ) => void;

    loading: boolean;
}

export default function BusinessPricingSection({
    pricingType,
    priceAmount,
    priceMinAmount,
    priceMaxAmount,
    priceDescription,
    onPricingTypeChange,
    onPriceAmountChange,
    onPriceMinAmountChange,
    onPriceMaxAmountChange,
    onPriceDescriptionChange,
    loading,
}: BusinessPricingSectionProps) {
    return (
        <section className="space-y-5">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-euro-sign text-[#FF7A00]" />

                    <h2 className="text-lg font-semibold text-gray-900">
                        Pricing
                    </h2>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Let people know how your products or services are priced.
                </p>
            </div>

            {/* ==================================================
                PRICING TYPE + PRICE
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Pricing type */}

                <div>
                    <label
                        htmlFor="pricing-type"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Pricing type
                    </label>

                    <div className="relative">
                        <i className="fa-solid fa-tag pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <select
                            id="pricing-type"
                            value={pricingType}
                            onChange={(event) =>
                                onPricingTypeChange(
                                    event.target.value as BusinessPricingType
                                )
                            }
                            disabled={loading}
                            className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 outline-none transition focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                        >
                            <option value="fixed">
                                Fixed price
                            </option>

                            <option value="hourly">
                                Price per hour
                            </option>

                            <option value="starting_at">
                                Starting at
                            </option>

                            <option value="range">
                                Price range
                            </option>
                        </select>

                        <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
                    </div>
                </div>

                {/* Single price */}

                {pricingType !== "range" && (
                    <div>
                        <label
                            htmlFor="price-amount"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            {pricingType === "hourly"
                                ? "Price per hour (€)"
                                : pricingType === "starting_at"
                                ? "Starting price (€)"
                                : "Price (€)"}
                        </label>

                        <div className="relative">
                            <i className="fa-solid fa-euro-sign pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                id="price-amount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={priceAmount}
                                onChange={(event) =>
                                    onPriceAmountChange(
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    pricingType === "hourly"
                                        ? "e.g. 25"
                                        : "e.g. 15"
                                }
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* ==================================================
                PRICE RANGE
            ================================================== */}

            {pricingType === "range" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Minimum */}

                    <div>
                        <label
                            htmlFor="price-min"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Minimum price (€)
                        </label>

                        <div className="relative">
                            <i className="fa-solid fa-arrow-down-1-9 pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                id="price-min"
                                type="number"
                                min="0"
                                step="0.01"
                                value={priceMinAmount}
                                onChange={(event) =>
                                    onPriceMinAmountChange(
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. 20"
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                            />
                        </div>
                    </div>

                    {/* Maximum */}

                    <div>
                        <label
                            htmlFor="price-max"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Maximum price (€)
                        </label>

                        <div className="relative">
                            <i className="fa-solid fa-arrow-up-1-9 pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                id="price-max"
                                type="number"
                                min="0"
                                step="0.01"
                                value={priceMaxAmount}
                                onChange={(event) =>
                                    onPriceMaxAmountChange(
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. 50"
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ==================================================
                PRICING DETAILS
            ================================================== */}

            <div>
                <label
                    htmlFor="pricing-description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Pricing details
                </label>

                <div className="relative">
                    <i className="fa-solid fa-circle-info pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        id="pricing-description"
                        type="text"
                        value={priceDescription}
                        onChange={(event) =>
                            onPriceDescriptionChange(
                                event.target.value
                            )
                        }
                        placeholder="e.g. Prices vary depending on the service"
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                    />
                </div>
            </div>
        </section>
    );
}