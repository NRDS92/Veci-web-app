import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { publicBusinessFixture } from "./fixtures/business";

vi.mock("@/i18n/navigation", () => ({
    Link: ({ href, children, ...props }: React.ComponentProps<"a">) => (
        <a href={href} {...props}>{children}</a>
    ),
}));

import BusinessCard from "@/components/business/BusinessCard";

describe("BusinessCard PublicBusiness mapping", () => {
    it("renders flat location, selected image, rating and slug link", () => {
        render(<BusinessCard business={{ ...publicBusinessFixture, type: "business" }} />);

        const link = screen.getByRole("link", { name: /café sol/i });
        expect(link).toHaveAttribute("href", "/business/cafe-sol");
        expect(link).toHaveTextContent("Berlin");
        expect(link).toHaveTextContent("4.5");
        expect(screen.getByRole("img", { name: "Café Sol" })).toHaveAttribute(
            "src",
            publicBusinessFixture.coverImage,
        );
    });
});
