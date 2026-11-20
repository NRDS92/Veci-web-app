import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import BusinessActions from "@/components/business/businessPublicPage/BusinessActions";
import BusinessHero from "@/components/business/businessPublicPage/BusinessHero";
import BusinessPricing from "@/components/business/businessPublicPage/BusinessPricing";

describe("public Business Detail optional fields", () => {
    afterEach(() => cleanup());

    it.each([
        [{ type: "fixed", currency: "EUR", amount: 12 }, "€12.00"],
        [{ type: "hourly", currency: "EUR", amount: 20 }, "€20.00 / hour"],
        [{ type: "starting_at", currency: "EUR", amount: 8 }, "From €8.00"],
        [{ type: "range", currency: "EUR", minAmount: 10, maxAmount: 25 }, "€10.00 – €25.00"],
        [{ type: "range", currency: "EUR", minAmount: 10 }, "From €10.00"],
        [{ type: "range", currency: "EUR", maxAmount: 25 }, "Up to €25.00"],
    ] as const)("formats %s pricing without inventing an amount", (pricing, expected) => {
        render(<BusinessPricing pricing={pricing} />);
        expect(screen.getByRole("heading", { name: "Pricing" })).toBeInTheDocument();
        expect(screen.getByText(expected)).toBeInTheDocument();
    });

    it("shows a pricing description alone and hides empty pricing", () => {
        const { rerender } = render(
            <BusinessPricing pricing={{ type: "fixed", currency: "EUR", description: "Ask for a quote" }} />,
        );
        expect(screen.getByText("Ask for a quote")).toBeInTheDocument();
        expect(screen.queryByText(/€\d/)).not.toBeInTheDocument();

        rerender(<BusinessPricing pricing={{ type: "fixed", currency: "EUR", description: "   " }} />);
        expect(screen.queryByRole("heading", { name: "Pricing" })).not.toBeInTheDocument();
    });

    it("renders safe email and telephone links and leaves existing actions intact", () => {
        render(
            <BusinessActions
                email="person+tag@example.com"
                phone="+49 (30) 123-456"
                website="https://example.com"
                instagram="https://instagram.com/example"
                whatsapp="https://wa.me/4930123456"
            />,
        );

        expect(screen.getByRole("link", { name: "Email person+tag@example.com" })).toHaveAttribute(
            "href",
            "mailto:person%2Btag@example.com",
        );
        expect(screen.getByRole("link", { name: "Call +49 (30) 123-456" })).toHaveAttribute(
            "href",
            "tel:+4930123456",
        );
        expect(screen.getByRole("link", { name: /website/i })).toHaveAttribute("href", "https://example.com");
        expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute("href", "https://instagram.com/example");
        expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.me/4930123456");
    });

    it("omits contact links when optional contact values are missing or unsafe", () => {
        render(<BusinessActions email={"invalid\n@example.com"} phone="---" />);
        expect(screen.queryByRole("link", { name: /invalid/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /phone/i })).not.toBeInTheDocument();
    });

    it("shows a verified badge only when explicitly enabled", () => {
        const { rerender } = render(
            <BusinessHero name="Café Sol" category="food" verified />,
        );
        expect(screen.getByLabelText("Verified business")).toHaveTextContent("Verified");

        rerender(<BusinessHero name="Café Sol" category="food" verified={false} />);
        expect(screen.queryByLabelText("Verified business")).not.toBeInTheDocument();
    });
});
