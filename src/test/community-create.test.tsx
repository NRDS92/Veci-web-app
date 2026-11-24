import { NextIntlClientProvider } from "next-intl";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/es.json";

const mocks = vi.hoisted(() => ({ createCommunity: vi.fn() }));

vi.mock("@/features/communities/community.service", () => ({
    communityService: { createCommunity: mocks.createCommunity },
}));

vi.mock("@/components/ui/citySelector/CitySelector", () => ({
    default: ({ value, onChange, disabled }: { value: string; onChange: (value: string) => void; disabled?: boolean }) => (
        <label htmlFor="test-community-city">Ciudad
            <input id="test-community-city" required value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} />
        </label>
    ),
}));

vi.mock("@/components/upload/ImageUpload", () => ({
    default: ({ value, onChange, disabled }: { value?: string; onChange: (value: string) => void; disabled?: boolean }) => (
        <input aria-label="Profile or cover image URL" value={value ?? ""} disabled={disabled} onChange={(event) => onChange(event.target.value)} />
    ),
}));

vi.mock("@/components/upload/MultipleImageUpload", () => ({
    default: ({ value, onChange, disabled }: { value: string[]; onChange: (value: string[]) => void; disabled?: boolean }) => (
        <input aria-label="Gallery image URL" value={value.join(",")} disabled={disabled} onChange={(event) => onChange(event.target.value.split(",").filter(Boolean))} />
    ),
}));

import CommunityForm from "@/components/create/CommunityForm";

const createdCommunity = {
    id: "community-123",
    slug: "berlin-latinos",
    name: "Berlin Latinos",
    interests: ["culture"],
    cityId: "Berlin",
    country: "Germany",
    images: { gallery: [] },
    contact: {},
    memberCount: 1,
    createdAt: "2026-11-24T12:00:00.000Z",
    ownerId: "owner-1",
    membershipPolicy: "approval" as const,
    moderationStatus: "pending" as const,
    status: "active" as const,
    updatedAt: "2026-11-24T12:00:00.000Z",
};

function renderForm() {
    return render(
        <NextIntlClientProvider locale="es" messages={messages}>
            <CommunityForm />
        </NextIntlClientProvider>,
    );
}

function fillRequiredFields() {
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Berlin Latinos" } });
    fireEvent.change(screen.getByLabelText("Ciudad"), { target: { value: "Berlin" } });
    fireEvent.change(screen.getByLabelText("País"), { target: { value: "Germany" } });
}

describe("Community creation form", () => {
    afterEach(cleanup);
    beforeEach(() => vi.clearAllMocks());

    it("validates contact URLs and required data before calling the API", async () => {
        renderForm();
        fillRequiredFields();
        fireEvent.change(screen.getByLabelText("Sitio web (opcional)"), { target: { value: "not-a-url" } });
        fireEvent.click(screen.getByRole("button", { name: "Enviar comunidad para revisión" }));

        expect(await screen.findByText("Revisa los campos obligatorios y confirma que los datos de contacto sean válidos.")).toBeInTheDocument();
        expect(mocks.createCommunity).not.toHaveBeenCalled();
    });

    it("submits all supported form data and confirms pending moderation with the returned id", async () => {
        mocks.createCommunity.mockResolvedValue(createdCommunity);
        renderForm();
        fillRequiredFields();
        fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: "A local group" } });
        fireEvent.change(screen.getByLabelText("Intereses"), { target: { value: "culture, food\nsports" } });
        fireEvent.click(screen.getByLabelText("Abierta — cualquiera puede unirse"));
        fireEvent.change(screen.getAllByLabelText("Profile or cover image URL")[0], { target: { value: "https://cdn.example/profile.png" } });
        fireEvent.change(screen.getAllByLabelText("Profile or cover image URL")[1], { target: { value: "https://cdn.example/cover.png" } });
        fireEvent.change(screen.getByLabelText("Gallery image URL"), { target: { value: "https://cdn.example/gallery.png" } });
        fireEvent.change(screen.getByLabelText("Sitio web (opcional)"), { target: { value: "https://example.com" } });
        fireEvent.change(screen.getByLabelText("Instagram (opcional)"), { target: { value: "@berlinlatinos" } });
        fireEvent.change(screen.getByLabelText("WhatsApp (opcional)"), { target: { value: "+49123456789" } });
        fireEvent.change(screen.getByLabelText("Correo electrónico (opcional)"), { target: { value: "hello@example.com" } });
        fireEvent.click(screen.getByRole("button", { name: "Enviar comunidad para revisión" }));

        await waitFor(() => expect(mocks.createCommunity).toHaveBeenCalledOnce());
        expect(mocks.createCommunity).toHaveBeenCalledWith({
            name: "Berlin Latinos",
            description: "A local group",
            cityId: "Berlin",
            country: "Germany",
            interests: ["culture", "food", "sports"],
            membershipPolicy: "open",
            images: {
                profile: "https://cdn.example/profile.png",
                cover: "https://cdn.example/cover.png",
                gallery: ["https://cdn.example/gallery.png"],
            },
            contact: {
                website: "https://example.com",
                instagram: "@berlinlatinos",
                whatsapp: "+49123456789",
                email: "hello@example.com",
            },
        });
        expect(await screen.findByText("Tu comunidad está pendiente de moderación por VECI. No aparecerá públicamente hasta que sea aprobada.")).toBeInTheDocument();
        expect(screen.getByText("ID de referencia: community-123")).toBeInTheDocument();
        expect(screen.queryByText(/aprobada públicamente/i)).not.toBeInTheDocument();
    });

    it("shows a login prompt for 401 and a validation error for 400", async () => {
        const firstRender = renderForm();
        fillRequiredFields();
        const unauthorized = Object.assign(new Error("Unauthorized"), {
            isAxiosError: true,
            response: { status: 401, data: { message: "Authentication required", code: "UNAUTHORIZED" } },
        });
        mocks.createCommunity.mockRejectedValueOnce(unauthorized);
        fireEvent.click(screen.getByRole("button", { name: "Enviar comunidad para revisión" }));
        expect(await screen.findByText("Tu sesión expiró. Inicia sesión de nuevo para enviar la comunidad.")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Inicia sesión de nuevo" })).toHaveAttribute("href", "/es/login");

        mocks.createCommunity.mockRejectedValueOnce(Object.assign(new Error("Invalid request"), {
            isAxiosError: true,
            response: { status: 400, data: { message: "Invalid community details", code: "VALIDATION_ERROR" } },
        }));
        firstRender.unmount();
        renderForm();
        fillRequiredFields();
        fireEvent.click(screen.getByRole("button", { name: "Enviar comunidad para revisión" }));
        expect(await screen.findByText("Invalid community details")).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: "Inicia sesión de nuevo" })).not.toBeInTheDocument();
    });

    it("prevents duplicate submissions while the request is pending", async () => {
        let resolveRequest!: (community: typeof createdCommunity) => void;
        mocks.createCommunity.mockReturnValue(new Promise<typeof createdCommunity>((resolve) => { resolveRequest = resolve; }));
        renderForm();
        fillRequiredFields();
        const button = screen.getByRole("button", { name: "Enviar comunidad para revisión" });
        fireEvent.click(button);
        fireEvent.click(button);

        expect(mocks.createCommunity).toHaveBeenCalledOnce();
        resolveRequest(createdCommunity);
        expect(await screen.findByText("ID de referencia: community-123")).toBeInTheDocument();
    });
});
