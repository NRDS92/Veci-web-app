
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Example() {
  return <h1>Find your community</h1>;
}

describe("First tests of Veci", () => {
  it("renders the community heading", () => {
    render(<Example />);

    expect(
      screen.getByRole("heading", { name: /community/i })
    ).toBeInTheDocument();
  });
});
