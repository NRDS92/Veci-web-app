
import { describe, it, expect, vi } from "vitest";

const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
  permanentRedirect: vi.fn(),
  notFound: vi.fn(),
}));

import { redirect } from "next/navigation";
import Home from "../app/page";

describe("Home page redirect", () => {
  it("redirects to /en", () => {
    Home();

    expect(redirect).toHaveBeenCalledWith("/en");
  });
});
