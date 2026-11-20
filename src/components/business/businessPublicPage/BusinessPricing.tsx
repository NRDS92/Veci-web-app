import type { PublicBusiness } from "@ndrs92/contracts";

type BusinessPricingValue = PublicBusiness["profile"]["pricing"];

const formatEuro = (amount: number) => `€${amount.toFixed(2)}`;

const formatPrice = (pricing: NonNullable<BusinessPricingValue>): string | null => {
    const { amount, minAmount, maxAmount, type } = pricing;

    switch (type) {
        case "fixed":
            return amount === undefined ? null : formatEuro(amount);
        case "hourly":
            return amount === undefined ? null : `${formatEuro(amount)} / hour`;
        case "starting_at":
            return amount === undefined ? null : `From ${formatEuro(amount)}`;
        case "range":
            if (minAmount !== undefined && maxAmount !== undefined) {
                return `${formatEuro(minAmount)} – ${formatEuro(maxAmount)}`;
            }
            if (minAmount !== undefined) return `From ${formatEuro(minAmount)}`;
            if (maxAmount !== undefined) return `Up to ${formatEuro(maxAmount)}`;
            return null;
    }
};

export default function BusinessPricing({ pricing }: { pricing?: BusinessPricingValue }) {
    if (!pricing) return null;

    const formattedPrice = formatPrice(pricing);
    const description = pricing.description?.trim();
    if (!formattedPrice && !description) return null;

    return (
        <section
            aria-labelledby="business-pricing-heading"
            className="rounded-3xl border border-gray-200 bg-white p-6"
        >
            <div className="flex items-center gap-2">
                <i aria-hidden="true" className="fa-solid fa-euro-sign text-[#FF7A00]" />
                <h2 id="business-pricing-heading" className="text-lg font-semibold text-gray-900">
                    Pricing
                </h2>
            </div>
            {formattedPrice && (
                <p className="mt-4 text-lg font-semibold text-gray-900">{formattedPrice}</p>
            )}
            {description && (
                <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
            )}
        </section>
    );
}
