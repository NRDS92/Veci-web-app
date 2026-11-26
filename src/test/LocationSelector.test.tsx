import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/components/location/LocationMapClient", () => ({
    default: ({ coordinates }: { coordinates: [number, number] }) => (
        <div data-testid="location-map" data-coordinates={coordinates.join(",")} />
    ),
}));

import LocationSelector from "@/components/location/LocationSelector";

describe("LocationSelector persisted location rendering", () => {
    it("shows a legacy saved address without fabricating coordinates or a map marker", () => {
        render(
            <LocationSelector
                value={{ city: "Köln", country: "Germany", formattedAddress: "Gotenring 16, Köln" }}
                onChange={vi.fn()}
            />
        );

        expect(screen.getByText("Gotenring 16, Köln")).toBeInTheDocument();
        expect(screen.getByText("Köln")).toBeInTheDocument();
        expect(screen.queryByTestId("location-map")).not.toBeInTheDocument();
    });

    it("renders the map for a complete location using the exact persisted coordinates", () => {
        render(
            <LocationSelector
                value={{
                    city: "Köln",
                    country: "Germany",
                    formattedAddress: "Gotenring 16, Köln",
                    latitude: 50.9348,
                    longitude: 6.9762,
                }}
                onChange={vi.fn()}
            />
        );

        expect(screen.getByTestId("location-map")).toHaveAttribute("data-coordinates", "6.9762,50.9348");
    });
});
