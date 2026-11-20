import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ownerBusinessFixture } from "./fixtures/business";

const mocks = vi.hoisted(() => ({
    useMyBusinesses: vi.fn(),
    getOwnerBusinessStats: vi.fn(),
}));

vi.mock("@/features/account/favorites/useMyBusinesses", () => ({
    useMyBusinesses: mocks.useMyBusinesses,
}));
vi.mock("@/features/business/business.service", () => ({
    businessService: {
        getOwnerBusinessStats: mocks.getOwnerBusinessStats,
    },
}));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ href, children, ...props }: React.ComponentProps<"a">) => (
        <a href={href} {...props}>{children}</a>
    ),
}));

import MyBusinesses from "@/components/account/favorites/MyBusinesses";

describe("MyBusinesses OwnerBusiness rendering", () => {
    afterEach(() => cleanup());

    beforeEach(() => {
        mocks.useMyBusinesses.mockReturnValue({
            businesses: [ownerBusinessFixture],
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
        mocks.getOwnerBusinessStats.mockResolvedValue({
            businessId: ownerBusinessFixture._id,
            followersCount: 2,
            eventsCount: 3,
            businessViews: 11,
            menuDownloadAttempts: 1,
            periodDays: 90,
        });
    });

    it("renders an owner business when optional location fields are absent", async () => {
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
        expect(await screen.findByText("Last 90 days")).toBeInTheDocument();
        expect(mocks.getOwnerBusinessStats).toHaveBeenCalledWith(ownerBusinessFixture._id);
    });
});
