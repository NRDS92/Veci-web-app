import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import ProfileAccount from "@/components/profile/ProfileAccount";
import { authService } from "@/features/auth/auth.service";

const mocks = vi.hoisted(() => ({
  notify: vi.fn(),
  setSessionToken: vi.fn(),
  user: null as null | Record<string, unknown>,
  changePassword: vi.fn(),
}));

vi.mock("next-intl", () => ({ useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}` }));
vi.mock("@/components/auth/AuthProvider", () => ({ useAuth: () => ({ user: mocks.user, setSessionToken: mocks.setSessionToken }) }));
vi.mock("@/components/notifications/NotificationProvider", () => ({ useNotification: () => ({ notify: mocks.notify }) }));
vi.mock("@/features/auth/auth.service", () => ({ authService: { changePassword: mocks.changePassword } }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => <a href={href} {...props}>{children}</a> }));

describe("password security UI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.user = { provider: "email", createdAt: "2024-01-01", originCountry: "DE", role: "user", subscription: { plan: "FREE" } };
    mocks.setSessionToken.mockResolvedValue(undefined);
    mocks.changePassword.mockResolvedValue({ data: { data: { token: "rotated-token" } } });
  });
  afterEach(cleanup);

  it("links email users from Profile Account to the single locale-aware change page", () => {
    render(<ProfileAccount />);
    expect(screen.getByRole("link", { name: "PasswordSecurity.changeTitle" })).toHaveAttribute("href", "/profile/change-password");
  });

  it("explains Google-only accounts without offering a password form link", () => {
    mocks.user = { ...mocks.user, provider: "google" };
    render(<ProfileAccount />);
    expect(screen.getByText("PasswordSecurity.googleOnly")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "PasswordSecurity.changeTitle" })).not.toBeInTheDocument();
  });

  it("does not render password fields for Google-only accounts on the direct route", () => {
    mocks.user = { ...mocks.user, provider: "google" };
    render(<ChangePasswordForm />);
    expect(screen.getByRole("status")).toHaveTextContent("PasswordSecurity.googleOnly");
    expect(screen.queryByLabelText("PasswordSecurity.currentPassword")).not.toBeInTheDocument();
  });

  it("shows shared policy requirements and rejects mismatched confirmation without a request", async () => {
    render(<ChangePasswordForm />);
    fireEvent.change(screen.getByLabelText("PasswordSecurity.currentPassword"), { target: { value: "legacy-password" } });
    fireEvent.change(screen.getByLabelText("PasswordSecurity.newPassword"), { target: { value: "Secure!123" } });
    fireEvent.change(screen.getByLabelText("PasswordSecurity.confirmPassword"), { target: { value: "Different!123" } });
    expect(screen.getByText("PasswordSecurity.requirements.maxBytes")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "PasswordSecurity.submitChange" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("PasswordSecurity.mismatch");
    expect(authService.changePassword).not.toHaveBeenCalled();
  });

  it("toggles password visibility for the form fields", () => {
    render(<ChangePasswordForm />);
    const current = screen.getByLabelText("PasswordSecurity.currentPassword");
    const next = screen.getByLabelText("PasswordSecurity.newPassword");
    expect(current).toHaveAttribute("type", "password");
    expect(next).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByLabelText("PasswordSecurity.showPassword"));
    expect(current).toHaveAttribute("type", "text");
    expect(next).toHaveAttribute("type", "text");
  });

  it.each([
    ["INVALID_CURRENT_PASSWORD", "PasswordSecurity.invalidCurrentPassword"],
    ["VALIDATION_ERROR", "PasswordSecurity.policyError"],
  ])("shows a localized field error for server code %s", async (code, message) => {
    mocks.changePassword.mockRejectedValue({ isAxiosError: true, response: { data: { code } } });
    render(<ChangePasswordForm />);
    fireEvent.change(screen.getByLabelText("PasswordSecurity.currentPassword"), { target: { value: "legacy-password" } });
    fireEvent.change(screen.getByLabelText("PasswordSecurity.newPassword"), { target: { value: "Secure!123" } });
    fireEvent.change(screen.getByLabelText("PasswordSecurity.confirmPassword"), { target: { value: "Secure!123" } });
    fireEvent.click(screen.getByRole("button", { name: "PasswordSecurity.submitChange" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(message);
  });

  it("submits once, rotates the local session, clears fields, and notifies success", async () => {
    let resolveRequest: ((value: { data: { data: { token: string } } }) => void) | undefined;
    mocks.changePassword.mockImplementation(() => new Promise((resolve) => { resolveRequest = resolve; }));
    render(<ChangePasswordForm />);
    fireEvent.change(screen.getByLabelText("PasswordSecurity.currentPassword"), { target: { value: "legacy-password" } });
    fireEvent.change(screen.getByLabelText("PasswordSecurity.newPassword"), { target: { value: "Secure!123" } });
    fireEvent.change(screen.getByLabelText("PasswordSecurity.confirmPassword"), { target: { value: "Secure!123" } });
    const button = screen.getByRole("button", { name: "PasswordSecurity.submitChange" });
    fireEvent.click(button);
    fireEvent.click(button);
    await waitFor(() => expect(mocks.changePassword).toHaveBeenCalledTimes(1));
    resolveRequest?.({ data: { data: { token: "rotated-token" } } });
    await waitFor(() => expect(mocks.setSessionToken).toHaveBeenCalledWith("rotated-token"));
    expect(mocks.notify).toHaveBeenCalledWith(expect.objectContaining({ type: "success" }));
    expect(screen.getByLabelText("PasswordSecurity.newPassword")).toHaveValue("");
  });
});
