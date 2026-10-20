
import { vi } from "vitest";

export const useRouter = () => ({
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
});

export const usePathname = () => "/es";
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({ locale: "es" });

export const redirect = vi.fn();
export const permanentRedirect = vi.fn();
export const notFound = vi.fn();
