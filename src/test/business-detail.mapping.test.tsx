import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import type { PublicBusiness } from "@ndrs92/contracts";
import { publicBusinessFixture } from "./fixtures/business";

const mocks = vi.hoisted(() => ({
    getContent: vi.fn(),
    actions: vi.fn<(props: any) => null>(() => null),
    overview: vi.fn<(props: any) => null>(() => null),
    hero: vi.fn<(props: any) => null>(() => null),
    details: vi.fn(() => null),
    media: vi.fn(() => null),
    location: vi.fn(() => null),
    availability: vi.fn(() => null),
    community: vi.fn(() => null),
    information: vi.fn(() => null),
}));

vi.mock("@/lib/api/public-content", () => ({
    getPublicBusinessContentBySlug: mocks.getContent,
}));
vi.mock("@/components/business/businessPublicPage/BusinessHero", () => ({ default: mocks.hero }));
vi.mock("@/components/business/businessPublicPage/BusinessActions", () => ({ default: mocks.actions }));
vi.mock("@/components/business/businessPublicPage/BusinessOverview", () => ({ default: mocks.overview }));
vi.mock("@/components/business/businessPublicPage/BusinessDetails", () => ({ default: mocks.details }));
vi.mock("@/components/business/businessPublicPage/BusinessMedia", () => ({ default: mocks.media }));
vi.mock("@/components/business/businessPublicPage/BusinessLocation", () => ({ default: mocks.location }));
vi.mock("@/components/business/businessPublicPage/BusinessAvailabilityCard", () => ({ default: mocks.availability }));
vi.mock("@/components/business/businessPublicPage/BusinessCommunity", () => ({ default: mocks.community }));
vi.mock("@/components/business/businessPublicPage/BusinessInformation", () => ({ default: mocks.information }));

import BusinessPage from "@/app/[locale]/business/[slug]/page";

describe("Business detail current field mappings", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocks.getContent.mockResolvedValue({
            publication: { slug: publicBusinessFixture.slug },
            entity: publicBusinessFixture,
        });
    });

    it("uses nested contact and community fields instead of legacy root aliases", async () => {
        const page = await BusinessPage({
            params: Promise.resolve({ slug: publicBusinessFixture.slug }),
        });
        const { container } = render(page);

        expect(mocks.actions.mock.calls[0][0]).toMatchObject({
            email: "hello@example.com",
            phone: "+491234567",
            website: "https://current.example",
            instagram: "current-social",
            whatsapp: "current-phone",
        });
        expect(mocks.overview.mock.calls[0][0]).toMatchObject({
            isLatinoOwned: true,
            countryOfOrigin: "Chile",
        });
        expect(mocks.hero.mock.calls[0][0]).toMatchObject({ verified: false });

        const jsonLdElement = container.querySelector('script[type="application/ld+json"]');
        const jsonLd = JSON.parse(jsonLdElement?.textContent ?? "{}") as { sameAs: string[] };
        expect(jsonLd.sameAs).toContain("https://current.example");
        expect(jsonLd.sameAs).toContain("current-social");
        expect(jsonLd.sameAs).not.toContain("https://legacy.example");
    });

    it("marks a business verified only when verification.status is verified", async () => {
        const businessWithPassedChecks: PublicBusiness = {
            ...publicBusinessFixture,
            verification: {
                status: "pending",
                checks: { identity: true, contact: true, activity: true },
            },
            verificationStatus: "pending",
        };
        mocks.getContent.mockResolvedValue({
            publication: { slug: publicBusinessFixture.slug },
            entity: businessWithPassedChecks,
        });

        const pendingPage = await BusinessPage({
            params: Promise.resolve({ slug: publicBusinessFixture.slug }),
        });
        render(pendingPage);
        expect(mocks.hero.mock.calls.at(-1)?.[0]).toMatchObject({ verified: false });

        mocks.getContent.mockResolvedValue({
            publication: { slug: publicBusinessFixture.slug },
            entity: {
                ...publicBusinessFixture,
                verification: {
                    ...publicBusinessFixture.verification,
                    status: "verified",
                },
                verificationStatus: "verified",
            },
        });
        const verifiedPage = await BusinessPage({
            params: Promise.resolve({ slug: publicBusinessFixture.slug }),
        });
        render(verifiedPage);
        expect(mocks.hero.mock.calls.at(-1)?.[0]).toMatchObject({ verified: true });
    });
});
