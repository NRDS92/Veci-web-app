import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => ({
    auth: vi.fn(),
    push: vi.fn(),
    getBusinessFollowStatus: vi.fn(),
    followBusiness: vi.fn(),
    unfollowBusiness: vi.fn(),
    trackBusinessBehavior: vi.fn(),
    getOwnerBusinessStats: vi.fn(),
}));

vi.mock("@/components/auth/AuthProvider", () => ({ useAuth: mocks.auth }));
vi.mock("@/i18n/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock("@/features/business/business.service", () => ({
    businessService: {
        getBusinessFollowStatus: mocks.getBusinessFollowStatus,
        followBusiness: mocks.followBusiness,
        unfollowBusiness: mocks.unfollowBusiness,
        trackBusinessBehavior: mocks.trackBusinessBehavior,
        getOwnerBusinessStats: mocks.getOwnerBusinessStats,
    },
}));

import BusinessActions from "@/components/business/businessPublicPage/BusinessActions";
import BusinessEngagementStats from "@/components/account/favorites/BusinessEngagementStats";

const statsFixture = {
    businessId: "business-123",
    followersCount: 7,
    eventsCount: 3,
    businessViews: 41,
    menuDownloadAttempts: 5,
    periodDays: 90 as const,
};

describe("Business Engagement UI", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocks.auth.mockReturnValue({ loading: false, isAuthenticated: false, user: null });
        mocks.trackBusinessBehavior.mockResolvedValue({});
        mocks.getBusinessFollowStatus.mockResolvedValue({ businessId: "business-123", isFollowing: false });
        mocks.followBusiness.mockResolvedValue({ businessId: "business-123", isFollowing: true });
        mocks.unfollowBusiness.mockResolvedValue({ businessId: "business-123", isFollowing: false });
        mocks.getOwnerBusinessStats.mockResolvedValue(statsFixture);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("tracks one public view per business across rerenders and leaves menu navigation intact", async () => {
        const props = {
            businessId: "business-123",
            documents: [
                { type: "menu" as const, url: "https://cdn.example/menu.pdf", name: "Menu" },
                { type: "catalog" as const, url: "https://cdn.example/catalog.pdf", name: "Catalog" },
            ],
        };
        const { rerender } = render(<BusinessActions {...props} />);

        await waitFor(() => expect(mocks.trackBusinessBehavior).toHaveBeenCalledTimes(1));
        expect(mocks.trackBusinessBehavior).toHaveBeenCalledWith("business-123", { event: "business_view" });
        rerender(<BusinessActions {...props} likesCount={2} />);
        expect(mocks.trackBusinessBehavior).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText("Attachments"));
        const menuLink = screen.getByRole("link", { name: "Menu" });
        expect(menuLink).toHaveAttribute("href", "https://cdn.example/menu.pdf");
        fireEvent.click(menuLink);
        expect(mocks.trackBusinessBehavior).toHaveBeenLastCalledWith("business-123", {
            event: "menu_download",
            documentUrl: "https://cdn.example/menu.pdf",
        });

        fireEvent.click(screen.getByRole("link", { name: "Catalog" }));
        expect(mocks.trackBusinessBehavior).toHaveBeenCalledTimes(2);
    });

    it("routes anonymous visitors to login without requesting authenticated follow status", async () => {
        render(<BusinessActions businessId="business-123" />);
        fireEvent.click(screen.getByRole("button", { name: "Log in to follow" }));

        expect(mocks.push).toHaveBeenCalledWith("/login");
        expect(mocks.getBusinessFollowStatus).not.toHaveBeenCalled();
        expect(mocks.followBusiness).not.toHaveBeenCalled();
    });

    it("loads status and changes follow state from the server response", async () => {
        mocks.auth.mockReturnValue({ loading: false, isAuthenticated: true, user: { id: "user-1" } });
        render(<BusinessActions businessId="business-123" />);

        const followButton = await screen.findByRole("button", { name: "Follow business" });
        expect(mocks.getBusinessFollowStatus).toHaveBeenCalledWith("business-123");
        fireEvent.click(followButton);
        expect(await screen.findByRole("button", { name: "Unfollow" })).toHaveAttribute("aria-pressed", "true");
        expect(mocks.followBusiness).toHaveBeenCalledTimes(1);
    });

    it("unfollows from the loaded server state", async () => {
        mocks.auth.mockReturnValue({ loading: false, isAuthenticated: true, user: { id: "user-1" } });
        mocks.getBusinessFollowStatus.mockResolvedValue({ businessId: "business-123", isFollowing: true });
        render(<BusinessActions businessId="business-123" />);

        fireEvent.click(await screen.findByRole("button", { name: "Unfollow" }));
        expect(await screen.findByRole("button", { name: "Follow business" })).toHaveAttribute("aria-pressed", "false");
        expect(mocks.unfollowBusiness).toHaveBeenCalledTimes(1);
    });

    it("disables repeated follow submissions while the request is pending", async () => {
        mocks.auth.mockReturnValue({ loading: false, isAuthenticated: true, user: { id: "user-1" } });
        let resolveFollow: ((value: { businessId: string; isFollowing: boolean }) => void) | undefined;
        mocks.followBusiness.mockImplementation(() => new Promise((resolve) => { resolveFollow = resolve; }));
        render(<BusinessActions businessId="business-123" />);

        const followButton = await screen.findByRole("button", { name: "Follow business" });
        fireEvent.click(followButton);
        expect(screen.getByRole("button", { name: "Saving…" })).toBeDisabled();
        fireEvent.click(screen.getByRole("button", { name: "Saving…" }));
        expect(mocks.followBusiness).toHaveBeenCalledTimes(1);
        resolveFollow?.({ businessId: "business-123", isFollowing: true });
        expect(await screen.findByRole("button", { name: "Unfollow" })).toBeInTheDocument();
    });

    it("renders owner stats with the API period and handles zero activity", async () => {
        mocks.getOwnerBusinessStats.mockResolvedValue({ ...statsFixture, businessViews: 0, menuDownloadAttempts: 0 });
        render(<BusinessEngagementStats businessId="business-123" />);

        expect(await screen.findByText("Last 90 days")).toBeInTheDocument();
        expect(screen.getByText("7", { selector: "dd" })).toBeInTheDocument();
        expect(screen.getByText("No tracked activity in this period yet.")).toBeInTheDocument();
    });

    it("renders an owner stats error with retry", async () => {
        mocks.getOwnerBusinessStats.mockRejectedValueOnce(new Error("Forbidden"));
        render(<BusinessEngagementStats businessId="business-123" />);

        expect(await screen.findByRole("alert")).toHaveTextContent("Stats unavailable.");
        fireEvent.click(screen.getByRole("button", { name: "Retry" }));
        expect(await screen.findByText("Last 90 days")).toBeInTheDocument();
        expect(mocks.getOwnerBusinessStats).toHaveBeenCalledTimes(2);
    });
});
