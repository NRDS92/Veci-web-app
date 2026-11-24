import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    auth: { user: null as null | { id: string }, loading: false, isAuthenticated: false },
    replace: vi.fn(),
}));

vi.mock("@/components/auth/AuthProvider", () => ({ useAuth: () => mocks.auth }));
vi.mock("@/i18n/navigation", () => ({ useRouter: () => ({ replace: mocks.replace }) }));

import ProtectedRoute from "@/components/auth/ProtectedRoute";

describe("Community creation authentication guard", () => {
    afterEach(cleanup);
    beforeEach(() => {
        mocks.auth.user = null;
        mocks.auth.loading = false;
        mocks.auth.isAuthenticated = false;
        mocks.replace.mockClear();
    });

    it("prompts unauthenticated visitors to log in and does not render protected content", async () => {
        render(<ProtectedRoute><p>Private creation form</p></ProtectedRoute>);

        expect(screen.queryByText("Private creation form")).not.toBeInTheDocument();
        await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/login"));
    });

    it("renders the route content for an authenticated user", () => {
        mocks.auth.user = { id: "user-1" };
        mocks.auth.isAuthenticated = true;

        render(<ProtectedRoute><p>Private creation form</p></ProtectedRoute>);

        expect(screen.getByText("Private creation form")).toBeInTheDocument();
        expect(mocks.replace).not.toHaveBeenCalled();
    });
});
