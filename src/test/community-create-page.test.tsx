import { NextIntlClientProvider } from "next-intl";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/es.json";

vi.mock("@/components/auth/ProtectedRoute", () => ({
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="protected-route">{children}</div>,
}));

vi.mock("@/components/create/CommunityForm", () => ({
    default: () => <div data-testid="community-form" />,
}));

import CreatePage from "@/app/[locale]/create/page";
import CreateCommunityPage from "@/app/[locale]/create/community/page";

describe("Community creation entry points", () => {
    afterEach(cleanup);

    it("adds the third localized creation card and preserves Event and Business links", () => {
        render(
            <NextIntlClientProvider locale="es" messages={messages}>
                <CreatePage />
            </NextIntlClientProvider>,
        );

        expect(screen.getByRole("link", { name: /Crear comunidad/i })).toHaveAttribute("href", "/es/create/community");
        expect(screen.getByRole("link", { name: /Create an Event/i })).toHaveAttribute("href", "/es/create/event");
        expect(screen.getByRole("link", { name: /Create a Business/i })).toHaveAttribute("href", "/es/create/business");
    });

    it("renders the dedicated creation form inside the existing protected-route pattern", () => {
        render(
            <NextIntlClientProvider locale="es" messages={messages}>
                <CreateCommunityPage />
            </NextIntlClientProvider>,
        );

        expect(screen.getByTestId("protected-route")).toBeInTheDocument();
        expect(screen.getByTestId("community-form")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Crear una comunidad" })).toBeInTheDocument();
    });
});
