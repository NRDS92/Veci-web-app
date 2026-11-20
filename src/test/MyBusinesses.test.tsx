import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ownerBusinessFixture } from "./fixtures/business";

const mocks = vi.hoisted(() => ({
    useMyBusinesses: vi.fn(),
}));

vi.mock("@/features/account/favorites/useMyBusinesses", () => ({
    useMyBusinesses: mocks.useMyBusinesses,
}));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ href, children, ...props }: React.ComponentProps<"a">) => (
        <a href={href} {...props}>{children}</a>
    ),
}));

import MyBusinesses from "@/components/account/favorites/MyBusinesses";

describe("MyBusinesses OwnerBusiness rendering", () => {
    beforeEach(() => {
        mocks.useMyBusinesses.mockReturnValue({
            businesses: [ownerBusinessFixture],
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
    });

    it("renders an owner business when optional location fields are absent", () => {
        render(<MyBusinesses />);

        expect(screen.getByText("Café Sol")).toBeInTheDocument();
        expect(screen.getByText("Berlin")).toBeInTheDocument();
        expect(screen.getByText("active")).toBeInTheDocument();
        expect(screen.getByText("4.5")).toBeInTheDocument();
        expect(screen.getByText("(12)")).toBeInTheDocument();
        expect(screen.getByText("3 events")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
            "href",
            "/business/edit/business-123",
        );
    });
});
