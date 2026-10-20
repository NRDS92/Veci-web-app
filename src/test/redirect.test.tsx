
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  notFound: vi.fn(),
}));

import { redirect } from "next/navigation";
import Home from "../app/[locale]/page";

describe("Home page redirect", () => {
  it("redirects to /es", () => {
    Home();

    expect(redirect).toHaveBeenCalledWith("/es");
  });
});
